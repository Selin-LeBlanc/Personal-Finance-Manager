const journalEntryService = require("../services/journalEntryService");

//CREATWE
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

//GET
async function getJournalEntries(req, res) {
  try {
    const journalEntries = await journalEntryService.getAllJournalEntries();

    res.status(200).json({
      success: true,
      data: journalEntries,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch journal entries",
    });
  }
}

module.exports = {
  createJournalEntry,
  getJournalEntries,
};
