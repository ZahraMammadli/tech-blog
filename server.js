const express = require("express");
const router = require("./routes/index");
// using middleware
const app = express();

app.listen(3001, () => "application started on port 3001");
