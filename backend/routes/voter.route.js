const express = require('express')
const { voting } = require('../controllers/voter.controller')
const router = express.Router()

router.get('/voting', voting)

module.exports = router