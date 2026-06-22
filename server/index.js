const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Personal Finance API is running" });
});

app.get("/api/accounts", (req, res) => {
  res.json([]);
});

app.get("/api/transactions", (req, res) => {
  res.json([]);
});

app.get("/api/expenses", (req, res) => {
  res.json([]);
});

app.get("/api/budgets", (req, res) => {
  res.json([]);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
