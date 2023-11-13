import React, { useRef, useEffect, useState} from "react";
import * as d3 from "d3";
import ControlBar from "./ControlBar";
import TableView from "./TableView";

const MainPlot = (props) => {
    const splotSvg = useRef(null);
	const [selectedData, setSelectedData] = useState([]);
	const [settings, setSettings] = useState({
		x: 'imdb_rating',
		y: 'us_gross',
		color: 'none',
		opacity: 'none',
		size: 'none'
	});

	console.log(settings.x);

	let data = props.data;
	data.forEach(d => {
			d[settings.x] = parseFloat(d[settings.x]);
			d[settings.y] = parseFloat(d[settings.y]);	
			d[settings.opacity] = parseFloat(d[settings.opacity]);
			d[settings.size] = parseFloat(d[settings.size]);
	});

	

    useEffect(() => {
		const xScale = d3.scaleLinear()
      		.domain(d3.extent(data, d => d[settings.x]))
      		.range([props.margin, props.width - props.margin]);
    	const yScale = d3.scaleLinear()
      		.domain(d3.extent(data, d => d[settings.y]))
      		.range([props.height - props.margin, props.margin]);

		const xAxis = d3.axisBottom(xScale);
		const yAxis = d3.axisLeft(yScale);

		const splot = d3.select(splotSvg.current);

		splot.select(".x-axis")
			.transition().duration(1000)
			.attr("transform", `translate(0,${props.height - props.margin})`)
			.call(xAxis);
		
		splot.select(".y-axis")
			.transition().duration(1000)
			.attr("transform", `translate(${props.margin},0)`)
			.call(yAxis);

		if(splot.selectAll(".x-axis").empty()) {
			splot.append("g")
				.attr("class", "x-axis")
				.attr("transform", `translate(0,${props.height - props.margin})`)
				.call(xAxis);
		}
		if(splot.selectAll(".y-axis").empty()) {
			splot.append("g")
				.attr("class", "y-axis")
				.attr("transform", `translate(${props.margin},0)`)
				.call(yAxis);
		}

		const colorScale = settings.color !== 'none' ? d3.scaleOrdinal(d3.schemeCategory10) : () => 'black'; 

		const opacityScale = settings.opacity !== 'none' ? d3.scaleLinear().domain(d3.extent(data, d => parseFloat(d[settings.opacity]))).range([0, 1]) : () => 1;

		const sizeScale = settings.size !== 'none' ? d3.scaleLinear().domain(d3.extent(data, d => parseFloat(d[settings.size]))).range([props.pointSize, props.maxPointSize]) : () => props.pointSize;

		const brush = d3.brush()
			.extent([[props.margin, props.margin], [props.width - props.margin, props.height - props.margin]])
			.on("end", brushed);

		const circles = splot.selectAll("circle").data(data);
		circles.enter()
			.append("circle")
			.merge(circles)
			.transition().duration(1000)
			.attr("cx", d => xScale(d[settings.x]))
			.attr("cy", d => yScale(d[settings.y]))
			.attr("r", d => sizeScale(d[settings.size]))
			.attr("fill", d => colorScale(d[settings.color]))
			.attr("opacity", d => opacityScale(d[settings.opacity])); 

    	// circles.exit().remove();

		splot.append("g")
			.attr("transform", `translate(${0}, ${0})`)
			.call(brush);

		function brushed(event) {
			const selection = event.selection;
			if (!selection) {
				setSelectedData([]);
				splot.selectAll("circle").style("stroke", null);
				return;
			}
			const [[x0, y0], [x1, y1]] = selection;
			const selected = data.filter(d => 
				x0 <= xScale(d[settings.x]) && xScale(d[settings.x]) <= x1 &&
				y0 <= yScale(d[settings.y]) && yScale(d[settings.y]) <= y1
			);
			setSelectedData(selected);

			splot.selectAll("circle").style("stroke", null);

			splot.selectAll("circle").filter(d => 
				x0 <= xScale(d[settings.x]) && xScale(d[settings.x]) <= x1 &&
				y0 <= yScale(d[settings.y]) && yScale(d[settings.y]) <= y1
			)
			.style("stroke", "black");
		}
	}, [data, settings, props.width, props.height, props.margin, props.pointSize, props.maxPointSize]);

	const handleSelectionChange = (channel, value) => {
		setSettings(prevSettings => ({ ...prevSettings, [channel]: value.value }));
	};

	return (
		<div>
		  <ControlBar attributes={props.attributes} onSelectionChange={handleSelectionChange} />
		  <div style={{ display: 'flex', alignItems: 'flex-start' }}>
			<svg ref={splotSvg} width={props.width} height={props.height}></svg>
			<TableView selectedData={selectedData} />
		  </div>
		</div>
	);
};

export default MainPlot;
