const express = require("express");
const router = express.Router();

const {
  initializeDatabase,
  transactionsController,
} = require("../controllers/TransactionController");

// Route for Initialization
router.post("/initialize", initializeDatabase);

// Route for search
router.get("/transactions", transactionsController);

module.exports = router;
