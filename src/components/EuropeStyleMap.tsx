import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { CountryStyleData } from "../data/roomData";
import { fetchEuropeGeoData } from "../data/europeGeoData";

interface EuropeStyleMapProps {
  data: CountryStyleData[];
}

const EuropeStyleMap: React.FC<EuropeStyleMapProps> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [geoData, setGeoData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchEuropeGeoData()
      .then((data) => setGeoData(data))
      .catch((err) => setError("Failed to load map data"));
  }, []);

  useEffect(() => {
    if (!svgRef.current || !geoData) return;

    // Clear previous content
    d3.select(svgRef.current).selectAll("*").remove();

    // Set up dimensions
    const width = 800;
    const height = 600;

    // Create SVG
    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    // Create projection
    const projection = d3
      .geoMercator()
      .center([15, 54])
      .scale(500)
      .translate([width / 2, height / 2]);

    // Create path generator
    const path = d3.geoPath().projection(projection);

    // Create color scale
    const uniqueStyles = Array.from(new Set(data.map((d) => d.style)));
    const colorScale = d3
      .scaleOrdinal<string>()
      .domain(uniqueStyles)
      .range(d3.schemeSet3);

    // Create tooltip
    const tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0)
      .style("position", "absolute")
      .style("background-color", "white")
      .style("padding", "10px")
      .style("border", "1px solid #ddd")
      .style("border-radius", "5px");

    // Draw map
    const mapGroup = svg.append("g");

    mapGroup
      .selectAll("path")
      .data(geoData.features)
      .enter()
      .append("path")
      .attr("d", path as any)
      .attr("fill", (d: any) => {
        const countryData = data.find(
          (item) =>
            item.country === d.properties.NAME ||
            (item.country === "United Kingdom" &&
              d.properties.NAME ===
                "United Kingdom of Great Britain and Northern Ireland")
        );
        return countryData ? colorScale(countryData.style) : "#ccc";
      })
      .attr("stroke", "#fff")
      .attr("stroke-width", 0.5)
      .on("mouseover", (event: MouseEvent, d: any) => {
        const countryData = data.find(
          (item) =>
            item.country === d.properties.NAME ||
            (item.country === "United Kingdom" &&
              d.properties.NAME ===
                "United Kingdom of Great Britain and Northern Ireland")
        );

        if (countryData) {
          tooltip
            .style("opacity", 1)
            .html(
              `
              <strong>${countryData.country}</strong><br/>
              Style: ${countryData.style}
            `
            )
            .style("left", event.pageX + 10 + "px")
            .style("top", event.pageY - 10 + "px");
        }
      })
      .on("mouseout", () => {
        tooltip.style("opacity", 0);
      });

    // Add legend
    const legend = svg
      .append("g")
      .attr("transform", `translate(${width - 150}, 20)`);

    legend
      .selectAll("rect")
      .data(uniqueStyles)
      .enter()
      .append("rect")
      .attr("x", 0)
      .attr("y", (d, i) => i * 20)
      .attr("width", 15)
      .attr("height", 15)
      .attr("fill", (d) => colorScale(d));

    legend
      .selectAll("text")
      .data(uniqueStyles)
      .enter()
      .append("text")
      .attr("x", 20)
      .attr("y", (d, i) => i * 20 + 12)
      .text((d) => d)
      .style("font-size", "12px");

    // Add title
    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", 30)
      .attr("text-anchor", "middle")
      .style("font-size", "20px")
      .style("font-weight", "bold");
  }, [data, geoData]);

  if (error) {
    return <div>Error loading map: {error}</div>;
  }

  if (!geoData) {
    return <div>Loading map...</div>;
  }

  return (
    <div>
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default EuropeStyleMap;
