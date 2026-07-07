const accountService = require("../services/accountService");

async function getAccounts(req, res) {
  try {
    const accounts = await accountService.getAccounts();

    res.status(200).json({
      success: true,
      data: accounts,
    });
  } catch (error) {
    console.error("Failed to fetch accounts:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

module.exports = {
  getAccounts,
};
