const mongoose = require('mongoose')

let mongoURI;

if(process.env.NODE_ENV === 'development') mongoURI = process.env.MONGO_URI_DEV
else mongoURI = process.env.MONGO_URI

mongoose.connect(mongoURI, {
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  useNewUrlParser: true
})
.then(() => console.log('connect to database'))
.catch((err) => console.log('cant connect to database', err));

// const db = mongoose.connection
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   console.log('mongoose connected');
// });