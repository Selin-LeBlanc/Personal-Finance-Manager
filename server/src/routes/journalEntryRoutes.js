const express = require("express");
const journalEntryController = require("../controllers/journalEntryController");

const router = express.Router();

router.post("/", journalEntryController.createJournalEntry);

module.exports = router;
