import React, { useEffect, useState } from 'react'
import '../../Styles/AddCandidate.css'
import UseFetch from '../../Hooks/UseFetch';
import axios from 'axios';

const AddCandidates = () => {
    const [formData, setFormData] = useState({
        election_topic: "",
        candidate_name: "",
        candidate_contact: "",
        candidate_address: "",
        candidate_photo: ""
    });
    const [errors, setErrors] = useState({});
    const [elections, setElections] = useState([]);
    //! fetching the elections
    const { apiData, Loading } = UseFetch('http://localhost:4000/api/onlinevoting/get-elections');
    useEffect(() => {
        setElections(apiData?.data)
    }, [apiData])
    //! filter the elections
    const electionTopics = elections?.filter((election) => election.status = "active")
    //! image handler
    const onImageFileHandler = (e) => {
        const imageFile = e.target.files[0];
        console.log(imageFile);

        if (imageFile) {
            const imageFileReader = new FileReader(); //filereader in react
            imageFileReader.onload = () => {
                setFormData({ ...formData, candidate_photo: imageFileReader.result }) // conver to base64 string
            };

            imageFileReader.readAsDataURL(imageFile)
        } else {
            alert('Select the image')
        }
    }

    //! input change handler
    const onChangeHandler = ({ target }) => {
        let { name, value } = target;
        setFormData({ ...formData, [name]: value })
    }
    //! imput validation
    const candidateInputHandler = (formData) => {
        let errors = {};
        if (!formData?.candidate_name) {
            errors.candidate_name = 'Candidate name is mandatory'
        }
        if (!formData?.election_topic) {
            errors.election_topic = 'Election topic is mandatory'
        }
        if (!formData?.candidate_contact) {
            errors.candidate_contact = 'Candidate contact is mandatory'
        }
        if (!formData?.candidate_address) {
            errors.candidate_address = 'candidate address is mandatory'
        }
        if (!formData?.candidate_photo) {
            errors.candidate_photo = 'candidate photo is mandatory'
        }
        return errors
    }
    //! onsubmit hander
    const onSubmitHandler = async (e) => {
        e.preventDefault()
        try {
            console.log(formData.candidate_photo);
            await axios.post('http://localhost:4000/api/onlinevoting/add-candidate', formData)

        } catch (error) {
            console.log(error);
            alert(error.message)
        }
    }
    return (
        <section className='addcandidate-main-container'>
            <div className="addcandidate-form-container">
                <h1>Add New Candidate</h1>
                <form onSubmit={onSubmitHandler}>
                    <div className="input-container">
                        <select name="election_topic" value={formData.election_topic} onChange={onChangeHandler}>
                            <option value="" disabled>Select Election</option>
                            {electionTopics?.map((election) => {
                                return (
                                    <option value={election?._id} key={election?._id} > {election.election_topic}</option>
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
                        <input type="text" minLength={10} maxLength={10} name='candidate_contact' value={formData.candidate_contact} placeholder='Candidate Contact' onChange={onChangeHandler} />
                        {/* {errors?.no_of_candidates && <span>{errors.no_of_candidates}</span>} */}
                    </div>

                    <div className="input-container">
                        <input type="file" placeholder='Candidate Image' onChange={onImageFileHandler} />
                        {/* {errors?.starting_date && <span>{errors.starting_date}</span>} */}
                    </div>

                    <div className="btn-container">
                        <button type='submit'>Add Candidate</button>
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
