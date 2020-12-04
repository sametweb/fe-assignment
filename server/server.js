// Global imports
const express = require("express");
const server = express();
const cors = require("cors");
const helmet = require("helmet");

// Local imports
const errorHandler = require("./utils/error-handler");
const summaryRouter = require("./routers/summary-router");
const countryRouter = require("./routers/country-router");

// Server settings
server.use(cors());
server.use(helmet());
server.use(express.json());

// Routers
server.use("/summary", summaryRouter);
server.use("/country", countryRouter);

server.get("/", (req, res) => {
  res.status(200).json(req.headers); // I like seeing headers object in the homepage of the API for debugging purposes
});

server.use(errorHandler);

module.exports = server;
