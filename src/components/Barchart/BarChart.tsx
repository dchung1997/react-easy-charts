import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

export interface BarChartProps {
    /** 
     * Id is required when using a stacked or grouped bar chart for categorical purposes otherwise x or y is used depending on alignment of chart.
     * */ 
    data: [
        {
            id?: string,
            x: number | string,
            y: number | string
        }
    ];


    onDataChange?: (data: unknown) => void;

    xAxisFormat?: string;
    yAxisFormat?: string;

    title?: string;
    titleAlignment?: "left" | "right" | "center";
    alignment : "vertical" | "horizontal";
    type: "normal" | "stacked" | "grouped";

    width?: number;
    height?: number;
    
    marginTop?: number;
    marginBottom?: number;
    marginLeft?: number;
    marginRight?: number;
}


function getScale(data: Array<object>, accessor: string, type: string, alignment: string, width: number, height: number, marginLeft:number, marginRight:number, marginBottom: number, marginTop: number) {
    if ((alignment === "vertical" && accessor === "x") || (alignment === "horizontal" && accessor === "y")) {
        if (typeof data[0][accessor] !== "string") {
            try {
                throw new TypeError("Axis for value in Bar Chart must be a string.");
            } catch (e) {
                console.error(e.stack); 
            }    
            return null;
        }

        const categories = Array.from(new Set(data.map(function(e) {
            return e[accessor];
        })));

        return accessor === "x" ? d3.scaleBand().domain(categories).range([marginLeft, width-marginRight]).paddingInner(0.25) : d3.scaleBand().domain(categories).range([height-marginBottom, marginTop]).paddingInner(0.25);
    }

    const categories = accessor === "x" ? d3.group(data, d => d.y) : d3.group(data, d => d.x);
    let sum: number[] = [];
    let max: number | undefined;

    switch(type.toLowerCase()) {
        case "stacked":
            categories.forEach(function(d) {
                sum.push(d3.sum(d, d => d[accessor]));
            });
            max = d3.max(sum);
            return accessor === "x" ? d3.scaleLinear().domain([0, max]).range([marginLeft, width-marginRight]) : d3.scaleLinear().domain([0, max]).range([height-marginBottom, marginTop]);

        case "grouped":
            categories.forEach(function(d) {
                d.forEach(function(e) {
                    sum.push(e[accessor]);
                });
            });
            max = d3.max(sum);
            
            return accessor === "x" ? d3.scaleLinear().domain([0, max]).range([marginLeft, width-marginRight]) : d3.scaleLinear().domain([0, max]).range([height-marginBottom, marginTop]);

        case "normal":
            data.forEach(function(d){
                sum.push(d[accessor]);
            });
            max = d3.max(sum);
            
            return accessor === "x" ? d3.scaleLinear().domain([0, max]).range([marginLeft, width-marginRight]) : d3.scaleLinear().domain([0, max]).range([height-marginBottom, marginTop]);

        default:
            try {
                throw new TypeError("Unsupported type for Bar Chart.");
            } catch (e) {
                console.error(e.stack); 
            }    
            return null;
    }
    
    
}


/**
 * A responsive bar chart component. It should be able to display data vertically and horizontally.
 * Bar Chart should be able to show data stack and grouped.
 * onDataChange should result when clicking on an individual group or bar.
 * 
 */
