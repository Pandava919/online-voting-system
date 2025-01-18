const express = require('express')
const { addElection, addCandidate, UserRegistrion, userLogin, getElections, deleteElection } = require('../controllers/admin.controller')
let route = express.Router()        //router

route.post('/register', UserRegistrion)
route.post('/login', userLogin)
route.post('/addelection', addElection)     //router to create election
route.get('/get-elections', getElections)
route.delete('/delete-election/:id', deleteElection)
route.post('/add-candidate', addCandidate)       //router to add candidate

module.exports = route 