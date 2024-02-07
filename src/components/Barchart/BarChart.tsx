import React, { useRef, useState, useEffect, useId } from "react";
import * as d3 from "d3";

import './BarChart.css';

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
    toolTipFormat?: string;

    legend?: boolean;
    legendPos?: "top" | "bottom";
    
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


function getScale(data: Array<object>, selected: Array<object>, accessor: string, type: string, alignment: string, width: number, height: number, marginLeft:number, marginRight:number, marginBottom: number, marginTop: number) {
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
            if (type === "stacked" || type === "grouped" ) {
                return e[accessor];
            } else {
                const index = selected.findIndex((d) => d.id === e[accessor]);
                if (selected.length > 0 && selected[index].isSelected) {   
                    return e[accessor];            
                }    
            }
        }).filter((e) => e !== undefined)));

        return accessor === "x" ? d3.scaleBand().domain(categories).range([marginLeft, width-marginRight]).paddingInner(0.25) : d3.scaleBand().domain(categories).range([height-marginBottom, marginTop]).paddingInner(0.25);
    }

    const categories = accessor === "x" ? d3.group(data, d => d.y) : d3.group(data, d => d.x);
    let sum: number[] = [];
    let max: number | undefined;

    switch(type) {
        case "stacked":
            categories.forEach(function(d) {
                let arr = d;
                arr = arr.filter(function(d) {
                    const index = selected.findIndex((e) => e.id === d.id);
                    return selected.length > 0 && selected[index].isSelected;
                });
                sum.push(d3.sum(arr, d => d[accessor]));
            });
            max = d3.max(sum);

            return accessor === "x" ? d3.scaleLinear().domain([0, max]).range([marginLeft, width-marginRight]) : d3.scaleLinear().domain([0, max]).range([height-marginBottom, marginTop]);

        case "grouped":
            categories.forEach(function(d) {
                d.forEach(function(e) {
                    const index = selected.findIndex((f) => f.id === e.id);
                    if (selected.length > 0 && selected[index].isSelected) {
                        sum.push(e[accessor]);
                    }
                });
            });
            max = d3.max(sum);
            
            return accessor === "x" ? d3.scaleLinear().domain([0, max]).range([marginLeft, width-marginRight]) : d3.scaleLinear().domain([0, max]).range([height-marginBottom, marginTop]);

        case "normal":
            data.forEach(function(d){
                const index = selected.findIndex((e) => d.id ? e.id === d.id : alignment === "horizontal" ? e.id === d.y : e.id === d.x);
                if (selected.length > 0 && selected[index].isSelected) {
                    sum.push(d[accessor]);
                }
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

function mouseOver(toolId) {
    const toolTip = d3.select(document.getElementById("tooltip-" + toolId));
        toolTip.style("visibility", "visible");
        toolTip.style("display", "block");        
}

function mouseMove(data, selectedData, alignment, barType, format, toolId, d, item) {
    const coords = d3.pointer(d);

    const toolTip = d3.select(document.getElementById("tooltip-" + toolId));
        toolTip.style("visibility", "visible")
            .style("display", "block")
            .style("top", (coords[1]) + "px")
            .style("left", (coords[0] + 25) + "px");


    if (barType === "normal")  {
        for (let i = 0; i < selectedData.length; i++) {
            if (selectedData[i].isSelected) {
                const element = toolTip.select(".tooltip-element-" + i);
                const arr = data.find((d) => d.id ? d.id === selectedData[i].id : alignment === "horizontal" ? d.y === selectedData[i].id : d.x === selectedData[i].id)
                const value = element.select(".value")
                const index = alignment === "horizontal" ? "x" : "y";
                const formatted = d3.format(format)(arr[index])
                value.html(formatted);
            }
        }
    } else {
        // Get array from item.
        let itemArr = [];
        const accessor = alignment === "horizontal" ? "y": "x";
        const category = item[accessor];

        for (let index = 0; index < data.length; index++) {
            if (data[index][accessor] === category) {
                itemArr.push(data[index]);
            }
        }

        for(let i = 0; i < selectedData.length; i++) {
            if (selectedData[i].isSelected) {
                const element = toolTip.select(".tooltip-element-" + i);
                const arr = itemArr.find((d) => d.id === selectedData[i].id)
                const value = element.select(".value")
                const index = alignment === "horizontal" ? "x" : "y";
                const formatted = d3.format(format)(arr[index])
                value.html(formatted);
            }
        }
    }
}

function mouseOut(toolId) {
    const toolTip = d3.select(document.getElementById("tooltip-" + toolId));
        toolTip.style("visibility", "hidden");
        toolTip.style("display", "none");
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
    legend="true",
    legendPos="top",    
    type= "normal",
    alignment="vertical",  
    xAxisFormat,
    yAxisFormat,
    toolTipFormat = "0.2f",
    marginTop = 20,
    marginBottom = 20,
    marginLeft = 20,
    marginRight = 20,    
}: BarChartProps) {
    if (data === null || data === undefined || data.length === 0) {
        try {
            throw new Error("Data must not be empty, undefined, or null for Bar Chart.");
        } catch (e) {
            console.error(e.stack); 
        }
        return undefined;
    }

    const svgRef = useRef();
    const [legendState, setLegendState] = useState<[{id: string, backgroundColor: string, textDecoration: string}]>([]);
    const [selected, setSelected] = useState<[{id: string, isSelected: boolean}]>([]);    
    const toolId = useId();
    // Probably will need a custom colorscale creator for this.
    const barType = type.toLowerCase();
    const group = barType === "grouped" || barType === "stacked" ? d3.group(data, d => d.id) : alignment === "horizontal" ? d3.group(data, d => d.y) : d3.group(data, d => d.x);
    const keys = Array.from( group.keys() );
    const colorScale = d3.scaleOrdinal().domain(keys).range(d3.schemeTableau10);


    // State Initialization.
    useEffect(() => {
        if (data !== null && data !== undefined && data.length !== 0) {
            const initialLegendState = keys.map(function(d) {
                return {
                    "id": d,
                    backgroundColor: colorScale(d),
                    textDecoration: "none"
                }
            });

            const initialSelected = keys.map(function(d) {
                return {
                    "id": d,
                    "isSelected": true
                }
            });            

            setLegendState([
                    ...initialLegendState
                ]);

            setSelected([
                ...initialSelected
            ]);
        }
    }, [data]);


    // Bar Chart Drawing.
    useEffect(() => {

        const svg = d3.select(svgRef.current);
        
        const scaleX = getScale(data, selected, "x", barType, alignment, width, height, marginLeft, marginRight, marginBottom, marginTop);
        const scaleY = getScale(data, selected, "y", barType, alignment, width, height, marginBottom, marginTop, marginBottom, marginTop);

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
            // we're going to need to modify this before sending out.
            let arr = d[1];
            if (barType === "stacked" || barType === "grouped") {
                arr = arr.filter(function(d) {
                    const index = selected.findIndex((e) => e.id === d.id);
                    return selected.length > 0 && selected[index].isSelected;
                });
                categories.push(arr);
            } else {
                const index = selected.findIndex((e) => e.id === d[0]);
                if (selected.length > 0 && selected[index].isSelected) {
                    categories.push(d[1]);
                }                
            }
        });

        let prev = 0;
        let test = 0;

        svg.selectAll(".section")
            .data(categories)
            .join("g")         
            .attr("class", "section")
            .selectAll(".bar")
            .data(element => element)
            .join("rect")
            .attr("class", "bar")    
            .attr("data-testid", function() {
                if (test === 0) {
                    test = test + 1;
                    return "test-rect";
                }
            })
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
                        if (i > 0) {
                            prev = prev - val;
                            return prev;
                        }
                        prev = scaleY(d.y);
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
            .attr("fill", function(d) {
                return d.id ? colorScale(d.id) : alignment === "horizontal" ? colorScale(d.y) : colorScale(d.x);
            })
            .on("mouseenter", function() {
                return mouseOver(toolId)
            })
            .on("mousemove", function(event, item) {
                return mouseMove(data, selected, alignment, barType, toolTipFormat, toolId, event, item)
            })
            .on("mouseleave", function() {
                return mouseOut(toolId);
            });           
        
    }, [data, selected, barType, alignment, height, width, marginTop, marginLeft, marginRight, marginBottom]);


    const containerStyle = {
        maxWidth : width
    }     

    function Legend() {
        // We should get the list of ids and then print them according to scale.
        // A legend should be able to manipulate data inside of the chart.
        // A legend should be able to return data back from component.
        if (!legend || data === null || data === undefined || data.length === 0) {
            return null;
        }
    
        // we need a helper function to do something here.
        // onclick check elements.
        function handleClick(d) {
            // A deep copy of the state array.
            let state = legendState.map((d) => JSON.parse(JSON.stringify(d)));
            let selectedState = selected.map((d) => JSON.parse(JSON.stringify(d)));
    
            let item = state.find((element) => element.id === d);
        
            let selectedItem = selectedState.find((element) => element.id === d);
    
            if (item.textDecoration === "none") {
                item.textDecoration = "line-through";
                item.backgroundColor = "#808080";
                selectedItem.isSelected = false;
            } else {
                item.textDecoration = "none";
                item.backgroundColor = colorScale(item.id ? item.id : alignment === "horizontal" ? item.y : item.x);
                selectedItem.isSelected = true;                        
            }
    
            setLegendState(state);
            setSelected(selectedState);
            if (onDataChange !== undefined) {
                onDataChange(selectedState);
            }
        }
        
        const items = keys.map((d,i) => 
                <div className="legend-element" key={d} onClick={() => handleClick(d)}>
                    <div className="swatch" style={{backgroundColor: legendState.length > 0 ? legendState[i].backgroundColor : null}}></div>
                    <button onClick={() => handleClick(d)} style={{textDecoration: legendState.length > 0 ? legendState[i].textDecoration : null}}>{d}</button>
                </div>
        )
        return (
            <div className="legend">
                {items}
            </div>
        )
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

    function Tooltip() {
        if (data === null || data === undefined || data.length === 0) {
            return null;
        }
    
        const items = selected.map(function(d,i) {
            if (d.isSelected) {
                return (<div className={"tooltip-element-" + i} key={d.id}>
                    <div className="swatch" style={{backgroundColor: legendState.length > 0 ? legendState[i].backgroundColor : colorScale[i]}}></div>
                    <div className="name">{d.id + ": " }</div>
                    <div className="value"></div> 
                </div>)
            } else {
                return null;
            }
    
        });
    
        const filteredItems = items.filter((element) => element !== null);
        if (filteredItems.length === 0) {
            return null;
        }
    
        return (
            <div id={"tooltip-" + toolId} className="tooltip" data-testid="linechart-tooltip">
                {items}
            </div> 
        )
    }



return (
    <div className="barchart-container" style={containerStyle} data-testid="barchart">
        <Title/>
        <Legend/>
        <svg ref={svgRef} viewBox={0 + " " + 0 + " " +  width + " " + height} preserveAspectRatio="xMidYMid meet" data-testid="barchart-svg">
            <g className="x-axis"></g> 
            <g className="y-axis"></g> 
        </svg>
        <Tooltip/>
    </div>
)};

export default BarChart;