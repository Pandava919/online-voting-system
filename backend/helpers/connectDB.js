const mongoose = require('mongoose')
let connectDB = (url) => {
    return mongoose.connect(url)
}

module.exports = connectDB