module.exports = (err, req, res, next) => {
  console.log({err});
  
  if (err.name === 'ValidationError') {
    res.status(403).json({
      message: err.message
    });
  } else {
    res.status(err.statusCode || 500).json({
      message: err || 'Internal Server Error'
    });
  }
};