import React, { useEffect, useState } from 'react'
import '../../Styles/AddCandidate.css'
import UseFetch from '../../Hooks/UseFetch';

const AddCandidates = () => {
    const [formData, setFormData] = useState({
        election_topic: "",
        candidate_name: "",
        candidate_contact: "",
        candidate_address: "",
        candidate_photo: ""
    });
    const [elections, setElections] = useState()

    const { apiData, Loading } = UseFetch('http://localhost:4000/api/onlinevoting/get-elections');
    useEffect(() => {
        setElections(apiData?.data)
    }, [apiData])
    const electionTopics = elections?.filter((election) => election.status = "active")
    const onFileChangeHandler = (e) => {
        console.log(e.target.files);
    }

    const onChangeHandler = ({ target }) => {
        let { name, value } = target;
        setFormData({ ...formData, [name]: value })
    }
    return (
        <section className='addcandidate-main-container'>
            <div className="addcandidate-form-container">
                <h1>Add New Candidate</h1>
                <form>
                    <div className="input-container">
                        <select name="election_topic" value={formData.election_topic} onChange={onChangeHandler}>
                            {elections?.map((election) => {
                                return (
                                    <option value="election.election_topic" > {election.election_topic}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="input-container">
                        <input type="text" name="candidate_name" value={formData.candidate_name} placeholder='Candidate name' onChange={onChangeHandler} />
                        {/* {errors?.election_topic && <span>{errors.election_topic}</span>} */}
                    </div>

                    <div className="input-container">
                        <input type="text" name='candidate_address' value={formData.candidate_address} placeholder='Candidate Address' onChange={onChangeHandler} />
                        {/* {errors?.no_of_candidates && <span>{errors.no_of_candidates}</span>} */}
                    </div>
                    <div className="input-container">
                        <input type="number" min={10} max={10} name='candidate_contact' value={formData.candidate_contact} placeholder='Candidate Contact' onChange={onChangeHandler} />
                        {/* {errors?.no_of_candidates && <span>{errors.no_of_candidates}</span>} */}
                    </div>

                    <div className="input-container">
                        <input type="file" name='' placeholder='Candidate Image' onChange={onFileChangeHandler} />
                        {/* {errors?.starting_date && <span>{errors.starting_date}</span>} */}
                    </div>

                    <div className="btn-container">
                        <button type='submit'>Login</button>
                    </div>
                </form>
            </div>
            <hr />
            <div className="display-candidates">
                <h1>Candidates Details</h1>
            </div>
        </section>
    )
}

export default AddCandidates
