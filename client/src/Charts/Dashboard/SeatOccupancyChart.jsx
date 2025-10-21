
import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const SeatOccupancyChart = () => {
  const data = {
    labels: ["Occupied Seats", "Available Seats"],
    datasets: [
      {
        data: [240, 60], // e.g. 80% occupancy
        backgroundColor: ["#10B981", "#E5E7EB"], // Green + Light gray
        borderWidth: 2,
        hoverOffset: 6,
      },
    ],
  };

  const options = {
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: function (context) {
            const total = context.chart.data.datasets[0].data.reduce(
              (a, b) => a + b,
              0
            );
            const value = context.raw;
            const pct = ((value / total) * 100).toFixed(1);
            return `${context.label}: ${pct}%`;
          },
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-5 flex flex-col border-gray-200 m-2 w-full">
      <h2 className=" text-left text-lg font-semibold text-gray-800 mb-1">
        Seat Occupancy
      </h2>
      
      <div className="relative h-64 w-64 self-center">
        <Pie data={data} options={options} />
      </div>

      <div className="flex justify-center gap-6 mt-4 text-sm text-gray-700">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-sm bg-green-500"></span> Occupied
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-sm bg-gray-300"></span> Available
        </div>
      </div>
    </div>
  );
};

export default SeatOccupancyChart;
