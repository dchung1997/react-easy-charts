"use strict";(self.webpackChunkreact_easy_charts=self.webpackChunkreact_easy_charts||[]).push([[744],{"./src/components/PieChart/PieChart.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Donut:()=>Donut,Pie:()=>Pie,__namedExportsOrder:()=>__namedExportsOrder,default:()=>PieChart_stories});var react=__webpack_require__("./node_modules/react/index.js"),src=__webpack_require__("./node_modules/d3/src/index.js"),injectStylesIntoStyleTag=__webpack_require__("./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js"),injectStylesIntoStyleTag_default=__webpack_require__.n(injectStylesIntoStyleTag),styleDomAPI=__webpack_require__("./node_modules/style-loader/dist/runtime/styleDomAPI.js"),styleDomAPI_default=__webpack_require__.n(styleDomAPI),insertBySelector=__webpack_require__("./node_modules/style-loader/dist/runtime/insertBySelector.js"),insertBySelector_default=__webpack_require__.n(insertBySelector),setAttributesWithoutAttributes=__webpack_require__("./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js"),setAttributesWithoutAttributes_default=__webpack_require__.n(setAttributesWithoutAttributes),insertStyleElement=__webpack_require__("./node_modules/style-loader/dist/runtime/insertStyleElement.js"),insertStyleElement_default=__webpack_require__.n(insertStyleElement),styleTagTransform=__webpack_require__("./node_modules/style-loader/dist/runtime/styleTagTransform.js"),styleTagTransform_default=__webpack_require__.n(styleTagTransform),PieChart=__webpack_require__("./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[7].use[1]!./src/components/PieChart/PieChart.css"),options={};options.styleTagTransform=styleTagTransform_default(),options.setAttributes=setAttributesWithoutAttributes_default(),options.insert=insertBySelector_default().bind(null,"head"),options.domAPI=styleDomAPI_default(),options.insertStyleElement=insertStyleElement_default();injectStylesIntoStyleTag_default()(PieChart.c,options);PieChart.c&&PieChart.c.locals&&PieChart.c.locals;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function PieChart_PieChart_PieChart(_ref){let{data,onDataChange,width=500,height=300,title,titleAlignment="center",legend="true",legendPos="top",radiusInner=.67,radiusOuter=1,upperTextThreshold=.2,lowerTextThreshold=.25,marginTop=0,marginBottom=20,marginLeft=20,marginRight=20}=_ref;const svgRef=(0,react.useRef)(),[legendState,setLegendState]=(0,react.useState)([]),[selected,setSelected]=(0,react.useState)([]);function Title(){if(null==title||""===title)return null;const titleStyle={textAlign:titleAlignment};return(0,jsx_runtime.jsxs)("h3",{style:titleStyle,children:[" ",title," "]})}function Legend(){if(!legend||null==data||0===data.length||void 0===data[0].name||null==data[0].value||null==data[0].value||null==data[0].value)return null;const colorScale=src.knW().domain(data.map((d=>d.name))).range(src.uUW((t=>src.gJL(.8*t+.1)),data.length).reverse());function handleClick(d){let state=legendState.map((d=>JSON.parse(JSON.stringify(d)))),selectedState=selected.map((d=>JSON.parse(JSON.stringify(d)))),item=state.find((element=>element.id===d)),selectedItem=selectedState.find((element=>element.id===d));"none"===item.textDecoration?(item.textDecoration="line-through",item.backgroundColor="#808080",selectedItem.isSelected=!1):(item.textDecoration="none",item.backgroundColor=colorScale(item.id),selectedItem.isSelected=!0),setLegendState(state),setSelected(selectedState),void 0!==onDataChange&&onDataChange(selectedState)}const items=data.map(((d,i)=>(0,jsx_runtime.jsxs)("div",{className:"legend-element",onClick:()=>handleClick(d.name),children:[(0,jsx_runtime.jsx)("div",{className:"swatch",style:{backgroundColor:legendState.length>0?legendState[i].backgroundColor:colorScale(d.name)}}),(0,jsx_runtime.jsx)("button",{onClick:()=>handleClick(d.name),style:{textDecoration:legendState.length>0?legendState[i].textDecoration:null},children:d.name})]},d.name)));return(0,jsx_runtime.jsx)("div",{className:"legend",children:items})}(0,react.useEffect)((()=>{if(null!=data&&0!==data.length){const colorScale=src.knW().domain(data.map((d=>d.name))).range(src.uUW((t=>src.gJL(.8*t+.1)),data.length).reverse()),initialLegendState=data.map((function(d){return{id:d.name,backgroundColor:colorScale(d.name),textDecoration:"none"}})),initialSelected=data.map((function(d,i){return{id:d.name,isSelected:!0}}));setLegendState([...initialLegendState]),setSelected([...initialSelected])}}),[data]),(0,react.useEffect)((()=>{if(null==data||0===data.length){try{throw new Error("Data must not be empty, undefined, or null for Pie Chart.")}catch(e){console.error(e.stack)}return}const peakHead=data[0];if(null===peakHead.name||void 0===peakHead.name)try{throw new TypeError("Name for Data must be defined.")}catch(e){return void console.error(e.stack)}if(null===peakHead.value||void 0===peakHead.value)try{throw new TypeError("Value for Data must be defined.")}catch(e){return void console.error(e.stack)}if("string"!=typeof peakHead.name)try{throw new TypeError("Name for Data in Pie Chart must be a string.")}catch(e){return void console.error(e.stack)}if("number"!=typeof peakHead.value)try{throw new TypeError("Value for Data in Pie Chart must be a number.")}catch(e){return void console.error(e.stack)}const svg=src.MlD(svgRef.current),radius=Math.min(width,height)/2,arc=src.qoN().innerRadius(radius*radiusInner).outerRadius(radius-radiusOuter),pie=src._gT().padAngle(1/radius).sort(null).value((d=>d.value)),colorScale=src.knW().domain(data.map((d=>d.name))).range(src.uUW((t=>src.gJL(.8*t+.1)),data.length).reverse());svg.attr("width",width).attr("height",height);let categories=[];data.forEach((function(d){const index=selected.findIndex((e=>e.id===d.name));selected.length>0&&selected[index].isSelected&&categories.push(d)})),svg.selectAll("path").data(pie(categories)).join((function(enter){enter.append("path").attr("fill",(function(d){return colorScale(d.data.name)})).attr("d",arc).append("title").text((d=>`${d.data.name}: ${d.data.value.toLocaleString()}`))}),(function(update){update.attr("fill",(function(d){return colorScale(d.data.name)})).attr("d",arc)}),(function(exit){exit.remove()})),svg.selectAll("g").data(pie(categories)).join((function(enter){let text=enter.append("g").attr("font-family","sans-serif").attr("font-size",12).attr("text-anchor","middle").append("text").attr("transform",(d=>`translate(${arc.centroid(d)})`));text.filter((d=>Math.round(100*d.endAngle)-Math.round(100*d.startAngle)>Math.round(100*upperTextThreshold))).append("tspan").attr("class","name").attr("y","-0.4em").attr("font-weight","bold").text((d=>d.data.name)),text.filter((d=>Math.round(100*d.endAngle)-Math.round(100*d.startAngle)>Math.round(100*lowerTextThreshold))).append("tspan").attr("class","value").attr("x",0).attr("y","0.7em").attr("fill-opacity",.7).text((d=>d.data.value.toLocaleString("en-US")))}),(function(update){update.select("text").attr("transform",(d=>`translate(${arc.centroid(d)})`)),update.selectAll("tspan.name").remove(),update.selectAll("tspan.value").remove();update.filter((d=>Math.round(100*d.endAngle)-Math.round(100*d.startAngle)>Math.round(100*upperTextThreshold))).select("text").append("tspan").attr("class","name").attr("y","-0.4em").attr("font-weight","bold").text((d=>d.data.name));update.filter((d=>Math.round(100*d.endAngle)-Math.round(100*d.startAngle)>Math.round(100*lowerTextThreshold))).select("text").append("tspan").attr("class","value").attr("x",0).attr("y","0.7em").attr("fill-opacity",.7).text((d=>d.data.value.toLocaleString("en-US")))}),(function(exit){return exit.remove()}))}),[data,height,width,radiusInner,radiusOuter,upperTextThreshold,lowerTextThreshold,marginTop,marginLeft,marginRight,marginBottom,selected]);const containerStyle={maxWidth:width};return(0,jsx_runtime.jsxs)("div",{className:"piechart-container",style:containerStyle,"data-testid":"piechart",children:[(0,jsx_runtime.jsx)(Title,{}),"top"===legendPos?(0,jsx_runtime.jsx)(Legend,{}):null,(0,jsx_runtime.jsx)("svg",{ref:svgRef,viewBox:-width/2+" "+-height/2+" "+width+" "+height,preserveAspectRatio:"xMidYMid meet","data-testid":"piechart-svg"}),"bottom"===legendPos?(0,jsx_runtime.jsx)(Legend,{}):null]})}PieChart_PieChart_PieChart.displayName="PieChart";const components_PieChart_PieChart=PieChart_PieChart_PieChart;try{PieChart_PieChart_PieChart.displayName="PieChart",PieChart_PieChart_PieChart.__docgenInfo={description:"",displayName:"PieChart",props:{data:{defaultValue:null,description:"",name:"data",required:!0,type:{name:"[{ name: string; value: number; }]"}},onDataChange:{defaultValue:null,description:"",name:"onDataChange",required:!1,type:{name:"((data: unknown) => void)"}},legend:{defaultValue:{value:"true"},description:"",name:"legend",required:!1,type:{name:"boolean"}},legendPos:{defaultValue:{value:"top"},description:"",name:"legendPos",required:!1,type:{name:"enum",value:[{value:'"top"'},{value:'"bottom"'}]}},title:{defaultValue:null,description:"",name:"title",required:!1,type:{name:"string"}},titleAlignment:{defaultValue:{value:"center"},description:"",name:"titleAlignment",required:!1,type:{name:"enum",value:[{value:'"left"'},{value:'"right"'},{value:'"center"'}]}},width:{defaultValue:{value:"500"},description:"",name:"width",required:!1,type:{name:"number"}},height:{defaultValue:{value:"300"},description:"",name:"height",required:!1,type:{name:"number"}},radiusInner:{defaultValue:{value:"0.67"},description:"",name:"radiusInner",required:!1,type:{name:"number"}},radiusOuter:{defaultValue:{value:"1"},description:"",name:"radiusOuter",required:!1,type:{name:"number"}},upperTextThreshold:{defaultValue:{value:"0.2"},description:"",name:"upperTextThreshold",required:!1,type:{name:"number"}},lowerTextThreshold:{defaultValue:{value:"0.25"},description:"",name:"lowerTextThreshold",required:!1,type:{name:"number"}},marginTop:{defaultValue:{value:"0"},description:"",name:"marginTop",required:!1,type:{name:"number"}},marginBottom:{defaultValue:{value:"20"},description:"",name:"marginBottom",required:!1,type:{name:"number"}},marginLeft:{defaultValue:{value:"20"},description:"",name:"marginLeft",required:!1,type:{name:"number"}},marginRight:{defaultValue:{value:"20"},description:"",name:"marginRight",required:!1,type:{name:"number"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/PieChart/PieChart.tsx#PieChart"]={docgenInfo:PieChart_PieChart_PieChart.__docgenInfo,name:"PieChart",path:"src/components/PieChart/PieChart.tsx#PieChart"})}catch(__react_docgen_typescript_loader_error){}const PieChart_stories={title:"Components/PieChart",component:components_PieChart_PieChart,tags:["autodocs"]},Donut={args:{data:[{name:"<5",value:19912018},{name:"5-9",value:20501982},{name:"10-14",value:20679786},{name:"15-19",value:21354481},{name:"20-24",value:22604232},{name:"25-29",value:21698010},{name:"30-34",value:21183639},{name:"35-39",value:19855782},{name:"40-44",value:20796128},{name:"45-49",value:21370368},{name:"50-54",value:22525490},{name:"55-59",value:21001947},{name:"60-64",value:18415681},{name:"65-69",value:14547446},{name:"70-74",value:10587721},{name:"75-79",value:7730129},{name:"80-84",value:5811429},{name:"≥85",value:5938752}],title:"U.S. Census Data",titleAlignment:"center",width:500,height:400,marginLeft:30,toolTipFormat:"0.0f",radiusInner:.67,radiusOuter:1}},Pie={args:{data:[{name:"<5",value:19912018},{name:"5-9",value:20501982},{name:"10-14",value:20679786},{name:"15-19",value:21354481},{name:"20-24",value:22604232},{name:"25-29",value:21698010},{name:"30-34",value:21183639},{name:"35-39",value:19855782},{name:"40-44",value:20796128},{name:"45-49",value:21370368},{name:"50-54",value:22525490},{name:"55-59",value:21001947},{name:"60-64",value:18415681},{name:"65-69",value:14547446},{name:"70-74",value:10587721},{name:"75-79",value:7730129},{name:"80-84",value:5811429},{name:"≥85",value:5938752}],title:"U.S. Census Data",titleAlignment:"center",width:500,height:400,marginLeft:30,toolTipFormat:"0.0f",radiusInner:0,radiusOuter:1}};Donut.parameters={...Donut.parameters,docs:{...Donut.parameters?.docs,source:{originalSource:'{\n  args: {\n    data: [{\n      "name": "<5",\n      "value": 19912018\n    }, {\n      "name": "5-9",\n      "value": 20501982\n    }, {\n      "name": "10-14",\n      "value": 20679786\n    }, {\n      "name": "15-19",\n      "value": 21354481\n    }, {\n      "name": "20-24",\n      "value": 22604232\n    }, {\n      "name": "25-29",\n      "value": 21698010\n    }, {\n      "name": "30-34",\n      "value": 21183639\n    }, {\n      "name": "35-39",\n      "value": 19855782\n    }, {\n      "name": "40-44",\n      "value": 20796128\n    }, {\n      "name": "45-49",\n      "value": 21370368\n    }, {\n      "name": "50-54",\n      "value": 22525490\n    }, {\n      "name": "55-59",\n      "value": 21001947\n    }, {\n      "name": "60-64",\n      "value": 18415681\n    }, {\n      "name": "65-69",\n      "value": 14547446\n    }, {\n      "name": "70-74",\n      "value": 10587721\n    }, {\n      "name": "75-79",\n      "value": 7730129\n    }, {\n      "name": "80-84",\n      "value": 5811429\n    }, {\n      "name": "\\u226585",\n      "value": 5938752\n    }],\n    title: "U.S. Census Data",\n    titleAlignment: "center",\n    width: 500,\n    height: 400,\n    marginLeft: 30,\n    toolTipFormat: "0.0f",\n    radiusInner: 0.67,\n    radiusOuter: 1\n  }\n}',...Donut.parameters?.docs?.source}}},Pie.parameters={...Pie.parameters,docs:{...Pie.parameters?.docs,source:{originalSource:'{\n  args: {\n    data: [{\n      "name": "<5",\n      "value": 19912018\n    }, {\n      "name": "5-9",\n      "value": 20501982\n    }, {\n      "name": "10-14",\n      "value": 20679786\n    }, {\n      "name": "15-19",\n      "value": 21354481\n    }, {\n      "name": "20-24",\n      "value": 22604232\n    }, {\n      "name": "25-29",\n      "value": 21698010\n    }, {\n      "name": "30-34",\n      "value": 21183639\n    }, {\n      "name": "35-39",\n      "value": 19855782\n    }, {\n      "name": "40-44",\n      "value": 20796128\n    }, {\n      "name": "45-49",\n      "value": 21370368\n    }, {\n      "name": "50-54",\n      "value": 22525490\n    }, {\n      "name": "55-59",\n      "value": 21001947\n    }, {\n      "name": "60-64",\n      "value": 18415681\n    }, {\n      "name": "65-69",\n      "value": 14547446\n    }, {\n      "name": "70-74",\n      "value": 10587721\n    }, {\n      "name": "75-79",\n      "value": 7730129\n    }, {\n      "name": "80-84",\n      "value": 5811429\n    }, {\n      "name": "\\u226585",\n      "value": 5938752\n    }],\n    title: "U.S. Census Data",\n    titleAlignment: "center",\n    width: 500,\n    height: 400,\n    marginLeft: 30,\n    toolTipFormat: "0.0f",\n    radiusInner: 0,\n    radiusOuter: 1\n  }\n}',...Pie.parameters?.docs?.source}}};const __namedExportsOrder=["Donut","Pie"]},"./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[7].use[1]!./src/components/PieChart/PieChart.css":(module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{c:()=>__WEBPACK_DEFAULT_EXPORT__});var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/css-loader/dist/runtime/sourceMaps.js"),_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__),_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js"),___CSS_LOADER_EXPORT___=__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__)()(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default());___CSS_LOADER_EXPORT___.push([module.id,".piechart-container {\n    width:100%;\n}\n\n.piechart-container h3 {\n    margin: 0;\n}\n\n.piechart-container .tooltip {\n    visibility: hidden;\n    position: absolute;\n    background-color: white;\n    border: 1px solid;\n    padding: 15px;\n    margin: 0.5em;\n    display: none;\n}\n\n.piechart-container .tooltip .name {\n    display: inline-block; \n}\n\n.piechart-container .tooltip .swatch {\n    display: inline-block;\n}\n\n.piechart-container .tooltip .value {\n    display: inline-block;\n}\n\n.piechart-container .legend {\n    display: flex;\n    flex-wrap: wrap;\n    align-items: center;\n    justify-content: center;\n    margin: 0.5em;\n}\n\n.piechart-container .legend .legend-element {\n    display: inherit;\n    cursor: pointer;    \n    margin: 0 1em 0 0;    \n}\n\n.piechart-container .legend button {\n    background: none;\n\tcolor: inherit;\n\tborder: none;\n\tpadding: 0;\n\tfont: inherit;\n\tcursor: pointer;\n    outline: inherit;\n}\n\n.piechart-container .swatch {\n    width: 15px;\n    height: 15px;\n    margin: 0 0.5em 0 0;\n}","",{version:3,sources:["webpack://./src/components/PieChart/PieChart.css"],names:[],mappings:"AAAA;IACI,UAAU;AACd;;AAEA;IACI,SAAS;AACb;;AAEA;IACI,kBAAkB;IAClB,kBAAkB;IAClB,uBAAuB;IACvB,iBAAiB;IACjB,aAAa;IACb,aAAa;IACb,aAAa;AACjB;;AAEA;IACI,qBAAqB;AACzB;;AAEA;IACI,qBAAqB;AACzB;;AAEA;IACI,qBAAqB;AACzB;;AAEA;IACI,aAAa;IACb,eAAe;IACf,mBAAmB;IACnB,uBAAuB;IACvB,aAAa;AACjB;;AAEA;IACI,gBAAgB;IAChB,eAAe;IACf,iBAAiB;AACrB;;AAEA;IACI,gBAAgB;CACnB,cAAc;CACd,YAAY;CACZ,UAAU;CACV,aAAa;CACb,eAAe;IACZ,gBAAgB;AACpB;;AAEA;IACI,WAAW;IACX,YAAY;IACZ,mBAAmB;AACvB",sourcesContent:[".piechart-container {\n    width:100%;\n}\n\n.piechart-container h3 {\n    margin: 0;\n}\n\n.piechart-container .tooltip {\n    visibility: hidden;\n    position: absolute;\n    background-color: white;\n    border: 1px solid;\n    padding: 15px;\n    margin: 0.5em;\n    display: none;\n}\n\n.piechart-container .tooltip .name {\n    display: inline-block; \n}\n\n.piechart-container .tooltip .swatch {\n    display: inline-block;\n}\n\n.piechart-container .tooltip .value {\n    display: inline-block;\n}\n\n.piechart-container .legend {\n    display: flex;\n    flex-wrap: wrap;\n    align-items: center;\n    justify-content: center;\n    margin: 0.5em;\n}\n\n.piechart-container .legend .legend-element {\n    display: inherit;\n    cursor: pointer;    \n    margin: 0 1em 0 0;    \n}\n\n.piechart-container .legend button {\n    background: none;\n\tcolor: inherit;\n\tborder: none;\n\tpadding: 0;\n\tfont: inherit;\n\tcursor: pointer;\n    outline: inherit;\n}\n\n.piechart-container .swatch {\n    width: 15px;\n    height: 15px;\n    margin: 0 0.5em 0 0;\n}"],sourceRoot:""}]);const __WEBPACK_DEFAULT_EXPORT__=___CSS_LOADER_EXPORT___}}]);