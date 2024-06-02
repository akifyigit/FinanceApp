import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

Chart.register(ArcElement, Tooltip, Legend);

interface PieChartProps {
  labels: string[];
  data: number[];
}

const PieChart: React.FC<PieChartProps> = ({ labels, data }) => {
  const chartData = {
    labels,
    datasets: [
      {
        data,
        backgroundColor: ["#FF6384", "#36A2EB"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB"],
      },
    ],
  };

  return (
    <div className="w-fit  h-fit m-8">
      <Pie data={chartData} />
    </div>
  );
};

export default PieChart;
