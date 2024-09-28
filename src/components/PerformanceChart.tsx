import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const PerformanceChart = () => {
  // Mock data for the last 12 months
  const labels = [
    'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
    'Jan', 'Feb', 'Mar', 'Apr', 'May'
  ];
  const cashFlowData = [
    5000, 5200, 4800, 5100, 5300, 5400, 5600,
    5200, 5400, 5700, 5900, 6100
  ];

  const data = {
    labels,
    datasets: [
      {
        label: 'Cash Flow',
        data: cashFlowData,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Cash Flow - Last 12 Months',
      },
    },
  };

  return <Line options={options} data={data} />;
};

export default PerformanceChart;