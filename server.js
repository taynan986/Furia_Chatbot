const path = require("path");
require("dotenv").config({path: path.join(__dirname, ".env")});
const express = require("express");

const PORT = process.env.PORT;

const app = express();

app.use(express.static("views"));

const matchRouter = require("./routes/api/matches");
app.use("/api", matchRouter);

const queryRouter = require("./routes/api/query");
app.use("/api", queryRouter);


app.listen(PORT, () => console.log(`Server started on port ${PORT}`));