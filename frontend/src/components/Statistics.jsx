import axios from "axios";
import React, { useEffect, useState } from "react";
import { monthsArray } from "../utils/months";
import Loader from "./Loader";

const Statistics = ({ month }) => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const [sale, setSale] = useState(0);
  const [soldItems, setSoldItems] = useState(0);
  const [notSoldItems, setNotSoldItems] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchStatistics = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${BASE_URL}/calculate-statistics?selectedMonth=${month}`
      );
      console.log(response);

      setSale(Number(response.data.totalSaleAmount).toFixed(2));
      setSoldItems(response.data.totalSoldItems);
      setNotSoldItems(response.data.totalNotSoldItems);
      setLoading(false);
      console.log(loading);
    } catch (error) {
      console.error("Error fetching Statistics:", error);
    }
  };

  useEffect(() => {
    fetchStatistics();
  }, [month]);

  return (
    <div className="w-1/3 flex justify-center ">
      {loading && <Loader />}
      {!loading && (
        <div className="w-full flex flex-col">
          <h2 className="font-bold text-3xl mx-auto mb-4 text-indigo-800">
            Statistics - {monthsArray[month - 1].name}
          </h2>
          <div className="flex flex-col gap-3 font-semibold text-xl">
            <div className="flex justify-between">
              <span>Total Sale</span>
              <span>{sale}</span>
            </div>
            <div className="flex justify-between">
              <span>Total Items Sold</span>
              <span>{soldItems}</span>
            </div>
            <div className="flex justify-between">
              <span>Total Not Sold Items</span>
              <span>{notSoldItems}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Statistics;
