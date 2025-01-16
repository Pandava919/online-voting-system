const express = require('express')
const { registerUser } = require('../controllers/user.controller')

let route = express.Router()

route.post('/register', registerUser)