import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const BookingsTrendChart = () => {
  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Bookings",
        data: [45, 52, 38, 60, 80, 105, 92],
        fill: true,
        backgroundColor: "rgba(59, 130, 246, 0.1)", // Light blue area
        borderColor: "#3B82F6", // Blue line
        borderWidth: 2,
        tension: 0.4,
        pointBackgroundColor: "#3B82F6",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { mode: "index", intersect: false },
    },
    scales: {
      x: { grid: { display: false } },
      y: {
        beginAtZero: true,
        ticks: { stepSize: 20 },
        grid: { color: "rgba(229,231,235,0.4)" },
      },
    },
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-5 w-full  border-gray-200 m-2">
      <h2 className="text-lg font-semibold text-gray-800 mb-2">
        Weekly Bookings Trend
      </h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default BookingsTrendChart;
