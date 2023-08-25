const mongoose = require("mongoose");
const Transaction = require("../models/Transaction");

const calculateStatistics = async (req, res) => {
  try {
    const selectedMonth = parseInt(req.query.selectedMonth);

    const transactions = await Transaction.find({
      $expr: {
        $eq: [{ $month: { $toDate: "$dateOfSale" } }, selectedMonth],
      },
    });

    // Calculate total sale amount, total number of sold items, and total number of not sold items
    let totalSaleAmount = 0;
    let totalSoldItems = 0;
    let totalNotSoldItems = 0;

    transactions.forEach((transaction) => {
      totalSaleAmount += transaction.sold ? transaction.price : 0;
      totalSoldItems += transaction.sold ? 1 : 0;
      totalNotSoldItems += transaction.sold ? 0 : 1;
    });

    return res.status(200).json({
      success: true,
      message: "Statistics Calculated Sucessfully",
      totalSaleAmount,
      totalSoldItems,
      totalNotSoldItems,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error in Calculating Statstics. Please try again",
    });
  }
};

const createBarGraph = async (req, res) => {
  try {
    const selectedMonth = parseInt(req.query.selectedMonth);

    const transactions = await Transaction.find({
      $expr: {
        $eq: [{ $month: { $toDate: "$dateOfSale" } }, selectedMonth],
      },
    });

    const priceRanges = [
      { range: "0 - 100", count: 0 },
      { range: "101 - 200", count: 0 },
      { range: "201 - 300", count: 0 },
      { range: "301 - 400", count: 0 },
      { range: "401 - 500", count: 0 },
      { range: "501 - 600", count: 0 },
      { range: "601 - 700", count: 0 },
      { range: "701 - 800", count: 0 },
      { range: "801 - 900", count: 0 },
      { range: "901 above", count: 0 },
    ];

    // Calculate price range and number of items in each range for the selected month
    transactions.forEach((transaction) => {
      const price = transaction.price;
      if (price <= 100) priceRanges[0].count++;
      else if (price <= 200) priceRanges[1].count++;
      else if (price <= 300) priceRanges[2].count++;
      else if (price <= 400) priceRanges[3].count++;
      else if (price <= 500) priceRanges[4].count++;
      else if (price <= 600) priceRanges[5].count++;
      else if (price <= 700) priceRanges[6].count++;
      else if (price <= 800) priceRanges[7].count++;
      else if (price <= 900) priceRanges[8].count++;
      else priceRanges[9].count++;
    });

    return res.status(200).json({
      success: true,
      message: "Bar Graph Statistics Calculated Sucessfully",
      priceRanges,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error in Calculating Bar Graph Statistics. Please try again",
    });
  }
};

const createPieChart = async (req, res) => {
  try {
    const selectedMonth = parseInt(req.query.selectedMonth);

    const transactions = await Transaction.find({
      $expr: {
        $eq: [{ $month: { $toDate: "$dateOfSale" } }, selectedMonth],
      },
    });

    const categoryCounts = {};

    // Calculate unique categories and number of items in each category for the selected month
    transactions.forEach((transaction) => {
      const category = transaction.category;
      if (category in categoryCounts) {
        categoryCounts[category]++;
      } else {
        categoryCounts[category] = 1;
      }
    });

    return res.json({
      success: true,
      message: "Pie Chart Statistics Calculated Sucessfully",
      categoryCounts,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error in Calculating Pie Chart Statistics. Please try again",
    });
  }
};

module.exports = {
  calculateStatistics,
  createBarGraph,
  createPieChart,
};
