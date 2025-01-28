const Users = require('../models/user.model')
const elections = require('../models/election.model')
const candidates = require('../models/candidate.model')
const bcrypt = require('bcryptjs')
let UserRegistrion = async (req, res, next) => {
    try {
        let { voter_id, firstname, lastname, contact, password, confirmPassword } = req.body
        if (!firstname || !contact || !password || !confirmPassword) {      //field validation
            return res.status(400).json({ error: true, message: "All fields are mandatory" })
        }
        if (password !== confirmPassword) {     //password validation
            return res.status(400).json({ error: false, message: "Confirm password is not matching" })
        }
        let isUserAvailable = await Users.findOne({ voter_id });        //existing user validation
        if (isUserAvailable) {
            return res.status(201).json({ error: true, message: `User ${voter_id} is already registerd` })
        }
        let fullname = firstname.concat(" ", lastname ? lastname : "").trim()

        let salt = bcrypt.genSaltSync(8)        //encrypting password
        let hashedPassword = bcrypt.hashSync(confirmPassword, salt)
        if (voter_id.includes("admin_ele_comm")) {     //setting a role of a user
            role = "admin";
        } else {
            role = "voter";
        }
        let use = await Users.create({ voter_id, fullname, contact, password: hashedPassword, role })       //adding user to the database
        res.status(200).json({ error: false, message: "User registerd successfully" })
    } catch (error) {
        next(error)
    }
}

let userLogin = async (req, res, next) => {       //user login controller
    try {
        let { voter_id, password } = req.body

        if (!password || !(voter_id)) {      //fileds validation
            return res.status(400).json({ error: true, message: "All fileds are mandatory" })
        }
        let isUserAvailable = await Users.findOne({ voter_id })     //Checking user available
        if (isUserAvailable) {      //user avalilabile
            if (await bcrypt.compareSync(password, isUserAvailable.password)) {     //comparing passwprds
                if (isUserAvailable.role === "admin") {
                    return res.status(200).json({ error: false, message: "Admin login successfull", data: isUserAvailable })
                } else {
                    return res.status(200).json({ error: false, message: "Voter login successfull", data: isUserAvailable })
                }
            }
            return res.status(400).json({ error: true, message: "Invalid credentials" })
        }
        return res.status(404).json({ error: true, message: `User ${voter_id ? voter_id : contact} is not found` })
    } catch (error) {
        next(error)
    }
}

let addElection = async (req, res, next) => {       //create election controller
    try {
        let { election_id, election_topic, no_of_candidates, starting_date, ending_date, status } = req.body
        starting_date = new Date(starting_date)
        ending_date = new Date(ending_date)
        const today = new Date();
        // let today = String(day.getFullYear()) + "-" + String(day.getMonth()).padStart(2, 0) + "-" + String(day.getDate()).padStart(2, 0);

        if (today > ending_date && starting_date > ending_date) {
            return res.status(400).json({ error: true, message: "starting date is greater than the ending date" })
        } else {
            status = "active";
        }
        let election = await elections.create({ election_id, election_topic, no_of_candidates, starting_date, ending_date, status })
        res.status(200).json({ error: false, message: "added successfully" })
    } catch (error) {
        console.log(error);
        next(error)
    }
}

let addCandidate = async (req, res, next) => {
    try {
        console.log('Request Body:', req.body);
        let { election_id, candidate_name, candidate_contact, candidate_address, candidate_photo } = req.body;

        if (!election_id) {
            return res.status(400).json({ error: true, message: 'Election ID is mandatory' });
        }
        if (!candidate_name) {
            return res.status(400).json({ error: true, message: 'Candidate name is mandatory' });
        }
        if (!candidate_address) {
            return res.status(400).json({ error: true, message: 'Candidate address is mandatory' });
        }
        if (!candidate_contact) {
            return res.status(400).json({ error: true, message: 'Candidate contact is mandatory' });
        }
        if (!candidate_photo) {
            return res.status(400).json({ error: true, message: 'Candidate photo is mandatory' });
        }

        const isElectionAvailable = await elections.findById(election_id);

        if (isElectionAvailable) {
            const noOfCandidatesAdded = await candidates.countDocuments({ election_id });

            if (isElectionAvailable.no_of_candidates > noOfCandidatesAdded) {
                const isCandidateAvailable = await candidates.findOne({ election_id, candidate_contact });

                if (!isCandidateAvailable) {
                    const data = await candidates.create({
                        election_id,
                        candidate_name,
                        candidate_contact,
                        candidate_address,
                        candidate_photo,
                    });
                    return res.status(201).json({ error: false, message: 'Candidate added successfully' });
                }
                return res.status(409).json({ error: true, message: 'Candidate already present' });
            }
            return res.status(403).json({ error: true, message: 'Maximum number of candidates are added' });
        }
        return res.status(404).json({ error: true, message: 'Election is not present' });
    } catch (error) {
        console.error('Error in Add Candidate Middleware:', error);
        next(error);
    }
};


const getElections = async (req, res, next) => {
    try {
        const today = new Date();       //today's date
        await elections.updateMany({ ending_date: { $lt: today } }, { $set: { status: "expired" } }).lean();
        let electionData = await elections.find({});
        res.status(200).json({ error: false, message: "Elections data fetched successfully", data: electionData })
    } catch (error) {
        console.log(error);
        next(error)
    }
}

const getCandidates = async (req, res, next) => {
    try {
        let candidatesData = await candidates.find({}).lean();
        let updatedCandatesData = []

        if (candidatesData) {
            for (let i = 0; i < candidatesData.length; i++) {
                const electionData = await elections.findById(candidatesData[i]?.election_id);
                updatedCandatesData.push({ ...candidatesData[i], election_topic: electionData?.election_topic })
            }
            return res.status(200).json({ error: false, message: 'fetched the cadidates successfully', data: updatedCandatesData })
        }
        res.status(404).json({ error: true, message: 'cadidates not found', data: candidatesData })
    } catch (error) {
        console.log(error);
        next(error)
    }
}

const deleteElection = async (req, res, next) => {
    try {
        let { id } = req.params;
        let isElectionAvailable = await elections.findById(id);
        if (isElectionAvailable) {
            await elections.findByIdAndDelete(id);
            return res.status(200).json({ error: false, message: `Election ${isElectionAvailable?.election_topic} deleted successfully` })
        }
        return res.status(404).json({ error: false, message: `Election ${id} not found` })
    } catch (error) {
        next(error)
    }
}



module.exports = { addCandidate, addElection, UserRegistrion, userLogin, getElections, getCandidates, deleteElection }