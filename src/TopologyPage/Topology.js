import React, { useEffect, useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import { ForceGraph2D } from "react-force-graph";
import endpoints from "../endpoints";

export default function Topology({ devices }) {
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });
  const [loading, setLoading] = useState(false);

  const checkConnectivity = async (devices) => {
    setLoading(true); // Start loading
    try {
      const response = await fetch(endpoints.checkConnectivity, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ devices }),
      });

      if (!response.ok) throw new Error("Network response was not ok.");

      const data = await response.json();
      console.log(data);
      processData(data); // Process and set graph data
    } catch (error) {
      console.error("An error occurred:", error.message);
    } finally {
      setLoading(false); // End loading
    }
  };

  const processData = (data) => {
    const nodes = new Set();
    const links = [];

    // Process data to fit graph format
    Object.entries(data).forEach(([source, targets]) => {
      if (!Array.from(nodes).some((node) => node.id === source)) {
        nodes.add({ id: source });
      }
      targets.forEach((target) => {
        if (!Array.from(nodes).some((node) => node.id === target)) {
          nodes.add({ id: target });
        }
        links.push({ source, target });
      });
    });

    setGraphData({
      nodes: Array.from(nodes),
      links: links,
    });
  };

  useEffect(() => {
    if (devices.length > 0) {
      checkConnectivity(devices);
    }
  }, [devices]);

  return (
    <Box
      sx={{
        width: "100%",
        height: "500px",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {loading ? (
        <CircularProgress />
      ) : (
        <ForceGraph2D
          graphData={graphData}
          nodeAutoColorBy="id"
          nodeCanvasObject={(node, ctx, globalScale) => {
            const label = node.id;
            const fontSize = 12 / globalScale;
            ctx.font = `${fontSize}px Sans-Serif`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";

            // Draw node as a circle with a border
            const size = 10; // Size of the circle
            ctx.beginPath();
            ctx.arc(node.x, node.y, size, 0, 2 * Math.PI, false);
            ctx.fillStyle = node.color || "rgba(0, 0, 0, 0.75)"; // Node fill color
            ctx.fill();
            ctx.lineWidth = 1; // Border width
            ctx.strokeStyle = "rgba(0, 0, 0, 0.25)"; // Border color
            ctx.stroke();

            // Draw text
            ctx.fillStyle = "#000000"; // Change label color to bright green
            ctx.fillText(label, node.x, node.y + size + 10);
          }}
        />
      )}
    </Box>
  );
}
