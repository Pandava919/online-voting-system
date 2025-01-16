const mongoose = require('mongoose')

let electionSchema = new mongoose.Schema({
    election_topic: {
        required: true,
        unique: true,
        type: String
    },
    no_of_candidates: {
        required: true,
        type: Number
    },
    starting_date: {
        required: true,
        type: Date,
    },
    ending_date: {
        required: true,
        type: Date
    },
    status: {
        required: true,
        type: String
    }
}, {
    versionKey: false,
    timestamps: true
})

module.exports = mongoose.model("elections", electionSchema)