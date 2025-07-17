const mongoose = require('mongoose')


async function connectDB() {
    try {
        const connect = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`mongodb connected successfully ${connect.connection.host}`)
    } 
    catch (error) {
        console.log(`${error.message}`)
    }
    
}
module.exports = connectDB