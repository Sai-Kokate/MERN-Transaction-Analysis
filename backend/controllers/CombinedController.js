exports.getCombinedStatistics = async (req, res) => {
  try {
    const selectedMonth = parseInt(req.query.selectedMonth);

    const fetchModule = await import("node-fetch");
    const fetch = fetchModule.default;
    // Fetch data from the  API
    const responseSaleStatistics = await fetch(
      `http://localhost:4000/api/v1/calculate-statistics?selectedMonth=${selectedMonth}`
    );
    const totalSaleStatistics = await responseSaleStatistics.json();

    const responsePieChartData = await fetch(
      `http://localhost:4000/api/v1/create-piechart?selectedMonth=${selectedMonth}`
    );
    const pieChartData = await responsePieChartData.json();

    const responseBarChartData = await fetch(
      `http://localhost:4000/api/v1/create-bargraph?selectedMonth=${selectedMonth}`
    );
    const barChartData = await responseBarChartData.json();

    const combinedData = {
      totalSaleStatistics,
      barChartData,
      pieChartData,
    };

    return res.status(200).json({
      success: true,
      message: "Combined Statistics Calculated Sucessfully",
      combinedData,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error in Combined Statistics. Please try again",
    });
  }
};
