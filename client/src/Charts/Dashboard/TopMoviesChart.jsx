import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const TopMoviesChart = () => {
  const data = {
    labels: ["Joker 2", "Inception", "Oppenheimer", "Batman", "Avatar 2"],
    datasets: [
      {
        label: "Tickets Sold",
        data: [420, 380, 350, 300, 260],
        backgroundColor: [
          "#6366F1",
          "#10B981",
          "#F59E0B",
          "#3B82F6",
          "#EF4444",
        ],
        borderRadius: 6,
      },
    ],
  };

  const options = {
    indexAxis: "y",
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
    scales: {
      x: { grid: { color: "rgba(229,231,235,0.4)" } },
      y: { grid: { display: false } },
    },
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-5 w-full  border-gray-200 m-2">
      <h2 className="text-lg font-semibold text-gray-800 mb-2">
        Top Performing Movies
      </h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default TopMoviesChart;
