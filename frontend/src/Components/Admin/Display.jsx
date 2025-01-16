import React, { useEffect, useState } from 'react'
import UseFetch from '../../Hooks/UseFetch';
import '../../Styles/DisplayElections.css'
import axios from 'axios';

const Display = ({ elections, setElections }) => {

    const deleteElection = async (id) => {
        try {
            setElections((previousElections) => previousElections.filter((election) => election?._id !== id))
            await axios.delete(`http://localhost:4000/api/onlinevoting/delete-election/${id}`)
            console.log(elections);
            const { data } = await axios.get('http://localhost:4000/api/onlinevoting/get-elections');
            setElections(data)
        } catch (error) {
            console.log(error);
        }

    }
    return (
        <section className='display-elections-section'>
            <h1>Elections Details</h1>
            <section className="elections-table-section">
                {elections?.length > 0 ?
                    <div className="elections-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Sl.No</th>
                                    <th>Election Name</th>
                                    <th># Candidates</th>
                                    <th>Starting Date</th>
                                    <th>Ending Date</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {elections?.map(({ election_topic, no_of_candidates, starting_date, ending_date, status, _id }, index) => {
                                    return (
                                        <tr key={_id}>
                                            <td>{index + 1}</td>
                                            <td>{election_topic}</td>
                                            <td>{no_of_candidates}</td>
                                            <td>{starting_date.split("T")[0]}</td>
                                            <td>{ending_date.split('T')[0]}</td>
                                            <td>{status}</td>
                                            <td>
                                                <button onClick={() => deleteElection(_id)} >Delete</button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                    : <h1>No Elections Found</h1>}
            </section>
        </section>
    )
}

export default React.memo(Display)
