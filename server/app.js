if (process.env.NODE_ENV == "development" || !process.env.NODE_ENV) {
    require('dotenv').config()
}
const express = require('express')
const app = express()
const port = process.env.PORT
const cors = require('cors')
const routes = require('./routes/index')
const mongoose = require('mongoose')
const mongoURL = process.env.MONGO_URL

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// mongoose.connect(`mongodb+srv://amalyaadyanissa:x07hlsBARrYvoPGW@cluster0-b3rse.gcp.mongodb.net/miniwp`, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
// mongoose.connect(`mongodb+srv://amalyaadyanissa:x07hlsBARrYvoPGW@cluster0-b3rse.gcp.mongodb.net/tes`, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })


// mongoose.connect(`mongodb+srv://amalyaadyanissa:x07hlsBARrYvoPGW@cluster0-b3rse.gcp.mongodb.net/miniwp`, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })

// mongoose.connect('mongodb://localhost:27017/miniWP', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
// mongoose.connect('mongodb+srv://amalyaadyanissa:x07hlsBARrYvoPGW@cluster0-b3rse.gcp.mongodb.net/miniwp', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })



app.use('/', routes)
app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})

