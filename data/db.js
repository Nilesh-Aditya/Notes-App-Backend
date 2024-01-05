const mongoose = require('mongoose')
const dotenv = require('dotenv').config()

const URI = process.env.dbURI

const connectDB = async () => {
    try {
        await mongoose.connect(URI)

        console.log('DB connected')
    } catch (err) {
        console.log(err.message);
        process.exit(1)
    }
}

module.exports = connectDB;