import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../../Styles/VotingDashboard.css'
import votingSign from '../../assets/vote.png'
import { useOutletContext } from 'react-router-dom'

const VotingDashboard = () => {
    const [elections, setElections] = useState([])
    const [candidates, setCandidates] = useState([])
    const [votingData, setVotingData] = useState([])
    const user = useOutletContext()

    useEffect(() => {
        const fetch = async () => {
            try {
                const { data } = await axios.get('http://localhost:4000/api/onlinevoting/get-election-candidates')
                setCandidates(data?.data)
            } catch (error) {
                alert(error.response.data.message)
                console.log(error);
            }
        }
        fetch()
    }, [])
    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get('http://localhost:4000/api/onlinevoting/get-voters');
                setVotingData(data?.data)
            } catch (error) {
                console.log(error.message);
            }
        })()
    }, [])
    const isVoted = votingData.find(({ voter_id }) => voter_id === user?.data?.voter_id)

    const onVoteHandler = async (candidateInfo) => {
        const { election_id, _id: candidate_id, } = candidateInfo;
        const voter_id = user?.data?.voter_id;
        console.log('Voted');

        try {
            await axios.post('http://localhost:4000/api/onlinevoting/voting', { election_id, voter_id, candidate_id });
            alert('Voted Successfully');

        } catch (error) {
            console.log(error);
        }

    }
    return (
        <section className='voting-section'>
            <div className='active-elections-container'>
                <h2>Voting Panel</h2>
                <div className='elections-main-box' >
                    <div className='election-header'>
                        <span>Sl. No.</span>
                        <span>Candidate Name</span>
                        <span>Candidate Photo</span>
                        <span>Candidate Address</span>
                        <span>Vote</span>
                    </div>
                    {candidates?.map((candidate, index) => {
                        return (
                            <div className='election-box' key={candidate?._id} >
                                <div className='candidates-info'>
                                    <span>{index + 1}</span>
                                    <span>{candidate?.candidate_name}</span>
                                    <span>
                                        <img src={candidate?.candidate_photo} alt="" />
                                    </span>
                                    <span>{candidate?.candidate_address}</span>
                                    <span>
                                        <button
                                            disabled={isVoted ? true : false}
                                            style={{ background: isVoted ? 'none' : null, border: isVoted ? 'grey solid' : null, color: isVoted ? 'black' : null, textDecoration: isVoted ? 'line-through' : null }}
                                            onClick={() => onVoteHandler(candidate)}
                                        >
                                            Vote
                                            {/* {isVoted ? <img src={votingSign} alt="" /> : 'Vote'} */}
                                        </button>
                                    </span>
                                </div>
                                <hr style={{ width: '100%', backgroundColor: 'white', border: 'none', height: '3px' }} />
                            </div>
                        )
                    })
                    }
                </div>
            </div>
        </section >
    )
}

export default VotingDashboard
