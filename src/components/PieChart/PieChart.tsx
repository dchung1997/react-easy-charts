import React, { useRef, useEffect, useState, useId } from "react";
import * as d3 from "d3";

import './PieChart.css';


export interface PieChartProps {

    data: [ 
            {
                name: string,
                value: number
            }
    ];

    onDataChange?: (data: unknown) => void;

    legend?: boolean;
    legendPos?: "top" | "bottom";

    title?: string;
    titleAlignment?: "left" | "right" | "center";

    width?: number;
    height?: number;

    radiusInner?: number;
    radiusOuter?: number;

    upperTextThreshold?: number,
    lowerTextThreshold?: number,

    marginTop?: number;
    marginBottom?: number;
    marginLeft?: number;
    marginRight?: number;

}

function PieChart({
    data,
    onDataChange,
    width = 500,
    height = 300,
    title,
    titleAlignment="center",
    legend="true",
    legendPos="top",
    radiusInner = 0.67,
    radiusOuter = 1,
    upperTextThreshold = .2,
    lowerTextThreshold = .25,
    marginTop = 0,
    marginBottom = 20,
    marginLeft = 20,
    marginRight = 20,
}: PieChartProps) {
    const svgRef = useRef();
    const [legendState, setLegendState] = useState<[{id: string, backgroundColor: string, textDecoration: string}]>([]);
    const [selected, setSelected] = useState<[{id: string, isSelected: boolean}]>([]);

    useEffect(() => {
        if (data !== null && data !== undefined && data.length !== 0) {
            const colorScale = d3.scaleOrdinal().domain(data.map(d => d.name)).range(d3.quantize(t => d3.interpolateSpectral(t * 0.8 + 0.1), data.length).reverse());

            const initialLegendState = data.map(function(d) {
                return {
                    "id": d.name,
                    backgroundColor: colorScale(d.name),
                    textDecoration: "none"
                }
            });

            const initialSelected = data.map(function(d,i) {
                return {
                    "id": d.name,
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
                throw new Error("Data must not be empty, undefined, or null for Pie Chart.");
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
         *      data: [
         *          name:
         *          value:
         *      ],
         */

        // we need to check if data is formatted properly.
        const peakHead = data[0];

        if (peakHead.name === null || peakHead.name === undefined) {
            try {
                throw new TypeError("Name for Data must be defined.");
            } catch (e) {
                console.error(e.stack); 
                return undefined;                  
            }    
        }

        if (peakHead.value === null || peakHead.value === undefined) {
            try {
                throw new TypeError("Value for Data must be defined.");
            } catch (e) {
                console.error(e.stack); 
                return undefined;                  
            }      
        }


        if (typeof peakHead.name !== "string") {
            try {
                throw new TypeError("Name for Data in Pie Chart must be a string.");
            } catch (e) {
                console.error(e.stack); 
                return undefined;                  
            }    
        }

        if (typeof peakHead.value !== "number") {
            try {
                throw new TypeError("Value for Data in Pie Chart must be a number.");
            } catch (e) {
                console.error(e.stack); 
                return undefined;                  
            }      
        }

        const svg = d3.select(svgRef.current);
        const radius = Math.min(width, height) / 2;
      
        const arc = d3.arc()
            .innerRadius(radius * radiusInner)
            .outerRadius(radius - radiusOuter);
      
        const pie = d3.pie()
            .padAngle(1 / radius)
            .sort(null)
            .value(d => d.value);
        
        const colorScale = d3.scaleOrdinal().domain(data.map(d => d.name)).range(d3.quantize(t => d3.interpolateSpectral(t * 0.8 + 0.1), data.length).reverse());

        svg.attr("width", width)
            .attr("height", height)

        let categories: Array<object> = []
        data.forEach(function(d) {
            const index = selected.findIndex((e) => e.id === d.name);
            if (selected.length > 0 && selected[index].isSelected) {
                categories.push(d);
            }
        });

        svg.selectAll("path").data(pie(categories))
            .join(function(enter){
                enter.append("path")
                    .attr("fill", function(d){
                        return colorScale(d.data.name);
                    })
                    .attr("d", arc)
                    .append("title")
                    .text(d => `${d.data.name}: ${d.data.value.toLocaleString()}`);                  
            }, function(update){
                update.attr("fill", function(d) {
                        return colorScale(d.data.name);
                    })
                    .attr("d", arc);

            }, function(exit){
                exit.remove()
            }); 

        svg.selectAll("g")
            .data(pie(categories))
            .join(function(enter) {
                let text = enter.append("g")
                    .attr("font-family", "sans-serif")
                    .attr("font-size", 12)
                    .attr("text-anchor", "middle")                
                    .append("text")
                    .attr("transform", d => `translate(${arc.centroid(d)})`);
            
                text.filter(d => (Math.round(d.endAngle * 100) - (Math.round(d.startAngle * 100)) > Math.round(upperTextThreshold * 100)))
                    .append("tspan")
                    .attr("class", "name")
                    .attr("y", "-0.4em")
                    .attr("font-weight", "bold")
                    .text(d => d.data.name);
                
                text.filter(d => (Math.round(d.endAngle * 100) - (Math.round(d.startAngle * 100)) > Math.round(lowerTextThreshold * 100)))
                    .append("tspan")
                    .attr("class", "value")
                    .attr("x", 0)
                    .attr("y", "0.7em")
                    .attr("fill-opacity", 0.7)
                    .text(d => d.data.value.toLocaleString("en-US"));  
                
            }, 
            function(update) {
                update.select("text")
                    .attr("transform", d => `translate(${arc.centroid(d)})`);

                update.selectAll("tspan.name").remove(); 
                update.selectAll("tspan.value").remove(); 

                const sliceNamesToUpdate = update.filter(d => (Math.round(d.endAngle * 100) - (Math.round(d.startAngle * 100)) > Math.round(upperTextThreshold * 100)));

                sliceNamesToUpdate.select("text")
                .append("tspan")
                .attr("class", "name")
                .attr("y", "-0.4em")
                .attr("font-weight", "bold")
                .text(d => d.data.name);
               
                const sliceValuesToUpdate = update.filter(d => (Math.round(d.endAngle * 100) - (Math.round(d.startAngle * 100)) > Math.round(lowerTextThreshold * 100)));
                sliceValuesToUpdate.select("text")
                    .append("tspan") 
                    .attr("class", "value")
                    .attr("x", 0)
                    .attr("y", "0.7em")
                    .attr("fill-opacity", 0.7)
                    .text(d => d.data.value.toLocaleString("en-US")); 

            },
            function(exit) {
                return exit.remove();
            })
    }, [data, height, width, radiusInner, radiusOuter, upperTextThreshold, lowerTextThreshold, marginTop, marginLeft, marginRight, marginBottom, selected]);

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
    if (!legend || data === null || data === undefined || data.length === 0 || 
        data[0].name === undefined || data[0].value == null || 
        data[0].value == undefined || data[0].value == null) {
        return null;
    }

    const colorScale = d3.scaleOrdinal().domain(data.map(d => d.name)).range(d3.quantize(t => d3.interpolateSpectral(t * 0.8 + 0.1), data.length).reverse());

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
            item.backgroundColor = colorScale(item.id);
            selectedItem.isSelected = true;                        
        }

        setLegendState(state);
        setSelected(selectedState);
        if (onDataChange !== undefined) {
            onDataChange(selectedState);
        }
    }

    const items = data.map((d,i) => 
            <div className="legend-element" key={d.name} onClick={() => handleClick(d.name)}>
                <div className="swatch" style={{backgroundColor: legendState.length > 0 ? legendState[i].backgroundColor : colorScale(d.name)}}></div>
                <button onClick={() => handleClick(d.name)} style={{textDecoration: legendState.length > 0 ? legendState[i].textDecoration : null}}>{d.name}</button>
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
    <div className="piechart-container" style={containerStyle} data-testid="piechart">
        <Title/>
        {legendPos === "top" ? <Legend/> : null }
        <svg ref={svgRef} viewBox={-width/2 + " " + -height/2 + " " +  width + " " + height} preserveAspectRatio="xMidYMid meet" data-testid="piechart-svg"></svg>
        {legendPos === "bottom" ? <Legend/> : null }
    </div>

)};

export default PieChart;