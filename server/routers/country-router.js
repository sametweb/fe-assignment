// Global imports
const router = require("express").Router();

// Local imports
const apiRequest = require("../utils/api-request");

router.get("/:name", async (req, res, next) => {
  const countryName = req.params.name;
  const requestURL = "https://api.covid19api.com/total/country/" + countryName;

  try {
    const data = await apiRequest(requestURL);

    if (data.message === "Not Found") {
      next({
        statusCode: 400,
        errorMessage:
          "You have made a bad request. Check if the URL or the country name is correct.",
        response: data,
      });
    } else {
      res.status(200).json(data);
    }
  } catch (error) {
    next({
      statusCode: 500,
      errorMessage:
        "Error while fetching data from the server. Try again later.",
      response: error,
    });
  }
});

// Handles the requests without a country name
router.get("/", (req, res, next) => {
  next({
    statusCode: 400,
    errorMessage: "Country name cannot be empty.",
  });
});

module.exports = router;
