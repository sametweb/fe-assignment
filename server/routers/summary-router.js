// Global imports
const router = require("express").Router();

// Local imports
const apiRequest = require("../utils/api-request");

router.get("/", async (req, res, next) => {
  const requestURL = "https://api.covid19api.com/summary";

  try {
    const data = await apiRequest(requestURL);
    res.status(200).json(data);
  } catch (error) {
    next({
      statusCode: 500,
      errorMessage:
        "Error while fetching data from the server. Try again later.",
      response: error,
    });
  }
});

module.exports = router;
