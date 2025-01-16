const mongoose = require('mongoose')

let userSchema = new mongoose.Schema({
    voter_id: {
        required: true,
        unique: true,
        type: String
    },
    fullname: {
        required: true,
        type: String
    },
    contact: {
        required: true,
        type: String,
        minLength: 10,
        maxLength: 10
    },
    password: {
        required: true,
        type: String,
    },
    role: {
        required: true,
        type: String,
        enum: ["admin", "voter"]
    }
}, {
    versionKey: false,
    timestamps: true
})

module.exports = mongoose.model("Users", userSchema)