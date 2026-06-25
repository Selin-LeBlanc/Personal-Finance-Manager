const reportService = require("../services/reportService");

async function getAccountBalances(req, res) {
  try {
    const balances = await reportService.getAccountBalances();

    res.status(200).json({
      success: true,
      data: balances,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch account balances",
    });
  }
}

module.exports = {
  getAccountBalances,
};
