const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const app = express();

dotenv.config();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 4000;

// impoting database config and connecting to the DB
const database = require("./config/database");
database.dbConnect();

// importing routes
const transactionRoutes = require("./routes/transaction");
const statisticRoutes = require("./routes/statistics");

//routes mounting
app.use("/api/v1", transactionRoutes);
app.use("/api/v1", statisticRoutes);

//default route
app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Your server is up and running....",
  });
});

app.listen(PORT, () => {
  console.log(`App is running at ${PORT}`);
});
