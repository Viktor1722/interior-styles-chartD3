import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { SearchVolumeData } from "../data/roomData";

interface SearchVolumeChartProps {
  data: SearchVolumeData[];
}

const SearchVolumeChart: React.FC<SearchVolumeChartProps> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    // Clear previous chart
    d3.select(svgRef.current).selectAll("*").remove();

    // Set up dimensions
    const margin = { top: 30, right: 30, bottom: 70, left: 80 };
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    // Create SVG
    const svg = d3
      .select(svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Create scales
    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.style))
      .range([0, width])
      .padding(0.2);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.searches) || 0])
      .range([height, 0]);

    // Add axes
    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "rotate(-45)")
      .style("text-anchor", "end");

    svg
      .append("g")
      .call(d3.axisLeft(y).tickFormat((d) => d3.format(",")(d as number)));

    // Add Y axis label
    svg
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -60)
      .attr("x", -(height / 2))
      .attr("text-anchor", "middle")
      .text("Monthly Google Searches");

    // Add bars
    svg
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d) => x(d.style) || 0)
      .attr("y", (d) => y(d.searches))
      .attr("width", x.bandwidth())
      .attr("height", (d) => height - y(d.searches))
      .attr("fill", "#69b3a2")
      .on("mouseover", function (event, d) {
        d3.select(this).attr("fill", "#2e8b57");

        // Show tooltip
        const tooltip = d3
          .select("body")
          .append("div")
          .attr("class", "tooltip")
          .style("position", "absolute")
          .style("background-color", "white")
          .style("padding", "10px")
          .style("border", "1px solid #ddd")
          .style("border-radius", "5px")
          .style("pointer-events", "none");

        tooltip
          .html(
            `
          <strong>${d.style}</strong><br/>
          Searches: ${d3.format(",")(d.searches)}<br/>
          Ranking: ${d.ranking}
        `
          )
          .style("left", event.pageX + 10 + "px")
          .style("top", event.pageY - 10 + "px");
      })
      .on("mouseout", function () {
        d3.select(this).attr("fill", "#69b3a2");
        d3.selectAll(".tooltip").remove();
      });

    // Add title
    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", -margin.top / 2)
      .attr("text-anchor", "middle")
      .style("font-size", "20px")
      .style("font-weight", "bold")
      .text("EU Interior Design Style Search Volume for 2023");
  }, [data]);

  return (
    <div>
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default SearchVolumeChart;
