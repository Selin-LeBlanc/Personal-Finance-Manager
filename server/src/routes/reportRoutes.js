const express = require("express");
const reportController = require("../controllers/reportController");

const router = express.Router();

router.get("/account-balances", reportController.getAccountBalances);

module.exports = router;
