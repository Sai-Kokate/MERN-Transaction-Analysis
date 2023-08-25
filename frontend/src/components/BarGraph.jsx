import axios from "axios";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { monthsArray } from "../utils/months";
import ChartJS from "chart.js/auto";
import Loader from "./Loader";

const BarGraph = ({ month }) => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [barChartData, setBarChartData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, [month]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${BASE_URL}/create-bargraph?selectedMonth=${month}`
      );
      console.log(response.data.priceRanges);

      setBarChartData(response.data.priceRanges);
      setLoading(false);
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

  return (
    <>
      (
      <div className="mt-4 w-10/12 h-full mx-auto flex flex-col gap-4 items-center p-4">
        <h2 className="font-bold text-3xl text-indigo-800">
          Bar Chart for Selected Month: {monthsArray[month - 1].name}
        </h2>
        {loading && <Loader />}

        {!loading && <Bar data={chartData} className="text-black" />}
      </div>
      )
    </>
  );
};

export default BarGraph;
