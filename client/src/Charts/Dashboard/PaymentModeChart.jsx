import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const PaymentModeChart = () => {
  // 🔹 Sample data (replace with real data from backend)
  const paymentData = {
    UPI: 11100,
    Card: 6000,
    Cash: 1350,
  };

  const labels = Object.keys(paymentData);
  const values = Object.values(paymentData);

  const data = {
    labels,
    datasets: [
      {
        label: "Payment Breakdown",
        data: values,
        backgroundColor: ["#10B981", "#3B82F6", "#F59E0B"], // Green, Blue, Amber
        borderColor: "#ffffff",
        borderWidth: 2,
        hoverOffset: 8,
      },
    ],
  };

  const options = {
    cutout: "70%",
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
            return `${context.label}: ₹${value.toLocaleString()} (${pct}%)`;
          },
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-2xl shadow-md flex flex-col w-full border-gray-200 m-2 justify-evenly border">
      <h2 className="text-lg font-semibold text-gray-800 mb-1 pl-4">
        Payment Mode Breakdown
      </h2>

      <div className="relative h-64 w-64 self-center">
        <Doughnut data={data} options={options} />
      </div>

      <div className="flex justify-center gap-6 mt-4 text-sm text-gray-700">
        {labels.map((label, i) => (
          <div key={label} className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-sm"
              style={{ backgroundColor: data.datasets[0].backgroundColor[i] }}
            ></span>
            <span>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentModeChart;
