// Global imports
const fetch = require("node-fetch");

const apiRequest = (url) => {
  return fetch(url).then((res) => res.json());
};

module.exports = apiRequest;
