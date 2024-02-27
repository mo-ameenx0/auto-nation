const express = require("express");
const app = express();
const cors = require("cors");

require("dotenv").config({ path: "./.env" });
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(require("./endpoints"));

const dbo = require("./db");

app.listen(port, async () => {
  // perform a database connection when server starts
  await dbo.connectToServer();
  console.log(`Server is running on port: ${port}`);
});
