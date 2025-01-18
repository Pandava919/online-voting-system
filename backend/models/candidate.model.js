const mongoose = require('mongoose')

let candidateSchema = new mongoose.Schema({
    election_topic: {
        required: true,
        type: Number
    },
    candidate_name: {
        required: true,
        type: String
    },
    candidate_contact: {
        required: true,
        unique: true,
        type: String
    },
    candidate_address: {
        required: true,
        type: String
    },
    candidate_photo: {
        required: true,
        type: String
    }
}, {
    versionKey: false,
    timestamps: true
})