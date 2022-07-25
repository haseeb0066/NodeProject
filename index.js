const express = require("express");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const color = require("colors");
const ConnectDB = require("./cofig/db");
const port = process.env.PORT || 5000;
const app = express();

//=============== Database connection =========
ConnectDB();

// ===== use for get json body =====
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// ===== use for get json body =====

app.use("/api/goals", require("./routes/goalRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
