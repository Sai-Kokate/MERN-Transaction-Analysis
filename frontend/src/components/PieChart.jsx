import React, { useState, useEffect } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import randomColor from "randomcolor";
import { monthsArray } from "../utils/months";
import Loader from "./Loader";

const PieChart = ({ month }) => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [pieChartData, setPieChartData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, [month]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${BASE_URL}/create-piechart?selectedMonth=${month}`
      );
      console.log(response.data.categoryCounts);

      setPieChartData(response.data.categoryCounts);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching pie chart data:", error);
    }
  };

  const labels = Object.keys(pieChartData);
  const data = Object.values(pieChartData);

  // Generate random colors for each category
  const colors = randomColor({ count: labels.length });
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Category Distribution",
        data: data,
        backgroundColor: colors,
      },
    ],
  };
  return (
    <div className="mt-4 w-10/12 h-full mx-auto flex flex-col gap-4 items-center p-4">
      <h2 className="font-bold text-3xl text-indigo-800">
        Pie Chart for Selected Month: {monthsArray[month - 1].name}
      </h2>
      {loading && <Loader />}
      {!loading && <Pie data={chartData} />}
    </div>
  );
};

export default PieChart;
