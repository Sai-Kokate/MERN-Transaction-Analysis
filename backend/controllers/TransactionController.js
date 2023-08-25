const mongoose = require("mongoose");
const Transaction = require("../models/Transaction");

exports.initializeDatabase = async (req, res) => {
  try {
    const fetchModule = await import("node-fetch");
    const fetch = fetchModule.default;
    // Fetch data from the  API
    const response = await fetch(
      "https://s3.amazonaws.com/roxiler.com/product_transaction.json"
    );
    const data = await response.json();

    // Insert data into the database
    await Transaction.insertMany(data);
    console.log("Data inserted into the database");

    //return res
    return res.status(200).json({
      success: true,
      message: "Data inserted into the database",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error in Initializing. Please try again",
    });
  }
};

exports.transactionsController = async (req, res) => {
  try {
    console.log("Inside Trasaction Controller: ", req.query);
    const {
      page = 1,
      per_page = 10,
      search = "",
      selectedMonth = "3",
    } = req.query;

    // Construct the query based on search text for title, description, or price
    const query = {
      $or: [
        { title: { $regex: search, $options: "i" } }, // Case-insensitive title search
        { description: { $regex: search, $options: "i" } }, // Case-insensitive description search
      ],
      $expr: {
        $eq: [
          { $month: { $toDate: "$dateOfSale" } },
          parseInt(selectedMonth), // Convert selectedMonth to integer
        ],
      },
    };

    // Check if the search value is a valid number
    const searchAsNumber = parseFloat(search);
    if (!isNaN(searchAsNumber)) {
      query.$or.push({
        price: { $gte: searchAsNumber, $lt: searchAsNumber + 1 },
      });
    }

    // Count the total number of transactions matching the query
    const totalCount = await Transaction.countDocuments(query);

    // Fetch transactions based on query, pagination, and limit
    const transactions = await Transaction.find(query)
      .skip((page - 1) * per_page) // Skip transactions based on pagination
      .limit(parseInt(per_page)); // Limit number of transactions per page

    // Respond with paginated transactions and pagination metadata
    return res.status(200).json({
      success: true,
      message: "Transactions fetched successfully",
      page: parseInt(page), // Current page
      per_page: parseInt(per_page), // Transactions per page
      total_transactions: totalCount, // Total transactions matching the query
      transactions, // Array of transactions matching the query
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error in fetching transactions. Please try again",
    });
  }
};
