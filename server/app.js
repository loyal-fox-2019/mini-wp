if(process.env.NODE_ENV === 'development') require ('dotenv').config()


const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')
const router = require('./router/index')
const cors = require('cors')



mongoose.connect(process.env.DATABASE,{
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology:true
})
.then((data)=>{
    console.log('connected to Database')
})


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(router)


app.listen(port, ()=>{
    console.log(`server running ${port}`)
})