import React from 'react'

const DisplayCandidates = ({ candidates }) => {
    return (
        <section className='display-candidates-section'>
            <h1>Candidates Details</h1>
            <section className="candidates-table-section">
                {candidates?.length > 0 ?
                    <div className="candidates-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Sl.No</th>
                                    <th>Candidate photo</th>
                                    <th>Election Name</th>
                                    <th>Candidate Name</th>
                                    <th>Candidate Address</th>
                                    <th>Candidate Contact</th>
                                </tr>
                            </thead>
                            <tbody>
                                {candidates?.map(({ election_topic, candidate_name, candidate_contact, candidate_address, candidate_photo, _id }, index) => {
                                    return (
                                        <tr key={_id}>
                                            <td>{index + 1}</td>
                                            <td><img src={candidate_photo} alt="" /></td>
                                            <td>{election_topic}</td>
                                            <td>{candidate_name}</td>
                                            <td>{candidate_address}</td>
                                            <td>{candidate_contact}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                    : <h1>Candidates Not Found</h1>}
            </section>
        </section>
    )
}

export default DisplayCandidates
