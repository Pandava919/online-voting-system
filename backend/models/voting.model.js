const mongoose = require('mongoose')
let votingSchema = new mongoose.Schema({
    election_id: {
        required: true,
        type: String
    },
    voter_id: {
        required: true,
        type: String
    },
    candidate_id: {
        required: true,
        type: String
    },
    vote_date: {
        required: true,
        type: String
    },
    vote_time: {
        required: true,
        type: String
    }
}, {
    versionKey: false,
    timestamps: true
})
model.exports = mongoose.model("votings", votingSchema)