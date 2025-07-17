const express = require('express')
const {server,App} = require('./lib/socket.js')
const dotenv = require('dotenv')
const connectDB = require('./mongoose.js')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const path = require('path')

App.use(cookieParser())
App.use(express.json({limit:"12mb"}))
App.use(cors({ origin: "http://localhost:5173", credentials: true }))

App.use('/api/user', require('./api/user.js'))
App.use('/api/message',require('./api/message.js'))


dotenv.config()

const PORT = process.env.PORT


server.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`)
    connectDB()
})