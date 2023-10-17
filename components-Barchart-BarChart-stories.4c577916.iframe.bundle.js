"use strict";(self.webpackChunkreact_easy_charts=self.webpackChunkreact_easy_charts||[]).push([[159],{"./src/components/Barchart/BarChart.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Empty:()=>Empty,Grouped:()=>Grouped,GroupedVertical:()=>GroupedVertical,Horizontal:()=>Horizontal,Stacked:()=>Stacked,StackedVertical:()=>StackedVertical,Vertical:()=>Vertical,__namedExportsOrder:()=>__namedExportsOrder,default:()=>BarChart_stories});var react=__webpack_require__("./node_modules/react/index.js"),src=__webpack_require__("./node_modules/d3/src/index.js"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function getScale(data,accessor,type,alignment,width,height,marginLeft,marginRight,marginBottom,marginTop){if("vertical"===alignment&&"x"===accessor||"horizontal"===alignment&&"y"===accessor){if("string"!=typeof data[0][accessor]){try{throw new TypeError("Axis for value in Bar Chart must be a string.")}catch(e){console.error(e.stack)}return null}const categories=Array.from(new Set(data.map((function(e){return e[accessor]}))));return"x"===accessor?src.tiA().domain(categories).range([marginLeft,width-marginRight]).paddingInner(.25):src.tiA().domain(categories).range([height-marginBottom,marginTop]).paddingInner(.25)}const categories="x"===accessor?src.ruo(data,(d=>d.y)):src.ruo(data,(d=>d.x));let max,sum=[];switch(type.toLowerCase()){case"stacked":return categories.forEach((function(d){sum.push(src.Smz(d,(d=>d[accessor])))})),max=src.Fp7(sum),"x"===accessor?src.BYU().domain([0,max]).range([marginLeft,width-marginRight]):src.BYU().domain([0,max]).range([height-marginBottom,marginTop]);case"grouped":return categories.forEach((function(d){d.forEach((function(e){sum.push(e[accessor])}))})),max=src.Fp7(sum),"x"===accessor?src.BYU().domain([0,max]).range([marginLeft,width-marginRight]):src.BYU().domain([0,max]).range([height-marginBottom,marginTop]);case"normal":return data.forEach((function(d){sum.push(d[accessor])})),max=src.Fp7(sum),"x"===accessor?src.BYU().domain([0,max]).range([marginLeft,width-marginRight]):src.BYU().domain([0,max]).range([height-marginBottom,marginTop]);default:try{throw new TypeError("Unsupported type for Bar Chart.")}catch(e){console.error(e.stack)}return null}}function BarChart(_ref){let{data,onDataChange,width=500,height=300,title,titleAlignment="center",type="normal",alignment="vertical",xAxisFormat,yAxisFormat,marginTop=20,marginBottom=20,marginLeft=20,marginRight=20}=_ref;if(null==data||0===data.length){try{throw new Error("Data must not be empty, undefined, or null for Line Chart.")}catch(e){console.error(e.stack)}return}const svgRef=(0,react.useRef)(),group=data[0].id?src.ruo(data,(d=>d.id)):"horizontal"===alignment?src.ruo(data,(d=>d.y)):src.ruo(data,(d=>d.x)),keys=Array.from(group.keys()),colorScale=src.PKp().domain(keys).range(src.K2I);(0,react.useEffect)((()=>{const svg=src.Ys(svgRef.current),scaleX=getScale(data,"x",type,alignment,width,height,marginLeft,marginRight,marginBottom,marginTop),scaleY=getScale(data,"y",type,alignment,width,height,marginBottom,marginTop,marginBottom,marginTop);if(null===scaleX||null===scaleY)return;const xAxis=xAxisFormat?src.LLu(scaleX).tickFormat(src.WUZ(xAxisFormat)):src.LLu(scaleX),yAxis=yAxisFormat?src.y4O(scaleY).tickFormat(src.WUZ(yAxisFormat)):src.y4O(scaleY);svg.select(".x-axis").attr("transform",`translate(0,${height-marginBottom})`).call(xAxis.tickSize(2*marginTop-height)).call((g=>g.select(".domain").remove())).call((g=>g.selectAll(".tick line").attr("stroke-opacity",.1))),svg.select(".y-axis").attr("transform",`translate(${marginLeft},0)`).call(yAxis.tickSize(2*marginRight-width)).call((g=>g.select(".domain").remove())).call((g=>g.selectAll(".tick line").attr("stroke-opacity",.1)));const groups="horizontal"===alignment?src.Xxj(data,(d=>d.y)):src.Xxj(data,(d=>d.x));let categories=[];groups.forEach((function(d){categories.push(d[1])}));const barType=type.toLowerCase();let prev=0;svg.selectAll(".section").data(categories).join("g").attr("class","section").selectAll(".bar").data((element=>element)).join("rect").attr("class","bar").attr("x",(function(d,i,s){if("horizontal"===alignment){if("stacked"===barType){const val=scaleX(d.x)-scaleX(scaleX.domain()[0]);if(i>0){const newVal=prev;return prev=val+prev,newVal}return prev=val+marginLeft,marginLeft}return marginLeft}if("vertical"===alignment){const size=s.length;return"grouped"===barType?scaleX(d.x)+scaleX.bandwidth()/size*i:scaleX(d.x)}})).attr("y",(function(d,i,s){if("vertical"===alignment){if("stacked"===barType){const val=scaleY(scaleY.domain()[0])-scaleY(d.y),val2=scaleY(d.y);return i>0?(prev-=val,prev):(prev=val2,prev)}return scaleY(d.y)}if("horizontal"===alignment){if("grouped"===barType){const size=s.length;return scaleY(d.y)+scaleY.bandwidth()/size*i}return scaleY(d.y)}})).attr("width",(function(d,i,s){if("horizontal"===alignment)return scaleX(d.x)-scaleX(scaleX.domain()[0]);if("grouped"===barType){const size=s.length;return scaleX.bandwidth()/size}return scaleX.bandwidth()})).attr("height",(function(d,i,s){if("vertical"===alignment)return scaleY(scaleY.domain()[0])-scaleY(d.y);if("grouped"===barType){const size=s.length;return scaleY.bandwidth()/size}return scaleY.bandwidth()})).attr("fill",(function(d,i){return d.id?colorScale(d.id):colorScale("horizontal"===alignment?d.y:d.x)}))}),[data,type,alignment,height,width,marginTop,marginLeft,marginRight,marginBottom]);const containerStyle={maxWidth:width};function Title(){if(null==title||""===title)return null;const titleStyle={textAlign:titleAlignment};return(0,jsx_runtime.jsxs)("h3",{style:titleStyle,children:[" ",title," "]})}return(0,jsx_runtime.jsxs)("div",{className:"barchart-container",style:containerStyle,"data-testid":"barchart",children:[(0,jsx_runtime.jsx)(Title,{}),(0,jsx_runtime.jsxs)("svg",{ref:svgRef,viewBox:"0 0 "+width+" "+height,preserveAspectRatio:"xMidYMid meet","data-testid":"linechart-svg",children:[(0,jsx_runtime.jsx)("g",{className:"x-axis"}),(0,jsx_runtime.jsx)("g",{className:"y-axis"})]})]})}BarChart.displayName="BarChart";const Barchart_BarChart=BarChart;try{BarChart.displayName="BarChart",BarChart.__docgenInfo={description:"A responsive bar chart component. It should be able to display data vertically and horizontally.\nBar Chart should be able to show data stack and grouped.\nonDataChange should result when clicking on an individual group or bar.",displayName:"BarChart",props:{data:{defaultValue:null,description:"Id is required when using a stacked or grouped bar chart for categorical purposes otherwise x or y is used depending on alignment of chart.",name:"data",required:!0,type:{name:"[{ id?: string | undefined; x: string | number; y: string | number; }]"}},onDataChange:{defaultValue:null,description:"",name:"onDataChange",required:!1,type:{name:"((data: unknown) => void)"}},xAxisFormat:{defaultValue:null,description:"",name:"xAxisFormat",required:!1,type:{name:"string"}},yAxisFormat:{defaultValue:null,description:"",name:"yAxisFormat",required:!1,type:{name:"string"}},title:{defaultValue:null,description:"",name:"title",required:!1,type:{name:"string"}},titleAlignment:{defaultValue:{value:"center"},description:"",name:"titleAlignment",required:!1,type:{name:"enum",value:[{value:'"left"'},{value:'"right"'},{value:'"center"'}]}},alignment:{defaultValue:{value:"vertical"},description:"",name:"alignment",required:!1,type:{name:"enum",value:[{value:'"vertical"'},{value:'"horizontal"'}]}},type:{defaultValue:{value:"normal"},description:"",name:"type",required:!1,type:{name:"enum",value:[{value:'"normal"'},{value:'"stacked"'},{value:'"grouped"'}]}},width:{defaultValue:{value:"500"},description:"",name:"width",required:!1,type:{name:"number"}},height:{defaultValue:{value:"300"},description:"",name:"height",required:!1,type:{name:"number"}},marginTop:{defaultValue:{value:"20"},description:"",name:"marginTop",required:!1,type:{name:"number"}},marginBottom:{defaultValue:{value:"20"},description:"",name:"marginBottom",required:!1,type:{name:"number"}},marginLeft:{defaultValue:{value:"20"},description:"",name:"marginLeft",required:!1,type:{name:"number"}},marginRight:{defaultValue:{value:"20"},description:"",name:"marginRight",required:!1,type:{name:"number"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/Barchart/BarChart.tsx#BarChart"]={docgenInfo:BarChart.__docgenInfo,name:"BarChart",path:"src/components/Barchart/BarChart.tsx#BarChart"})}catch(__react_docgen_typescript_loader_error){}const BarChart_stories={title:"Components/BarChart",component:Barchart_BarChart,tags:["autodocs"]},Stacked={args:{data:[{id:"lol",x:3,y:"what"},{id:"op",x:12,y:"what"},{id:"laol",x:13,y:"what"},{id:"lol",x:3,y:"ses"},{id:"op",x:21,y:"ses"},{id:"laol",x:31,y:"ses"},{id:"lol",x:2,y:"ex"},{id:"op",x:42,y:"ex"},{id:"laol",x:231,y:"ex"},{id:"ladl",x:154,y:"ex"},{id:"rawe",x:79,y:"ex"}],alignment:"horizontal",type:"Stacked",title:"Stacked Horizontal Bar Chart",width:500,height:300,marginLeft:25}},Grouped={args:{data:[{id:"lol",x:3,y:"what"},{id:"op",x:12,y:"what"},{id:"laol",x:13,y:"what"},{id:"lol",x:3,y:"ses"},{id:"op",x:21,y:"ses"},{id:"laol",x:31,y:"ses"},{id:"lol",x:2,y:"ex"},{id:"op",x:42,y:"ex"},{id:"laol",x:231,y:"ex"},{id:"ladl",x:154,y:"ex"},{id:"rawe",x:79,y:"ex"}],alignment:"horizontal",type:"Grouped",title:"Grouped Horizontal Bar Chart",width:500,height:300,marginLeft:25}},Horizontal={args:{data:[{x:3,y:"what"},{x:21,y:"ses"},{x:31,y:"ex"}],alignment:"horizontal",type:"normal",title:"Horizontal Bar Chart",width:500,height:300,marginLeft:25}},Vertical={args:{data:[{x:"what",y:20},{x:"ses",y:42},{x:"ex",y:10}],alignment:"vertical",type:"normal",title:"Vertical Bar Chart",width:500,height:300,marginLeft:25}},StackedVertical={args:{data:[{id:"lol",y:3,x:"what"},{id:"op",y:12,x:"what"},{id:"laol",y:13,x:"what"},{id:"lol",y:3,x:"ses"},{id:"op",y:21,x:"ses"},{id:"laol",y:31,x:"ses"},{id:"lol",y:2,x:"ex"},{id:"op",y:42,x:"ex"},{id:"laol",y:231,x:"ex"},{id:"ladl",y:154,x:"ex"},{id:"rawe",y:79,x:"ex"}],alignment:"vertical",type:"Stacked",title:"Stacked Vertical Bar Chart",width:500,height:300,marginLeft:25}},GroupedVertical={args:{data:[{id:"lol",y:3,x:"what"},{id:"op",y:12,x:"what"},{id:"laol",y:13,x:"what"},{id:"lol",y:3,x:"ses"},{id:"op",y:21,x:"ses"},{id:"laol",y:31,x:"ses"},{id:"lol",y:2,x:"ex"},{id:"op",y:42,x:"ex"},{id:"laol",y:231,x:"ex"},{id:"ladl",y:154,x:"ex"},{id:"rawe",y:79,x:"ex"}],alignment:"vertical",type:"Grouped",title:"Grouped Vertical Bar Chart",width:500,height:300,marginLeft:25}},Empty={args:{data:[],width:500,height:300}};Stacked.parameters={...Stacked.parameters,docs:{...Stacked.parameters?.docs,source:{originalSource:'{\n  args: {\n    data: [{\n      id: "lol",\n      x: 3,\n      y: "what"\n    }, {\n      id: "op",\n      x: 12,\n      y: "what"\n    }, {\n      id: "laol",\n      x: 13,\n      y: "what"\n    }, {\n      id: "lol",\n      x: 3,\n      y: "ses"\n    }, {\n      id: "op",\n      x: 21,\n      y: "ses"\n    }, {\n      id: "laol",\n      x: 31,\n      y: "ses"\n    }, {\n      id: "lol",\n      x: 2,\n      y: "ex"\n    }, {\n      id: "op",\n      x: 42,\n      y: "ex"\n    }, {\n      id: "laol",\n      x: 231,\n      y: "ex"\n    }, {\n      id: "ladl",\n      x: 154,\n      y: "ex"\n    }, {\n      id: "rawe",\n      x: 79,\n      y: "ex"\n    }],\n    alignment: "horizontal",\n    type: "Stacked",\n    title: "Stacked Horizontal Bar Chart",\n    width: 500,\n    height: 300,\n    marginLeft: 25\n  }\n}',...Stacked.parameters?.docs?.source}}},Grouped.parameters={...Grouped.parameters,docs:{...Grouped.parameters?.docs,source:{originalSource:'{\n  args: {\n    data: [{\n      id: "lol",\n      x: 3,\n      y: "what"\n    }, {\n      id: "op",\n      x: 12,\n      y: "what"\n    }, {\n      id: "laol",\n      x: 13,\n      y: "what"\n    }, {\n      id: "lol",\n      x: 3,\n      y: "ses"\n    }, {\n      id: "op",\n      x: 21,\n      y: "ses"\n    }, {\n      id: "laol",\n      x: 31,\n      y: "ses"\n    }, {\n      id: "lol",\n      x: 2,\n      y: "ex"\n    }, {\n      id: "op",\n      x: 42,\n      y: "ex"\n    }, {\n      id: "laol",\n      x: 231,\n      y: "ex"\n    }, {\n      id: "ladl",\n      x: 154,\n      y: "ex"\n    }, {\n      id: "rawe",\n      x: 79,\n      y: "ex"\n    }],\n    alignment: "horizontal",\n    type: "Grouped",\n    title: "Grouped Horizontal Bar Chart",\n    width: 500,\n    height: 300,\n    marginLeft: 25\n  }\n}',...Grouped.parameters?.docs?.source}}},Horizontal.parameters={...Horizontal.parameters,docs:{...Horizontal.parameters?.docs,source:{originalSource:'{\n  args: {\n    data: [{\n      x: 3,\n      y: "what"\n    }, {\n      x: 21,\n      y: "ses"\n    }, {\n      x: 31,\n      y: "ex"\n    }],\n    alignment: "horizontal",\n    type: "normal",\n    title: "Horizontal Bar Chart",\n    width: 500,\n    height: 300,\n    marginLeft: 25\n  }\n}',...Horizontal.parameters?.docs?.source}}},Vertical.parameters={...Vertical.parameters,docs:{...Vertical.parameters?.docs,source:{originalSource:'{\n  args: {\n    data: [{\n      x: "what",\n      y: 20\n    }, {\n      x: "ses",\n      y: 42\n    }, {\n      x: "ex",\n      y: 10\n    }],\n    alignment: "vertical",\n    type: "normal",\n    title: "Vertical Bar Chart",\n    width: 500,\n    height: 300,\n    marginLeft: 25\n  }\n}',...Vertical.parameters?.docs?.source}}},StackedVertical.parameters={...StackedVertical.parameters,docs:{...StackedVertical.parameters?.docs,source:{originalSource:'{\n  args: {\n    data: [{\n      id: "lol",\n      y: 3,\n      x: "what"\n    }, {\n      id: "op",\n      y: 12,\n      x: "what"\n    }, {\n      id: "laol",\n      y: 13,\n      x: "what"\n    }, {\n      id: "lol",\n      y: 3,\n      x: "ses"\n    }, {\n      id: "op",\n      y: 21,\n      x: "ses"\n    }, {\n      id: "laol",\n      y: 31,\n      x: "ses"\n    }, {\n      id: "lol",\n      y: 2,\n      x: "ex"\n    }, {\n      id: "op",\n      y: 42,\n      x: "ex"\n    }, {\n      id: "laol",\n      y: 231,\n      x: "ex"\n    }, {\n      id: "ladl",\n      y: 154,\n      x: "ex"\n    }, {\n      id: "rawe",\n      y: 79,\n      x: "ex"\n    }],\n    alignment: "vertical",\n    type: "Stacked",\n    title: "Stacked Vertical Bar Chart",\n    width: 500,\n    height: 300,\n    marginLeft: 25\n  }\n}',...StackedVertical.parameters?.docs?.source}}},GroupedVertical.parameters={...GroupedVertical.parameters,docs:{...GroupedVertical.parameters?.docs,source:{originalSource:'{\n  args: {\n    data: [{\n      id: "lol",\n      y: 3,\n      x: "what"\n    }, {\n      id: "op",\n      y: 12,\n      x: "what"\n    }, {\n      id: "laol",\n      y: 13,\n      x: "what"\n    }, {\n      id: "lol",\n      y: 3,\n      x: "ses"\n    }, {\n      id: "op",\n      y: 21,\n      x: "ses"\n    }, {\n      id: "laol",\n      y: 31,\n      x: "ses"\n    }, {\n      id: "lol",\n      y: 2,\n      x: "ex"\n    }, {\n      id: "op",\n      y: 42,\n      x: "ex"\n    }, {\n      id: "laol",\n      y: 231,\n      x: "ex"\n    }, {\n      id: "ladl",\n      y: 154,\n      x: "ex"\n    }, {\n      id: "rawe",\n      y: 79,\n      x: "ex"\n    }],\n    alignment: "vertical",\n    type: "Grouped",\n    title: "Grouped Vertical Bar Chart",\n    width: 500,\n    height: 300,\n    marginLeft: 25\n  }\n}',...GroupedVertical.parameters?.docs?.source}}},Empty.parameters={...Empty.parameters,docs:{...Empty.parameters?.docs,source:{originalSource:"{\n  args: {\n    data: [],\n    width: 500,\n    height: 300\n  }\n}",...Empty.parameters?.docs?.source}}};const __namedExportsOrder=["Stacked","Grouped","Horizontal","Vertical","StackedVertical","GroupedVertical","Empty"]}}]);