function BarChart({ 
    data,
    onDataChange,
    width = 500,
    height = 300,
    title,
    titleAlignment="center",
    type= "normal",
    alignment="vertical",  
    xAxisFormat,
    yAxisFormat,
    marginTop = 20,
    marginBottom = 20,
    marginLeft = 20,
    marginRight = 20,    
}: BarChartProps) {
    const svgRef = useRef();
    // Probably will need a custom colorscale creator for this.
    const colorScale = d3.schemeTableau10;


    useEffect(() => {
        if (data === null || data === undefined || data.length === 0) {
            try {
                throw new Error("Data must not be empty, undefined, or null for Line Chart.");
            } catch (e) {
                console.error(e.stack); // Stack of the error
            }
            return undefined;
        }

        const svg = d3.select(svgRef.current);
        
        const scaleX = getScale(data, "x", type, alignment, width, height, marginLeft, marginRight, marginBottom, marginTop);
        const scaleY = getScale(data, "y", type, alignment, width, height, marginBottom, marginTop, marginBottom, marginTop);

        if (scaleX === null || scaleY === null) {
            return undefined;
        }

        const xAxis = xAxisFormat? d3.axisBottom(scaleX).tickFormat(d3.format(xAxisFormat)) : d3.axisBottom(scaleX);
        const yAxis = yAxisFormat? d3.axisLeft(scaleY).tickFormat(d3.format(yAxisFormat)) : d3.axisLeft(scaleY);
        
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

        // we should probably sort data first. todo

        const groups = alignment === "horizontal" ? d3.groups(data, d => d.y) : d3.groups(data, d => d.x);
        let categories: Array<object> = []
        groups.forEach(function(d: object[]){
            categories.push(d[1]);
        });

        const barType = type.toLowerCase();
        let prev = 0;

        svg.selectAll(".section")
            .data(categories)
            .join("g")
            .attr("class", "section")
            .selectAll(".bar")
            .data(element => element)
            .join("rect")
            .attr("class", "bar")
            .attr("x", function(d, i, s) {
                if (alignment === "horizontal") {
                    if (barType === "stacked") {
                        const val = scaleX(d.x) - scaleX(scaleX.domain()[0]);
                        if (i > 0) {
                            const newVal = prev;
                            prev = val + prev;
                            return newVal;
                        }
                        prev = val + marginLeft;
                        return marginLeft; 

                    }
                    return marginLeft;
                } else if (alignment === "vertical") {
                    const size = s.length;
                    if (barType === "grouped") {
                        return scaleX(d.x) + ((scaleX.bandwidth() / size) * i);
                    }
                    return scaleX(d.x);
                }

            })
            .attr("y", function(d, i, s) {
                if (alignment === "vertical") {
                    if (barType === "stacked") {
                        const val = scaleY(scaleY.domain()[0]) - scaleY(d.y);
                        const val2 = scaleY(d.y);
                        if (i > 0) {
                            prev = prev - val;
                            return prev;
                        }
                        prev = val2;
                        return prev;                
                    }
                    return scaleY(d.y); 
                } else if (alignment === "horizontal") {
                    if (barType === "grouped") {
                        const size = s.length;
                        return scaleY(d.y) + ((scaleY.bandwidth() / size) * i);
                    }
                    return scaleY(d.y);
                }                                
            })
            .attr("width", function(d, i, s) {
                if (alignment === "horizontal") {
                    return scaleX(d.x) - scaleX(scaleX.domain()[0]);;
                } else if (barType === "grouped") {
                    const size = s.length;
                    return scaleX.bandwidth() / size;
                }
                return scaleX.bandwidth();
            })
            .attr("height", function(d, i, s) {
                if (alignment === "vertical") {
                    return scaleY(scaleY.domain()[0]) - scaleY(d.y);
                } else if (barType === "grouped") {
                    const size = s.length;
                    return scaleY.bandwidth() / size;
                } 
                return scaleY.bandwidth();
            })
            .attr("fill", function(d, i) {
                return colorScale[i];
            } );


    }, [data, type, alignment, height, width, marginTop, marginLeft, marginRight, marginBottom]);


    const containerStyle = {
        maxWidth : width
    }     




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



return (
    <div className="barchart-container" style={containerStyle} data-testid="barchart">
        <Title/>
        <svg ref={svgRef} viewBox={0 + " " + 0 + " " +  width + " " + height} preserveAspectRatio="xMidYMid meet" data-testid="linechart-svg">
            <g className="x-axis"></g> 
            <g className="y-axis"></g> 
        </svg>
    </div>

)};

export default BarChart;