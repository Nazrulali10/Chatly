// const express = require('express')
// const {server,App} = require('./lib/socket.js')
// const dotenv = require('dotenv')
// const connectDB = require('./mongoose.js')
// const cors = require('cors')
// const cookieParser = require('cookie-parser')
// const path = require('path')

// App.use(cookieParser())
// App.use(express.json({limit:"12mb"}))
// App.use(express.urlencoded({ extended: true }));
// App.use(cors({ origin: ["http://localhost:5173","https://chatly-client-zeta.vercel.app"], credentials: true }))

// App.use('/api/user', require('./api/user.js'))
// App.use('/api/message',require('./api/message.js'))


// dotenv.config()

// const PORT = process.env.PORT

// App.get('/',(req,res)=>{
//     res.send("Working")
// })

// server.listen(PORT,()=>{
//     console.log(`server is running on ${PORT}`)
//     connectDB()
// })
// Load .env first!
const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cookieParser = require('cookie-parser');
const connectDB = require('./mongoose.js');
const { server, App } = require('./lib/socket.js');
const cors = require('cors');
const path = require('path');

// Middleware
App.use(cookieParser());
App.use(express.json({ limit: "12mb" }));
App.use(express.urlencoded({ extended: true }));

App.use(cors({
  origin: ["http://localhost:5173", "https://chatly-client-zeta.vercel.app"],
  credentials: true
}));

// Routes
App.use('/api/user', require('./api/user.js'));
App.use('/api/message', require('./api/message.js'));

// Test route
App.get('/', (req, res) => {
  res.send("Server is working");
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
