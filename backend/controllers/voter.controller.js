const voting = require('../models/voting.model')
const elections = require('../models/election.model')
const candidates = require('../models/candidate.model')


const getElectionCandidates = async (req, res, next) => {
    const today = new Date();       //today's date
    await elections.updateMany({ ending_date: { $lt: today } }, { $set: { status: "expired" } }).lean();
    const activeElection = await elections.find({ status: 'active' }).sort({ starting_date: 1 }).limit(1).lean();
    let updatedElectionCandidates = [];

    if (activeElection.length > 0) {
        const electionCandidates = await candidates.find({ election_id: activeElection[0]?._id }).lean();
        updatedElectionCandidates = electionCandidates.map((candidate) => {
            return { ...candidate, election_topic: activeElection[0].election_topic }
        })

        if (updatedElectionCandidates.length > 0) {
            return res.status(200).json({ error: false, message: 'Candidates fetched succesfully', data: updatedElectionCandidates });
        }
        return res.status(404).json({ error: true, message: 'No candidates found', data: updatedElectionCandidates });
    }
    return res.status(404).json({ error: true, message: 'No active Elections found' });

}

const votingMiddleware = async (req, res, next) => {
    let { election_id, voter_id, candidate_id, vote_date, vote_time } = req.body;

    try {
        const electionPresent = await elections.findById(election_id);
        if (electionPresent && electionPresent.status === 'active') {
            const voterPresent = await voting.findOne({ voter_id });

            const date = new Date();
            vote_date = String(date.getDate()).padStart(2, '0') + '-' + String((Number(date.getMonth()) + 1)).padStart(2, '0') + '-' + date.getFullYear()
            vote_time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()

            if (!voterPresent) {
                await voting.create({ election_id, voter_id, candidate_id, vote_date, vote_time });
                return res.status(200).json({ error: false, message: "Voted succesfully" });
            }
            return res.status(404).json({ error: true, message: 'Voter already voted' });
        }
        return res.status(404).json({ error: true, message: "Election not present or expired" });

    } catch (error) {
        console.log(error.message);
        next(error);
    }
}

const getVoters = async (req, res, next) => {
    try {
        const data = await voting.find();
        if (data.length > 0) {

            return res.status(200).json({ error: false, message: 'fetched votind data successfully', data: data })
        }
        return res.status(404).json({ error: true, message: 'No data found' })
    } catch (error) {
        console.log(error.message);
        next(error)
    }
}

const getResultMiddleware = async (req, res, next) => {

    try {
        let result = []
        const candidates = await fetch('http://localhost:4000/api/onlinevoting/get-election-candidates')
            .then(response => response.json())

        for (let candidate of candidates.data) {
            const votes = await voting.find({ candidate_id: candidate._id }).lean().countDocuments();
            result.push({ ...candidate, votes })
        }
        if (result.length > 0) {

            return res.status(200).json({ error: false, message: 'Fetched result succesfully', data: result })
        }
        return res.status(200).json({ error: true, message: 'Fetched result succesfully' })
    }
    catch (error) {
        console.log(error);
        next(error)
    }



}
module.exports = { votingMiddleware, getElectionCandidates, getVoters, getResultMiddleware }