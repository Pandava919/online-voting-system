const express = require('express')
const { addElection, addCandidate, UserRegistrion, userLogin, getElections, getCandidates, deleteElection } = require('../controllers/admin.controller')
let route = express.Router()        //router

route.post('/register', UserRegistrion)
route.post('/login', userLogin)
route.post('/addelection', addElection)     //router to create election
route.post('/addcandidate', addCandidate)       //router to add candidate
route.get('/get-elections', getElections)
route.get('/get-candidates', getCandidates)
route.delete('/delete-election/:id', deleteElection)

module.exports = route 