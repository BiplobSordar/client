import React, { useEffect, useRef } from "react";
import { Chart } from "chart.js";

const SellCourseChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    const sellCourseChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
          {
            label: "Sell Progress",
            data: [120, 150, 170, 200, 180, 210],
            backgroundColor: "rgba(59, 130, 246, 0.5)", // Blue color
            borderColor: "rgba(59, 130, 246, 1)",
            borderWidth: 1,
          },
          {
            label: "Course Response",
            data: [80, 100, 120, 140, 130, 160],
            type: "line",
            borderColor: "rgba(234, 88, 12, 1)", // Orange color
            borderWidth: 2,
            tension: 0.4, // Smooth curve
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
            labels: {
              font: {
                size: 14,
              },
              color: "#374151", // Gray color
            },
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                const value = context.raw;
                return `${context.dataset.label}: ₹${value}`;
              },
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: "#374151", // Gray color
            },
            grid: {
              display: false,
            },
          },
          y: {
            ticks: {
              color: "#374151", // Gray color
            },
            grid: {
              color: "rgba(229, 231, 235, 0.5)", // Light gray grid lines
            },
          },
        },
      },
    });

    // Cleanup to destroy the chart when the component unmounts
    return () => {
      sellCourseChart.destroy();
    };
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">
        Sell Progress & Course Response
      </h2>
      {/* Chart Container */}
      <div className="relative h-72">
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
};

export default SellCourseChart;
