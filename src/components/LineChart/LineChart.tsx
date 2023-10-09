import React, { useRef, useEffect, useState, useId } from "react";
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

    onDataChange?: (data: unknown) => void;


    /**
     * For finding the x value in data if not setup to be x explicitly.
     */
    x?: string;
    /**
     * For finding the y value in data if not setup to be y explicitly.
     */    
    y?: string;
    
    xAxisFormat?: string;
    yAxisFormat?: string;
    toolTipFormat?: string;

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

    // we should check for min X.
    
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

function mouseOver(toolId, e) {
    const svg = d3.select(e);

    svg.select(".hoverline")
        .attr("opacity", 1)
        .attr("stroke", "grey");
        
    const toolTip = d3.select(document.getElementById("tooltip-" + toolId));
        toolTip.style("visibility", "visible")        
}

function mouseMove(data, selectedData, x, y, scaleX, format, marginLeft, marginRight, marginBottom, marginTop, width, height, toolId, d, e) {
    const svg = d3.select(e);
    const coords = d3.pointer(d);

    if (coords[0] < marginLeft || coords[0] > width-marginRight) {
        svg.select(".hoverline")
            .attr("opacity", 0);
        return null;
    }

    const val = data[0]["data"][0][x]
    const elementType = typeof val;
    let indexArr = [];

    if (elementType === "string") {
        const domain = scaleX.domain()
        const range = scaleX.range()
        const invertScaleX = d3.scaleQuantize().domain(range).range(domain);  
        const index = invertScaleX(coords[0]);
        for (let  i = 0; i < data.length; i++) {
            indexArr.push({
                id: data[i].id,
                value: data[i]["data"].findIndex((d) => d[x] === index)
            });
        }

        svg.select(".hoverline")
            .attr("opacity", 1)
            .attr("stroke", "grey")        
            .attr("x1", scaleX(data[0]["data"][indexArr[0].value][x]) + scaleX.bandwidth() / 2)
            .attr("y1", height-marginBottom)
            .attr("x2", scaleX(data[0]["data"][indexArr[0].value][x]) + scaleX.bandwidth() / 2)
            .attr("y2", marginTop)        

    } else {
        const locX = scaleX.invert(coords[0]);
        let bisect = d3.bisector(d => d[x]);
    
        for (let  i = 0; i < data.length; i++) {
            indexArr.push({
                id: data[i].id,
                value: bisect.center(data[i]["data"], locX)
            });
        }

        svg.select(".hoverline")
            .attr("opacity", 1)
            .attr("stroke", "grey")        
            .attr("x1", scaleX(data[0]["data"][indexArr[0].value][x]))
            .attr("y1", height-marginBottom)
            .attr("x2", scaleX(data[0]["data"][indexArr[0].value][x]))
            .attr("y2", marginTop)
        
    }

    const toolTip = d3.select(document.getElementById("tooltip-" + toolId));

    toolTip.style("visibility", "visible")
            .style("top", d.clientY + "px")
            .style("left", d.clientX + "px");

    for (let i = 0; i < selectedData.length; i++) {
        if (selectedData[i].isSelected) {
            const element = toolTip.select(".tooltip-element-" + i);
            const index = indexArr.find((d) => d.id === selectedData[i].id).value;
            const arr = data.find((d) => d.id === selectedData[i].id)
            const value = element.select(".value")
            const formatted = d3.format(format)(arr["data"][index][y])
            value.html(formatted);
        }
    }
}

function mouseOut(toolId,e) {
    const svg = d3.select(e);

    svg.select(".hoverline")
        .attr("opacity", 0)

    const toolTip = d3.select(document.getElementById("tooltip-" + toolId));
        toolTip.style("visibility", "hidden")        
}

/**
 * A simple responsive line chart component, it can take a single or multiple different entries and visualize them onto the chart.
 * It's capable of determining the types of the elements passed in. Easily customizable to allow for usage without additional bloat from custom css.
 * Allows for custom accessors but requires for data to still be formatted in correct structure. Can accept dates, strings (categorical values), and numbers. 
 */
