const express = require('express')
const { votingMiddleware } = require('../controllers/voter.controller')
const router = express.Router()

router.get('/voting', votingMiddleware)

module.exports = router