const accountService = require("../services/accountService");

async function getAccounts(req, res) {
  try {
    const accounts = await accountService.getAllAccounts();

    res.status(200).json({
      success: true,
      data: accounts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch accounts",
    });
  }
}

module.exports = {
  getAccounts,
};
