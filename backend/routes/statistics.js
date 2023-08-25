const express = require("express");
const router = express.Router();

const {
  calculateStatistics,
  createBarGraph,
  createPieChart,
} = require("../controllers/StatisticsController");

const { getCombinedStatistics } = require("../controllers/CombinedController");

// Route for calculating statistics
router.get("/calculate-statistics", calculateStatistics);

// Route for creating bar graph
router.get("/create-bargraph", createBarGraph);

// Route for creating pie chart
router.get("/create-piechart", createPieChart);

// Route for calculating combined statistics
router.get("/combined-statistics", getCombinedStatistics);

module.exports = router;
