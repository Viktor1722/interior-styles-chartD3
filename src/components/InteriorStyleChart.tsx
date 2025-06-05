import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

interface ColorPalette {
  name: string;
  hex: string;
}

interface InteriorStyleColor {
  style: string;
  ranking: string;
  description: string;
  color_palette: ColorPalette[];
}

interface InteriorStyleMaterial {
  style: string;
  ranking: string;
  description: string;
  materials: string[];
}

interface InteriorStyleChartProps {
  colorData: InteriorStyleColor[];
  materialData: InteriorStyleMaterial[];
}

const InteriorStyleChart: React.FC<InteriorStyleChartProps> = ({
  colorData,
  materialData,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [showColors, setShowColors] = useState(true);

  // Material color mapping for consistent visual representation
  const materialColors: { [key: string]: string } = {
    "Distressed wood": "#8B4513",
    Leather: "#654321",
    Linen: "#F5F5DC",
    Cotton: "#FFFAF0",
    "Cast iron": "#2F4F4F",
    Velvet: "#663399",
    Rattan: "#D2691E",
    "Exposed brick": "#B22222",
    Concrete: "#808080",
    Steel: "#C0C0C0",
    "Reclaimed wood": "#696969",
    "Galvanized metal": "#A9A9A9",
    Iron: "#36454F",
    Glass: "#E6F3FF",
    Chrome: "#C0C0C0",
    "Stainless steel": "#B8B8B8",
    "Polished wood": "#DEB887",
    Marble: "#F8F8FF",
    "Porcelain tiles": "#FFFACD",
    "Light-colored wood": "#F5DEB3",
    Wool: "#F0F0F0",
    Stone: "#708090",
    "Metal accents": "#B0C4DE",
    Brick: "#DC143C",
    Jute: "#D2B48C",
    Terracotta: "#E2725B",
    Wicker: "#D2691E",
    Driftwood: "#A79B8E",
    Seagrass: "#9ACD32",
  };

  useEffect(() => {
    if (!svgRef.current) return;

    const data = showColors ? colorData : materialData;
    if (!data.length) return;

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

      const styleGroup = container
        .append("g")
        .attr("class", `style-group style-${styleIndex}`);

      if (showColors) {
        // Draw color rings
        const colorStyle = style as InteriorStyleColor;
        const colorCount = colorStyle.color_palette.length;
        const radiusStep = (outerRadius - innerRadius) / colorCount;

        colorStyle.color_palette.forEach((color, colorIndex) => {
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
      } else {
        // Draw material rings
        const materialStyle = style as InteriorStyleMaterial;
        const materialCount = materialStyle.materials.length;
        const radiusStep = (outerRadius - innerRadius) / materialCount;

        materialStyle.materials.forEach((material, materialIndex) => {
          const materialInnerRadius = innerRadius + materialIndex * radiusStep;
          const materialOuterRadius =
            innerRadius + (materialIndex + 1) * radiusStep;

          const arc = d3
            .arc<any>()
            .innerRadius(materialInnerRadius)
            .outerRadius(materialOuterRadius)
            .startAngle(startAngle)
            .endAngle(endAngle);

          const arcData = {
            innerRadius: materialInnerRadius,
            outerRadius: materialOuterRadius,
            startAngle: startAngle,
            endAngle: endAngle,
          };

          const materialColor = materialColors[material] || "#8B8B8B";

          styleGroup
            .append("path")
            .attr("d", arc(arcData) || "")
            .attr("fill", materialColor)
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
                  <div style="font-weight: bold;">${material}</div>
                  <div style="font-size: 11px; margin-top: 5px; color: #ccc;">
                    ${materialStyle.ranking}
                  </div>
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
      }

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
      .text(showColors ? "Color Palettes" : "Materials");

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
      .text(
        `• Rings show the style's ${showColors ? "color palette" : "materials"}`
      );
  }, [colorData, materialData, showColors]);

  return (
    <div style={{ width: "100%" }}>
      {/* Toggle Switch */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "20px",
          gap: "15px",
        }}
      >
        <span
          style={{
            fontSize: "14px",
            fontWeight: showColors ? "bold" : "normal",
            color: showColors ? "#333" : "#666",
          }}
        >
          Colors
        </span>
        <div
          onClick={() => setShowColors(!showColors)}
          style={{
            width: "60px",
            height: "30px",
            backgroundColor: showColors ? "#69b3a2" : "#ccc",
            borderRadius: "15px",
            cursor: "pointer",
            position: "relative",
            transition: "background-color 0.3s ease",
            border: "2px solid #fff",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <div
            style={{
              width: "22px",
              height: "22px",
              backgroundColor: "white",
              borderRadius: "50%",
              position: "absolute",
              top: "2px",
              left: showColors ? "2px" : "34px",
              transition: "left 0.3s ease",
              boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
            }}
          />
        </div>
        <span
          style={{
            fontSize: "14px",
            fontWeight: !showColors ? "bold" : "normal",
            color: !showColors ? "#333" : "#666",
          }}
        >
          Materials
        </span>
      </div>

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
    </div>
  );
};

export default InteriorStyleChart;
