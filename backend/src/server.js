const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const databaseConnection = require("./dabase");
const scrapeEvents = require("./utils/scrapeEvent");
const routes = require("./routes/routes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: "*", // Adjust this to your frontend URL
    methods: ["GET", "POST", "OPTIONS", "PUT", "DELETE"],
    credentials: true,
  })
);

// MongoDB Setup
databaseConnection();

// Schedule scraping every 6 hours
setInterval(() => {
  scrapeEvents();
}, 6 * 60 * 60 * 1000); // 6 hours in milliseconds
scrapeEvents();

// API routes
app.use("/v1", routes);


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
