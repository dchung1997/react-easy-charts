import React, { useRef, useEffect, Fragment } from "react";
import * as d3 from "d3";

import './LineChart.css'

export interface LineChartProps {

    /**
     * The scale for the y-axis.
     */
    scale?: "linear" | "exp" | "log";

    /**
     * Should only be required for when using a log or exponential scale.
     */
    factor?: number;

    /**
     * Is there a better way to show a data requirement?
     * Data could be a single element or multiple
     * Data can be categorical, x:string, y: numeric.
     * Data could also be time series. x:date, y: numeric.
     */
    data: [];

    /**
     * Accessors for data for convienent use.
     */
    x?: string;
    y?: string;
    
    legend?: boolean;
    legendPos?: "top" | "bottom" | "left" | "right";

    title?: string;
    titleAlignment?: string;

    width?: number;
    height?: number;

    marginTop?: number;
    marginBottom?: number;
    marginLeft?: number;
    marginRight?: number;

}

function getScaleType(scale: "linear" | "exp" | "log", factor: number | undefined) {
    const lowercaseScale = scale.toLowerCase();

    if (lowercaseScale == "exp") {
        if (factor !== null || factor !== undefined) {
            return d3.scalePow().exponent(factor);
        } else {
            try {
                throw new Error("Line Chart requires exponent for exponential scale.");
            } catch (e) {
                console.error(e.stack); // Stack of the error
            }            
            return undefined;
        }
    } else if (lowercaseScale == "log") {
        if (factor !== null || factor !== undefined) {
            return d3.scaleLog().base(factor);
        } else {
            try {
                throw new Error("Line Chart requires base for logarithmic scale.");
            } catch (e) {
                console.error(e.stack); // Stack of the error
            }            
            return undefined;            
        }
    } else {
        return d3.scaleLinear();
    }
}

function getScaleX(data: [], width: number, accessor: string, marginLeft:number, marginRight:number, scale: "linear" | "exp" | "log", factor?: number) {
    // Peak into first element and decide what to do.
    const val = data[0][accessor]
    const elementType = typeof val;

    switch(elementType) {
        case "number":
            let scaleX = getScaleType(scale, factor);
            const max = d3.max(data, (d) => d[accessor]);
            if (scaleX === undefined) {
                return undefined;
            }

            // Check to see if the scale is exponential and set domain to 0.001 instead of 0 due to how logmarthimic scales work.
            if (scale.toLocaleLowerCase() == "log") {
                scaleX.domain([0.001, max]).range([marginLeft, width-marginRight]);
            } else {
                scaleX.domain([0, max]).range([marginLeft, width-marginRight]);
            }
            return scaleX;

        case "string":
            const dateCheck = new Date(val);
            if (dateCheck instanceof Date && dateCheck != "Invalid Date") {
                const extent = d3.extent(data, (d) => new Date(d[accessor]));
                return d3.scaleTime().domain(extent).range([marginLeft, width-marginRight])
            } else {
                const categories = Array.from(new Set(data.map(d => d[accessor])));
                return d3.scaleBand().domain(categories).range([marginLeft, width-marginRight])
            }

        case "object":
            if (elementType instanceof Date) {
                const extent = d3.extent(data, (d) => d[accessor]);
                return d3.scaleTime().domain(extent).range([marginLeft, width-marginRight])
            } else {
                try {
                    throw new TypeError("Object type for Line Chart requires Date Objects.");
                } catch (e) {
                    console.error(e.stack); // Stack of the error
                }
                return undefined;                
            }

        default:
            try {
                throw new TypeError("Unsupported data type for Line Chart.");
            } catch (e) {
                console.error(e.stack); // Stack of the error
            }
            return undefined;
    }
}

function getScaleY(data:[], height:number, accessor:string, marginBottom:number, marginTop: number,  scale: "linear" | "exp" | "log", factor?: number) {
    let scaleY = getScaleType(scale, factor);
    
    if (scaleY === undefined) {
        return undefined;
    }
    
    // we might want min values as well.
    const max = d3.max(data, (d) => d[accessor]);
    
    if (scale.toLocaleLowerCase() == "log") {
        scaleY.domain([0.001, max]).range([height-marginBottom, marginTop]);
    } else {
        scaleY.domain([0, max]).range([height-marginBottom, marginTop]);
    }

    return scaleY;
}

/**
 * A simple line chart, it should be able to create a line from a set of points.
 * The chart must be able to take multiple sets of points and display them accordingly.
 * Similar charts will include scatter plot, and area chart.
 * Requires a consistent set of values that can be manually set.
 * Should be able to accept date time, strings, and numbers.
 */
function LineChart({
    data = [],
    width = 400,
    height = 400,
    scale = "linear",
    factor = 2,
    x = "x",
    y = "y",
    marginTop = 10,
    marginBottom = 25,
    marginLeft = 30,
    marginRight = 10,
}: LineChartProps) {
    const svgRef = useRef();

    useEffect(() => {
        if (data === null || data === undefined || data.length === 0) {
            try {
                throw new Error("Data must not be empty, undefined, or null for Line Chart");
            } catch (e) {
                console.error(e.stack); // Stack of the error
            }
            return undefined;
        }


        // Maybe we should add a check to see the data type.
        // we have an array of objects, those objects then can be used to derive their implicit values.
        // check each object in array for type data
        // throw error if conditions.        

        const svg = d3.select(svgRef.current);
        let scaleX = getScaleX(data, width, x, marginLeft, marginRight, scale, factor);
        let scaleY = getScaleY(data, height, y, marginBottom, marginTop,  scale, factor);

        if (scaleY === undefined || scaleX === undefined) {
            return undefined;
        }

        let line = d3.line();  
        // We're performing this operation multiple times, we should only be doing this once if at all.  
        if (new Date(data[0][x]) instanceof Date) {
            line.x((d) => scaleX(new Date(d[x])));
        } else {
            line.x((d) => scaleX(d[x]));        
        }
        line.y((d) => scaleY(d[y]));

        const xAxis = d3.axisBottom(scaleX);
        const yAxis = d3.axisLeft(scaleY);
        
        svg.select(".x-axis")
            .attr("transform", `translate(${marginLeft},${height-marginBottom})`) // we need to fix this.
            .call(xAxis.tickSize(-height + marginTop))
            .call(g => g.select(".domain")
                .remove())
            .call(g => g.selectAll(".tick line")
                .attr("stroke-opacity", 0.5) 
                .attr("stroke-dasharray", "2,2"));         

        svg.select(".y-axis")
            .attr("transform", `translate(${marginLeft},0)`)
            .call(yAxis.tickSize(-width))
            .call(g => g.select(".domain")
                .remove())
            .call(g => g.selectAll(".tick line")
                .attr("stroke-opacity", 0.5)
                .attr("stroke-dasharray", "2,2"));        
        
        svg.selectAll(".line")
            .data([data])
            .join("path")
            .attr("class", "line")
            .attr("d", line)
            .attr("fill", "none")
            .attr("stroke", "black");            

    }, [data, scale, factor, height, width, x, y, marginTop, marginLeft, marginRight, marginBottom])

const containerStyle = {
    "max-width": width
} 

return (
    <div className="linechart-container" style={containerStyle}>
        <svg ref={svgRef} viewBox={0 + " " + 0 + " " +  width + " " + height} preserveAspectRatio="xMidYMid meet">
            <g className="x-axis"></g>
            <g className="y-axis"></g>
        </svg>
    </div>

)};

export default LineChart;