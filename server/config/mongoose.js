const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useFindAndModify: true
})
  .then(_=> console.log('Success to connect to database'))
  .catch(_=> console.log('Failed to connect to database'))

module.exports = mongoose