module.exports = function(err, req, res, next) {
  const { start, httpStatus, message, previousError, stack } = err;
  console.log(stack);

  res.status(httpStatus || 406).json({
    status: false,
    code: httpStatus || 406,
    message,
    data: previousError
  });
};
