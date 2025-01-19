const mongoose = require('mongoose')

let candidateSchema = new mongoose.Schema({
    election_topic: {
        required: true,
        type: String
    },
    candidate_name: {
        required: true,
        type: String
    },
    candidate_contact: {
        required: true,
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

module.exports = mongoose.model('Candidates', candidateSchema)