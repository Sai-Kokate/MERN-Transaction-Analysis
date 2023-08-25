import axios from "axios";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { monthsArray } from "../utils/months";
// Import everything from the chart.js/auto module
import ChartJS from "chart.js/auto";

const BarGraph = ({ month }) => {
  // Ref for the chart instance
  // const chartRef = useRef(null);
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [barChartData, setBarChartData] = useState([]);

  useEffect(() => {
    fetchData();
  }, [month]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/create-bargraph?selectedMonth=${month}`
      );
      console.log(response.data.priceRanges);

      setBarChartData(response.data.priceRanges);
    } catch (error) {
      console.error("Error fetching bar chart data:", error);
    }
  };

  const priceRanges = barChartData.map((item) => item.range);
  const counts = barChartData.map((item) => item.count);

  const chartData = {
    labels: priceRanges,
    datasets: [
      {
        label: "Number of Items",
        data: counts,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  // Function to destroy the previous chart instance before creating a new one
  // const destroyChart = () => {
  //   if (chartRef.current) {
  //     chartRef.current.destroy();
  //   }
  // };
  return (
    <div className="mt-4 w-10/12 h-full mx-auto flex flex-col gap-4 items-center p-4">
      <h2 className="font-bold text-2xl">
        Bar Chart for Selected Month: {monthsArray[month - 1].name}
      </h2>
      {/* Call the destroyChart function before rendering the new chart */}
      {/* {destroyChart()} */}
      <Bar data={chartData} />
    </div>
  );
};

export default BarGraph;
