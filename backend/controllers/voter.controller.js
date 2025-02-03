const voting = require('../models/voting.model')
const elections = require('../models/election.model')
const users = require('../models/user.model')

const votingMiddleware = async (req, res, next) => {
    const { election_id, voter_id, candidate_id, vote_date, vote_time } = req.body;

    try {
        const electionPresent = await elections.findById(election_id);
        if (electionPresent && electionPresent.status === 'active') {
            const voterPresent = await users.findById(voter_id);
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
module.exports = { votingMiddleware }