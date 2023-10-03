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


    data: [ 
        {
            id: string,
            data: [
                {
                    accessorX: number | string | Date,
                    accessorY: number
                }
            ]
        }
    
    ];

    /**
     * For finding the x value in data if not setup to be x explicitly.
     */
    x?: string;
    /**
     * For finding the y value in data if not setup to be y explicitly.
     */    
    y?: string;
    
    
    points?: boolean;

    legend?: boolean;
    legendPos?: "top" | "bottom";

    title?: string;
    titleAlignment?: "left" | "right" | "center";

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
 * A simple responsive line chart component, it can take a single or multiple different entries and visualize them onto the chart.
 * It's capable of determining the types of the elements passed in. Easily customizable to allow for usage without additional bloat from custom css.
 * Allows for custom accessors but requires for data to still be formatted in correct structure. Can accept dates, strings (categorical values), and numbers. 
 */
function LineChart({
    data,
    width = 500,
    height = 300,
    title,
    titleAlignment="center",
    scale = "linear",
    factor = 2,
    x = "x",
    y = "y",
    points=false,
    marginTop = 0,
    marginBottom = 20,
    marginLeft = 20,
    marginRight = 20,
}: LineChartProps) {
    const svgRef = useRef();
    // we will need to refactor this later for changing it.
    const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

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

        // we need to check if data is formatted properly.
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
        
        line.x((d) =>
            typeof peakHead === "string" && isNaN(peakHead) && new Date(peakHead) == "Invalid Date"
                ? scaleX(d[x]) + scaleX.bandwidth() / 2
                : scaleX(d[x])
        );

        line.y((d) => scaleY(d[y]));

        const xAxis = d3.axisBottom(scaleX);
        const yAxis = d3.axisLeft(scaleY);
        
        svg.select(".x-axis")
            .attr("transform", `translate(0,${height-marginBottom})`) // we need to fix this.
            .call(xAxis.tickSize(-height + marginTop*2))
            .call(g => g.select(".domain")
                .remove())
            .call(g => g.selectAll(".tick line")
                .attr("stroke-opacity", 0.1));

        svg.select(".y-axis")
            .attr("transform", `translate(${marginLeft},0)`)
            .call(yAxis.tickSize(-width + marginRight*2))
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
            .attr("stroke", (d, i) => colorScale(i));
            
        // if (points) {
        //     svg.selectAll(".point")
        //     .data(data, (d) => d["data"])
        //     .join("circle")
        //     .attr("class", "point")
        //     .attr("cx", function(d) {
        //         console.log(d);
        //         return scaleX(d[x])
        //     })
        //     .attr("cy", (d) => scaleY(d[y]))
        //     .attr("r", 5)
        //     .attr("fill", (d, i) => colorScale(i));
        // }
        
    }, [data, scale, factor, height, width, x, y, marginTop, marginLeft, marginRight, marginBottom]);

function Title() {
    if (title === undefined || title === null || title === "") {
        return null;
    }

    const titleStyle = {
        textAlign: titleAlignment
    }

    return (
        <h3 style={titleStyle}> {title} </h3>
    )
}

function Legend() {
    // We should get the list of ids and then print them according to scale.
    const items = data.map((d,i) => 
        <div className="legend-element" key={"element-" + i}>
            <div className="swatch" style={{backgroundColor: colorScale(i)}}></div>
            <button>{d.id}</button>
        </div>
    )
    return (
        <div className="legend">
            {items}
        </div>
    )
}

const containerStyle = {
    maxWidth : width
} 

return (
    <div className="linechart-container" style={containerStyle}>
        <Title/>
        <Legend/>
        <svg ref={svgRef} viewBox={0 + " " + 0 + " " +  width + " " + height} preserveAspectRatio="xMidYMid meet">
            <g className="x-axis"></g>
            <g className="y-axis"></g>
        </svg>
    </div>

)};

export default LineChart;