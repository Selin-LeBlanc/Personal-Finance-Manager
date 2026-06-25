const journalEntryService = require("../services/journalEntryService");

async function createJournalEntry(req, res) {
  try {
    const journalEntry = await journalEntryService.createJournalEntry(req.body);

    res.status(201).json({
      success: true,
      data: journalEntry,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

module.exports = {
  createJournalEntry,
};
