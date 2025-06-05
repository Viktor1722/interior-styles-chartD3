import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

interface ColorPalette {
  name: string;
  hex: string;
}

interface InteriorStyle {
  style: string;

  ranking: string;
  description: string;
  color_palette: ColorPalette[];
}

interface ColorPaletteChartProps {
  data: InteriorStyle[];
}

const ColorPaletteChart: React.FC<ColorPaletteChartProps> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!svgRef.current || !data.length) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = 1000;
    const height = 800;
    const centerX = width / 2;
    const centerY = height / 2;
    const outerRadius = Math.min(width, height) / 2 - 50;
    const innerRadius = outerRadius * 0.3;

    svg.attr("width", width).attr("height", height);

    const container = svg
      .append("g")
      .attr("transform", `translate(${centerX}, ${centerY})`);

    // Calculate angles for each style
    const angleScale = d3
      .scaleLinear()
      .domain([0, data.length])
      .range([0, 2 * Math.PI]);

    // Create tooltip
    const tooltip = d3.select(tooltipRef.current);

    // Draw each style section
    data.forEach((style, styleIndex) => {
      const startAngle = angleScale(styleIndex);
      const endAngle = angleScale(styleIndex + 1);
      const sectionAngle = endAngle - startAngle;

      const styleGroup = container
        .append("g")
        .attr("class", `style-group style-${styleIndex}`);

      // Calculate radius for each color in the palette
      const colorCount = style.color_palette.length;
      const radiusStep = (outerRadius - innerRadius) / colorCount;

      // Draw color rings
      style.color_palette.forEach((color, colorIndex) => {
        const colorInnerRadius = innerRadius + colorIndex * radiusStep;
        const colorOuterRadius = innerRadius + (colorIndex + 1) * radiusStep;

        const arc = d3
          .arc<any>()
          .innerRadius(colorInnerRadius)
          .outerRadius(colorOuterRadius)
          .startAngle(startAngle)
          .endAngle(endAngle);

        const arcData = {
          innerRadius: colorInnerRadius,
          outerRadius: colorOuterRadius,
          startAngle: startAngle,
          endAngle: endAngle,
        };

        styleGroup
          .append("path")
          .attr("d", arc(arcData) || "")
          .attr("fill", color.hex)
          .attr("stroke", "#fff")
          .attr("stroke-width", 1)
          .style("cursor", "pointer")
          .on("mouseover", function (event) {
            d3.select(this)
              .transition()
              .duration(200)
              .attr("stroke-width", 3)
              .attr("stroke", "#333");

            const containerRect = svgRef.current?.getBoundingClientRect();
            const tooltipX = event.clientX - (containerRect?.left || 0) + 10;
            const tooltipY = event.clientY - (containerRect?.top || 0) - 10;

            tooltip
              .style("opacity", 1)
              .style("left", tooltipX + "px")
              .style("top", tooltipY + "px").html(`
                <div style="font-weight: bold; margin-bottom: 5px;">${style.style}</div>
                <div style="color: ${color.hex}; font-weight: bold;">${color.name}</div>
                <div style="font-size: 12px; margin-top: 3px;">${color.hex}</div>
              `);
          })
          .on("mouseout", function () {
            d3.select(this)
              .transition()
              .duration(200)
              .attr("stroke-width", 1)
              .attr("stroke", "#fff");

            tooltip.style("opacity", 0);
          });
      });

      // Add style labels
      const labelAngle = (startAngle + endAngle) / 2;
      const labelRadius = outerRadius + 20;
      const labelX = Math.cos(labelAngle - Math.PI / 2) * labelRadius;
      const labelY = Math.sin(labelAngle - Math.PI / 2) * labelRadius;

      const textAnchor = labelAngle > Math.PI ? "end" : "start";
      const textRotation =
        labelAngle > Math.PI
          ? (labelAngle * 180) / Math.PI - 90 + 180
          : (labelAngle * 180) / Math.PI - 90;

      styleGroup
        .append("text")
        .attr("x", labelX)
        .attr("y", labelY)
        .attr("text-anchor", textAnchor)
        .attr("dominant-baseline", "middle")
        .attr("transform", `rotate(${textRotation}, ${labelX}, ${labelY})`)
        .style("font-size", "14px")
        .style("font-weight", "bold")
        .style("fill", "#333")
        .text(style.style);

      // Add search volume as smaller text
      const searchLabelRadius = outerRadius + 35;
      const searchLabelX =
        Math.cos(labelAngle - Math.PI / 2) * searchLabelRadius;
      const searchLabelY =
        Math.sin(labelAngle - Math.PI / 2) * searchLabelRadius;

      styleGroup
        .append("text")
        .attr("x", searchLabelX)
        .attr("y", searchLabelY)
        .attr("text-anchor", textAnchor)
        .attr("dominant-baseline", "middle")
        .attr(
          "transform",
          `rotate(${textRotation}, ${searchLabelX}, ${searchLabelY})`
        )
        .style("font-size", "10px")
        .style("fill", "#666");
    });

    // Add center title
    container
      .append("text")
      .attr("x", 0)
      .attr("y", -10)
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")
      .style("font-size", "18px")
      .style("font-weight", "bold")
      .style("fill", "#333")
      .text("Interior Style");

    container
      .append("text")
      .attr("x", 0)
      .attr("y", 10)
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")
      .style("font-size", "16px")
      .style("fill", "#666")
      .text("Color Palettes");

    // Add legend
    const legend = svg.append("g").attr("transform", `translate(20, 20)`);

    legend
      .append("text")
      .attr("x", 0)
      .attr("y", 0)
      .style("font-size", "14px")
      .style("font-weight", "bold")
      .style("fill", "#333")
      .text("How to read:");

    legend
      .append("text")
      .attr("x", 0)
      .attr("y", 20)
      .style("font-size", "12px")
      .style("fill", "#666")
      .text("• Each section represents an interior style");

    legend
      .append("text")
      .attr("x", 0)
      .attr("y", 35)
      .style("font-size", "12px")
      .style("fill", "#666")
      .text("• Color rings show the style's palette");
  }, [data]);

  return (
    <div
      style={{
        width: "100%",
        position: "relative",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <svg ref={svgRef}></svg>
      <div
        ref={tooltipRef}
        style={{
          position: "absolute",
          background: "#2a2a2a",
          color: "white",
          border: "1px solid #555",
          borderRadius: "8px",
          padding: "10px",
          fontSize: "13px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
          opacity: 0,
          pointerEvents: "none",
          zIndex: 1000,
          maxWidth: "200px",
        }}
      />
    </div>
  );
};

export default ColorPaletteChart;
