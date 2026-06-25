const express = require("express");
const journalEntryController = require("../controllers/journalEntryController");

const router = express.Router();

// Note to Selin, I remember there should be a hiyerarchy of routes, check that please.
router.get("/", journalEntryController.getJournalEntries);
router.post("/", journalEntryController.createJournalEntry);

module.exports = router;
