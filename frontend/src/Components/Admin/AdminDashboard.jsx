import React, { useEffect, useState } from 'react'
import '../../Styles/AdminDashboard.css'
import axios from 'axios';

const AdminDashboard = () => {
  const [results, setResults] = useState([]);
  const [winner, setWinner] = useState({});
  useEffect(() => {
    const fetch = async () => {
      const { data } = await axios.get('http://localhost:4000/api/onlinevoting/get-result');
      setResults(data?.data);
    }
    fetch()
  }, []);
  useEffect(() => {
    const sr = results.sort((a, b) => b.votes - a.votes);
    setWinner(sr[0]);
  }, [results])
  console.log(winner);

  return (
    <section className='result-section'>
      <div>
        <h2>Election Result</h2>
        <div className='election-topic'>
          <h3>Election Topic: {results[0]?.election_topic.toUpperCase()}</h3>
        </div>
        <div className='result-container'>
          <div>
            <div className='result-headers'>
              <span>Sl. No.</span>
              <span>Candidate Details</span>
              <span># of votes</span>
            </div>
            <div className='result-content'>
              {results.length > 0 ?
                <div>
                  {results?.map((res, index) => {
                    return (
                      <div className='result' key={res._id} >
                        <span>{index + 1}</span>
                        <div className='candidate-info'>
                          <img src={res.candidate_photo} alt="" />
                          <div>
                            <span>{res.candidate_name}</span>
                            <span>{res.candidate_address}</span>
                          </div>
                        </div>
                        <span>{res.votes}</span>
                      </div>
                    )
                  })}
                </div>
                : <div className='no-elections'>
                  <h2>No Active Elections found</h2>
                </div>
              }
            </div>
          </div>
        </div>
        {winner &&
          <div className='winner-container'>
            <h2>{`Winner of the ${winner.election_topic} election`}</h2>
            <div className='winner-info'>
              <img src={winner.candidate_photo} alt="" />
              <div className='winner-details'>
                <span>{winner.candidate_name}</span>
                <span>{winner.candidate_address}</span>
              </div>
              <div>
                <img src="https://media.tenor.com/ZoZqWaSnN5UAAAAi/diwali-sparkles-stars.gif" alt="" width={'100px'} height={'100px'} />
              </div>
            </div>
          </div>}
      </div>
    </section>
  )
}

export default AdminDashboard
