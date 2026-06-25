const express = require("express");
const cors = require("cors");
// Future Selin, please do not forget to add all of the routes here
const accountRoutes = require("./routes/accountRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Personal Finance API is running" });
});

// Future Selin, please do not forget to add all of the account routes here

app.use("/api/accounts", accountRoutes);

module.exports = app;
