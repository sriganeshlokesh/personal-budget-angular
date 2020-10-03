const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;
const fs = require("fs");

// Cors Middleware
app.use(cors());

let budgets = fs.readFileSync("budget.JSON");
let budget = JSON.parse(budgets);

// Public Folder Middleware
app.use("/", express.static("public"));

app.get("/budget", (req, res) => {
  res.json(budget);
});

app.listen(port, () => {
  console.log(`Server Running on Port: ${port}`);
});
