const express = require('express')
const { votingMiddleware, getElectionCandidates, getVoters, getResultMiddleware } = require('../controllers/voter.controller')
const router = express.Router()

router.post('/voting', votingMiddleware)
router.get('/get-election-candidates', getElectionCandidates)
router.get('/get-voters', getVoters)
router.get('/get-result', getResultMiddleware)


module.exports = router