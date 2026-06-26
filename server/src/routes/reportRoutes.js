const express = require("express");
const reportController = require("../controllers/reportController");

const router = express.Router();

router.get("/account-balances", reportController.getAccountBalances);

router.get("/balance-sheet", reportController.getBalanceSheet);
router.get("/income-statement", reportController.getIncomeStatement);

module.exports = router;
