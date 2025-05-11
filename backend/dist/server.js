"use strict";

var express = require("express");
var bodyParser = require("body-parser");
var dotenv = require("dotenv");
dotenv.config();
var cors = require("cors");
var databaseConnection = require("./dabase");
var scrapeEvents = require("./utils/scrapeEvent");
var routes = require("./routes/routes");

var app = express();
var PORT = process.env.PORT || 3000;

app.use(express["static"]("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({
  origin: "*", // Adjust this to your frontend URL
  methods: ["GET", "POST", "OPTIONS", "PUT", "DELETE"],
  credentials: true
}));

// MongoDB Setup
databaseConnection();

// Schedule scraping every 6 hours
setInterval(function () {
  scrapeEvents();
}, 6 * 60 * 60 * 1000); // 6 hours in milliseconds
scrapeEvents();

// API routes
app.use("/v1", routes);

app.listen(PORT, function () {
  console.log("Server running on http://localhost:" + PORT);
});