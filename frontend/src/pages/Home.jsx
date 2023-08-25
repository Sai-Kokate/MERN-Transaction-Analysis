import React, { useState, useEffect } from "react";
import { monthsArray } from "../utils/months";
import TransactionTable from "../components/TransactionTable";
import PieChart from "../components/PieChart";
import BarGraph from "../components/BarGraph";
import Statistics from "../components/Statistics";
import axios from "axios";
import Loader from "../components/Loader";

function Home() {
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const [transactions, setTransactions] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("3"); // Default to March
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const perPage = 10; // Number of transactions per page

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${BASE_URL}/transactions?page=${currentPage}&per_page=${perPage}&search=${searchText}&selectedMonth=${selectedMonth}`
      );
      setTransactions(response.data.transactions);
      setTotalPages(Math.ceil(response.total_transactions / perPage));
      setLoading(false);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [currentPage, searchText, selectedMonth]);

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
    console.log("Selected month changed : ", event.target.value);
    setCurrentPage(1); // Reset page when month changes
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="flex flex-col w-screen h-screen overflow-x-hidden">
      <h1 className="text-4xl  text-center font-bold mt-4">
        Transaction Dashboard
      </h1>
      <div className="flex justify-between w-2/3 mx-auto text-2xl font-semibold mt-4">
        <input
          type="text"
          placeholder="Search transactions"
          value={searchText}
          onChange={handleSearchChange}
          className="border rounded-md text-center"
        />

        <select
          value={selectedMonth}
          onChange={handleMonthChange}
          className="border rounded-md text-center"
        >
          {/* Dropdown options for months */}
          {monthsArray.map((month) => {
            return (
              <option key={month.number} value={month.number}>
                {month.name}
              </option>
            );
          })}
        </select>
      </div>

      <div className="mt-4 w-11/12 mx-auto flex justify-center p-4">
        {loading && <Loader />}
        {!loading && <TransactionTable transactions={transactions} />}
      </div>

      {/* Page Buttons */}
      <div className="mt w-10/12 mx-auto flex justify-between ">
        <span className="text-lg font-semibold">Page No : {currentPage}</span>
        <div>
          <button
            onClick={handlePreviousPage}
            className="rounded-md border bg-gray-300 p-2"
          >
            Previous
          </button>
          <span> - </span>
          <button
            onClick={handleNextPage}
            className="rounded-md border bg-gray-300 p-2"
          >
            Next
          </button>
        </div>
        <span className="text-lg font-semibold">Per Page : {perPage}</span>
      </div>

      {/* Statistics */}
      <div className="mt-4 w-10/12 mx-auto flex flex-col gap-4 items-center p-4">
        <Statistics month={selectedMonth} />
      </div>

      {/* Transactions Bar Chart */}
      <div className="h-4/6 mb-4">
        <BarGraph month={selectedMonth} />
      </div>

      {/* Pie Chart */}
      <div className="h-4/5 my-12 pb-8">
        <PieChart month={selectedMonth} />
      </div>
    </div>
  );
}

export default Home;
