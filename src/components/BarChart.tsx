import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { RoomData } from "../data/roomData";

interface BarChartProps {
  data: RoomData[];
}

const BarChart: React.FC<BarChartProps> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    // Clear previous chart
    d3.select(svgRef.current).selectAll("*").remove();

    // Filter data based on selected room
    const filteredData = selectedRoom
      ? data.filter((d) => d.room === selectedRoom)
      : data;

    // Group data by style and count occurrences
    const styleCounts = d3.rollup(
      filteredData,
      (v) => v.length,
      (d) => d.style
    );

    const chartData = Array.from(styleCounts, ([style, count]) => ({
      style,
      count,
    }));

    // Set up dimensions
    const margin = { top: 20, right: 20, bottom: 60, left: 60 };
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
      .domain(chartData.map((d) => d.style))
      .range([0, width])
      .padding(0.1);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(chartData, (d) => d.count) || 0])
      .range([height, 0]);

    // Add axes
    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "rotate(-45)")
      .style("text-anchor", "end");

    svg.append("g").call(d3.axisLeft(y));

    // Add bars
    svg
      .selectAll("rect")
      .data(chartData)
      .enter()
      .append("rect")
      .attr("x", (d) => x(d.style) || 0)
      .attr("y", (d) => y(d.count))
      .attr("width", x.bandwidth())
      .attr("height", (d) => height - y(d.count))
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
          .style("padding", "5px")
          .style("border", "1px solid #ddd")
          .style("border-radius", "5px")
          .style("pointer-events", "none");

        tooltip
          .html(`Style: ${d.style}<br/>Count: ${d.count}`)
          .style("left", event.pageX + 10 + "px")
          .style("top", event.pageY - 10 + "px");
      })
      .on("mouseout", function () {
        d3.select(this).attr("fill", "#69b3a2");

        // Remove tooltip
        d3.selectAll(".tooltip").remove();
      });

    // Add title
    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", -margin.top / 2)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .text("Room Style Distribution");
  }, [data, selectedRoom]);

  // Get unique room types for filter
  const roomTypes = Array.from(new Set(data.map((d) => d.room)));

  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <label style={{ marginRight: "10px" }}>Filter by Room Type: </label>
        <select
          value={selectedRoom || ""}
          onChange={(e) => setSelectedRoom(e.target.value || null)}
          style={{ padding: "5px" }}
        >
          <option value="">All Rooms</option>
          {roomTypes.map((room) => (
            <option key={room} value={room}>
              {room}
            </option>
          ))}
        </select>
      </div>
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default BarChart;
