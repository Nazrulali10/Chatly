const PORT = process.env.PORT || 5001
const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cookieParser = require('cookie-parser');
const connectDB = require('./mongoose.js');
const { server, App } = require('./lib/socket.js');
const cors = require('cors');


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

connectDB()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("DB connection failed:", err);
  });


