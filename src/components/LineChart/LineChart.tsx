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
        if ((factor !== null || factor !== undefined) && typeof factor === "number") {
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
        if ((factor !== null || factor !== undefined) && typeof factor === "number") {
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

function getScaleX(data: Array<object>, width: number, accessor: string, marginLeft:number, marginRight:number, scale: "linear" | "exp" | "log", factor?: number) {
    // Peak into first element and decide what to do.
    const val = data[0]["data"][0][accessor]
    const elementType = typeof val;
    const nestedArr = data.flatMap((d) => d['data']);

    switch(elementType) {
        case "number":
            let scaleX = getScaleType(scale, factor);
            const extent = d3.extent(nestedArr, (d) => d[accessor]);
            const max = extent[1];
            const min = extent[0];

            if (scaleX === undefined) {
                return undefined;
            }
            // Check to see if the scale is exponential and set domain to 0.001 instead of 0 due to how logmarthimic scales work.
            if (scale.toLocaleLowerCase() == "log") {
                if (min < 1) {
                    try {
                        throw new Error("Log Scale requires minimum value of at least 1.");
                    } catch (e) {
                        console.error(e.stack); // Stack of the error
                    }                           
                }
                scaleX.domain([1, max]).range([marginLeft, width-marginRight]);
            } else {
                scaleX.domain([0, max]).range([marginLeft, width-marginRight]);
            }

            return scaleX;

        case "string":
            const categories = Array.from(new Set(nestedArr.map(function(e) {
                return e[accessor];
            })));

            return d3.scaleBand().domain(categories).range([marginLeft, width-marginRight])

        case "object":
            if (val instanceof Date) {
                const extent = d3.extent(nestedArr, (d) => d[accessor]);

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
                throw new TypeError("Unsupported data type for Line Chart. Did you set up your accessors?");
            } catch (e) {
                console.error(e.stack); // Stack of the error
            }
            return undefined;
    }
}

function getScaleY(data:Array<object>, height:number, accessor:string, marginBottom:number, marginTop: number,  scale: "linear" | "exp" | "log", factor?: number) {
    let scaleY = getScaleType(scale, factor);
    
    if (scaleY === undefined) {
        return undefined;
    }

    
    // we might want min values as well.
    const nestedArr = data.flatMap((d) => d['data']);    
    const extent = d3.extent(nestedArr, (d) => d[accessor]);
    const max = extent[1];
    const min = extent[0];
    
    if (scale.toLocaleLowerCase() == "log") {
        if (min < 1) {
            try {
                throw new Error("Log Scale requires minimum value of at least 1.");
            } catch (e) {
                console.error(e.stack); // Stack of the error
            }                           
        }        
        scaleY.domain([1, max]).range([height-marginBottom, marginTop]);
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
    title,
    scale = "linear",
    factor = 2,
    x = "x",
    y = "y",
    marginTop = 20,
    marginBottom = 20,
    marginLeft = 20,
    marginRight = 20,
}: LineChartProps) {
    const svgRef = useRef();

    useEffect(() => {
        if (data === null || data === undefined || data.length === 0) {
            try {
                throw new Error("Data must not be empty, undefined, or null for Line Chart.");
            } catch (e) {
                console.error(e.stack); // Stack of the error
            }
            return undefined;
        }


        // Maybe we should add a check to see the data type.
        // we have an array of objects, those objects then can be used to derive their implicit values.
        // check each object in array for type data
        // throw error if conditions.
        /**
         * [
         *  {
         *      id: string
         *      data: [
         *          accessorX:
         *          accessorY:
         *      ],
         *  }
         * ]
         */

        const peakHead = data[0]["data"][0][x];
        if (isNaN(peakHead) && new Date(peakHead) != "Invalid Date") {
            data.forEach(function(e){
                e["data"].forEach(function(d){
                    d[x] = new Date(d[x])
                })
            })
        }


        const svg = d3.select(svgRef.current);
        let scaleX = getScaleX(data, width, x, marginLeft, marginRight, scale, factor);
        let scaleY = getScaleY(data, height, y, marginBottom, marginTop,  scale, factor);

        if (scaleY === undefined || scaleX === undefined) {
            return undefined;
        }

        let line = d3.line();   
        line.x((d) => scaleX(d[x]));        
        line.y((d) => scaleY(d[y]));

        const xAxis = d3.axisBottom(scaleX);
        const yAxis = d3.axisLeft(scaleY);
        
        svg.select(".x-axis")
            .attr("transform", `translate(0,${height-marginBottom})`) // we need to fix this.
            .call(xAxis.tickSize(-height + marginTop))
            .call(g => g.select(".domain")
                .remove())
            .call(g => g.selectAll(".tick line")
                .attr("stroke-opacity", 0.1));

        svg.select(".y-axis")
            .attr("transform", `translate(${marginLeft},0)`)
            .call(yAxis.tickSize(-width + marginRight))
            .call(g => g.select(".domain")
                .remove())
            .call(g => g.selectAll(".tick line")
                .attr("stroke-opacity", 0.1));
        
        svg.selectAll(".line")
            .data(data)
            .join("path")
            .attr("class", "line")
            .attr("d", function(d) {
                return line(d["data"])
            })
            .attr("fill", "none")
            .attr("stroke", "black");            

    }, [data, scale, factor, height, width, x, y, marginTop, marginLeft, marginRight, marginBottom]);

function Title() {
    if (title === undefined || title === null || title === "") {
        return null;
    }

    return (
        <h3> {title} </h3>
    )
}

const containerStyle = {
    maxWidth : width
} 

return (
    <div className="linechart-container" style={containerStyle}>
        <Title/>
        <svg ref={svgRef} viewBox={0 + " " + 0 + " " +  width + " " + height} preserveAspectRatio="xMidYMid meet">
            <g className="x-axis"></g>
            <g className="y-axis"></g>
        </svg>
    </div>

)};

export default LineChart;