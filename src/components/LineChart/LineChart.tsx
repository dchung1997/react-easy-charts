import React, { useRef, useEffect, Fragment } from "react";
import classNames from "classnames";
import * as d3 from "d3";

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

    width?: number;
    height?: number;

}

function getScaleType(scale: "linear" | "exp" | "log", factor: number | undefined) {
    const lowercaseScale = scale.toLowerCase();

    if (lowercaseScale == "exp") {
        if (factor != undefined) {
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
        if (factor != undefined) {
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

/**
 * A simple line chart, it should be able to create a line from a set of points.
 * The chart must be able to take multiple sets of points and display them accordingly.
 * Similar charts will include scatter plot, and area chart.
 * Requires a consistent set of values that can be manually set.
 * Should be able to accept date time, strings, and numbers.
 */
function LineChart({
    scale = "linear",
    factor,
    data = [],
    width = 400,
    height = 400,
    x = "x",
    y = "y"
}: LineChartProps) {
    const svgRef = useRef();

    useEffect(() => {
        if (data.length === 0 || data === null || data === undefined) {
            try {
                throw new Error("Data must not be empty, undefined, or null for Line Chart");
            } catch (e) {
                console.error(e.stack); // Stack of the error
            }
            return undefined;
        }

        const svg = d3.select(svgRef.current);
        let scaleY = getScaleType(scale, factor);
        let scaleX;
        let line = d3.line();
        
        // Peak into first element and decide what to do.
        let val = data[0][x]
        if (typeof val === 'number' ) {
            scaleX = getScaleType(scale, factor);
            const max = d3.max(data, (d) => d[x]);
            scaleX.domain([0, max]).range([10, width-20]);    
            
            line.x((d) => scaleX(d[x]));
            line.y((d) => scaleY(d[y]));                    

        } else if (typeof val === 'string') {
            // Check if string is a date.
            const dateCheck = new Date(val);
            if (dateCheck instanceof Date && dateCheck != "Invalid Date") { 
                // Check Dates instead.
                const extent = d3.extent(data, (d) => new Date(d[x]));

                scaleX = d3.scaleTime().domain(extent).range([30, width-10])

                line.x((d) => scaleX(new Date(d[x])));
                line.y((d) => scaleY(d[y]));
            } else {
                // I want to grab all possible unique names for y.
                const categories = Array.from(new Set(data.map(d => d[x])));
                scaleX = d3.scaleBand().domain(categories).range([10, width-10])
            }
        } else if (typeof val === 'object') {
            if (val instanceof Date) {
                const extent = d3.extent(data, (d) => d[x]);
                scaleX = d3.scaleTime().domain(extent).range([10, width-10])
            } else {
                try {
                    throw new TypeError("Object type for Line Chart requires Date Objects.");
                } catch (e) {
                    console.error(e.stack); // Stack of the error
                }
                return undefined;
            }
        }

        if (scaleY == undefined) {
            return undefined;
        }
        
        if (scaleX == undefined) {
            return undefined;
        }

        const max = d3.max(data, (d) => d[y])
        // We're going to need to fix this once we work on margins.
        // We don't actually know if this should be zero...
        scaleY.domain([0, max]).range([height-25, 10]);        

        const xAxis = d3.axisBottom(scaleX);
        const yAxis = d3.axisLeft(scaleY);
        
        svg.select(".x-axis")
            .attr("transform", `translate(30,${height-20})`) // TODO: Add margin later.
            .call(xAxis.tickSize(-height))
            .call(g => g.select(".domain")
                .remove())
            .call(g => g.selectAll(".tick line")
                .attr("stroke-opacity", 0.5) 
                .attr("stroke-dasharray", "2,2"));         

        svg.select(".y-axis")
            .attr("transform", `translate(${30},0)`)
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

        // Have points for non timescale data.
        // svg.selectAll(".point")
        //     .data(data)
        //     .join("circle")
        //     .attr("class", "point")
        //     .attr('cx', (d) => scaleX(d[x]))
        //     .attr('cy', (d) => scaleY(d[y]))
        //     .attr('r', 5)
        //     .attr('stroke', 'black')
        //     .attr('fill', '#69a3b2');                     


        // return (
        //     svg.
        // )
    }, [data, scale, factor, height, width])

return (
    <div>
        <h3> Hello World </h3>
        <svg width={width} height={height} ref={svgRef} viewBox={"0 0 " + width + " " + height}>
            <g className="x-axis"></g>
            <g className="y-axis"></g>
        </svg>
    </div>
)};

export default LineChart;