function LineChart({
    data,
    onDataChange,
    width = 500,
    height = 300,
    title,
    titleAlignment="center",
    scale = "linear",
    factor = 2,
    toolTipFormat = "0.2f",
    xAxisFormat,
    yAxisFormat,
    x = "x",
    y = "y",
    legend="true",
    legendPos="top",
    marginTop = 0,
    marginBottom = 20,
    marginLeft = 20,
    marginRight = 20,
}: LineChartProps) {
    const svgRef = useRef();
    // we will need to refactor this later for changing it.
    const colorScale = d3.schemeTableau10;
    const [legendState, setLegendState] = useState<[{id: string, backgroundColor: string, textDecoration: string}]>([]);
    const [selected, setSelected] = useState<[{id: string, isSelected: boolean}]>([]);
    const toolId = useId();

    // we should set the initial state here.
    useEffect(() => {
        if (data !== null && data !== undefined && data.length !== 0) {
            const initialLegendState = data.map(function(d,i) {
                return {
                    "id": d.id,
                    backgroundColor: colorScale[i],
                    textDecoration: "none"
                }
            });

            const initialSelected = data.map(function(d,i) {
                return {
                    "id": d.id,
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
        
        svg.selectAll(".line")
            .data(data)
            .join("path")
            .attr("class", "line")
            .attr("d", function(d) {
                return line(d["data"])
            })
            .attr("fill", "none")
            .attr("stroke", function(d, i) {
                if (selected.length > 0 && !selected[i].isSelected) {
                    return "#0f0f0f";
                }
                return colorScale[i];                    
            })
            .attr("opacity", function(d, i) {
                if (selected.length > 0 && !selected[i].isSelected) {
                    return 0.25;
                }
                return 1.0;                    
            });            

        svg.on("mouseenter", function() {
            return mouseOver(toolId, this)
        });
        svg.on("mousemove", function(event) {
           return mouseMove(data, selected, x, y, scaleX, toolTipFormat, marginLeft, marginRight, marginBottom, marginTop, width, height, toolId, event, this)
        });
        svg.on("mouseleave", function() {
            return mouseOut(toolId, this);
        });
        
    }, [data, scale, factor, height, width, x, y, marginTop, marginLeft, marginRight, marginBottom, selected]);

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
        let index = state.indexOf(item);

        let selectedItem = selectedState.find((element) => element.id === d);

        if (item.textDecoration === "none") {
            item.textDecoration = "line-through";
            item.backgroundColor = "#808080";
            selectedItem.isSelected = false;
        } else {
            item.textDecoration = "none";
            item.backgroundColor = colorScale[index];
            selectedItem.isSelected = true;                        
        }

        setLegendState(state);
        setSelected(selectedState);
        if (onDataChange !== undefined) {
            onDataChange(selectedState);
        }
    }

    const items = data.map((d,i) => 
            <div className="legend-element" key={d.id} onClick={() => handleClick(d.id)}>
                <div className="swatch" style={{backgroundColor: legendState.length > 0 ? legendState[i].backgroundColor : colorScale[i]}}></div>
                <button onClick={() => handleClick(d.id)} style={{textDecoration: legendState.length > 0 ? legendState[i].textDecoration : null}}>{d.id}</button>
            </div>
    )
    return (
        <div className="legend">
            {items}
        </div>
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
        <div id={"tooltip-" + toolId} className="tooltip">
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
        {legendPos === "top" ? <Legend/> : null }
        <svg ref={svgRef} viewBox={0 + " " + 0 + " " +  width + " " + height} preserveAspectRatio="xMidYMid meet">
            <g className="x-axis"></g> 
            <g className="y-axis"></g> 
            <line className="hoverline"></line>
        </svg>
        {legendPos === "bottom" ? <Legend/> : null }
        <Tooltip/>
    </div>

)};

export default LineChart;