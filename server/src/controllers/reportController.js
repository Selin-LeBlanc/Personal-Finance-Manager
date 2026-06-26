const reportService = require("../services/reportService");

async function getAccountBalances(req, res) {
  try {
    const asOfDate = req.query.asOfDate
      ? new Date(req.query.asOfDate)
      : new Date();

    const filters = {
      type: req.query.type,
      code: req.query.code,
    };

    const balances = await reportService.getAccountBalances(asOfDate, filters);

    res.status(200).json({
      success: true,
      data: { asOfDate, filters, accounts: balances },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch account balances",
    });
  }
}
async function getBalanceSheet(req, res) {
  try {
    const asOfDate = req.query.asOfDate
      ? new Date(req.query.asOfDate)
      : new Date();

    const balanceSheet = await reportService.getBalanceSheet(asOfDate);

    res.status(200).json({
      success: true,
      data: balanceSheet,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch balance sheet",
    });
  }
}

//CoPilot is pretty decent for these follow up functions. I'm ok using it :)
async function getIncomeStatement(req, res) {
  try {
    const asOfDate = req.query.asOfDate
      ? new Date(req.query.asOfDate)
      : new Date();

    const incomeStatement = await reportService.getIncomeStatement(asOfDate);

    res.status(200).json({
      success: true,
      data: incomeStatement,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch income statement",
    });
  }
}

module.exports = {
  getAccountBalances,
  getBalanceSheet,
  getIncomeStatement,
};
