const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_URI, {
     useCreateIndex : true, 
     useNewUrlParser : true,
     useUnifiedTopology : true,
    })
    
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('LOCAL mongoDB connected');
});