const errorHandler = (error, req, res, next) => {
  res.status(error.statusCode).json(error);
};

module.exports = errorHandler;
