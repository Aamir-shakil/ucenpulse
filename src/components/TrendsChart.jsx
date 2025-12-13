import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function TrendsChart({ title, labels, data, type, yLabel }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Destroy old chart if it exists
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const ctx = canvasRef.current.getContext("2d");

    // High-contrast colours for accessibility
    const colors = {
      line: {
        border: "#0057ff", // Bright royal blue
        background: "rgba(0, 87, 255, 0.25)",
      },
      bar: {
        background: "rgba(0, 180, 0, 0.7)", // High-contrast green
        border: "#006600",
      },
    };

    chartRef.current = new Chart(ctx, {
      type,
      data: {
        labels,
        datasets: [
          {
            label: title,
            data,
            borderColor: colors[type].border,
            backgroundColor: colors[type].background,
            borderWidth: 2,
            tension: 0.25,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
       

        plugins: {
          title: {
            display: true,
            text: title,
            color: "#000",
            font: { size: 16, weight: "bold" },
          },
          legend: {
            labels: {
              color: "#000",
              font: { size: 12 },
            },
          },
          tooltip: {
            callbacks: {
              label: (context) => `${context.raw} ${yLabel}`,
            },
          },
        },

        scales: {
          x: {
            ticks: { color: "#000", maxRotation: 45, minRotation: 45 },
            grid: { color: "rgba(0,0,0,0.1)" },
          },
          y: {
            title: {
              display: true,
              text: yLabel,
              color: "#000",
              font: { size: 14 },
            },
            ticks: { color: "#000" },
            grid: { color: "rgba(0,0,0,0.1)" },
          },
        },
      },
    });

    return () => {
      if (chartRef.current) chartRef.current.destroy();
    };
  }, [labels, data, title, type, yLabel]);

  return (
    <div className="chart-container">
      <canvas ref={canvasRef} aria-label={title} role="img"></canvas>
    </div>
  );
}
