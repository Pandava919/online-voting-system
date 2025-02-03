const express = require('express')
const { votingMiddleware } = require('../controllers/voter.controller')
const router = express.Router()

router.post('/voting', votingMiddleware)

module.exports = router