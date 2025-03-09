import React, { useEffect, useState } from 'react'
import '../../Styles/AddCandidate.css'
import '../../Styles/DisplayCandidates.css'
import UseFetch from '../../Hooks/UseFetch';
import axios from 'axios';
import DisplayCandidates from './DisplayCandidates';

const AddCandidates = () => {
    const [formData, setFormData] = useState({
        election_id: "",
        candidate_name: "",
        candidate_contact: "",
        candidate_address: "",
        candidate_photo: ""
    });
    const [errors, setErrors] = useState({});
    const [candidates, setCandidates] = useState({});
    const [activeElections, setActiveElections] = useState()
    //! fetching the elections
    let { apiData, Loading } = UseFetch('http://localhost:4000/api/onlinevoting/get-active-elections');
    useEffect(() => {
        console.log(apiData);
        setActiveElections(apiData?.data)
    }, [apiData])
    //! fetching the candidates
    useEffect(() => {
        const fetchCandidates = async () => {
            try {
                const { data } = await axios.get('http://localhost:4000/api/onlinevoting/get-candidates');
                console.log(data);

                setCandidates(data?.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchCandidates()
    }, [])
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
    //! input validation
    const candidateInputValidation = (formData) => {
        let errors = {};
        if (!formData?.candidate_name) {
            errors.candidate_name = 'Candidate name is mandatory'
        }
        if (!formData?.election_id) {
            errors.election_id = 'Election topic is mandatory'
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
        e.preventDefault();
        let validation = candidateInputValidation(formData);

        if (Object.keys(validation).length > 0) {
            setErrors(validation);
            return;
        }
        try {
            const electionsUploaded = await axios.post(
                'http://localhost:4000/api/onlinevoting/addcandidate',
                formData,
                {
                    headers: { 'Content-Type': 'application/json' },
                }
            );
            setFormData({
                election_id: "",
                candidate_name: "",
                candidate_contact: "",
                candidate_address: "",
                candidate_photo: ""
            })
            alert('Candidate added successfully');

            const { data } = await axios.get('http://localhost:4000/api/onlinevoting/get-candidates');
            setCandidates(data?.data);
            console.log(data);

        } catch (error) {
            console.error('Error:', error.response?.data || error.message);
            alert(error.message);
        }
    };

    return (
        <section className='addcandidate-main-container'>
            <div className="addcandidate-form-container">
                <h1>Add New Candidate</h1>
                <form onSubmit={onSubmitHandler}>
                    <div className="input-container">
                        <select name="election_id" value={formData.election_id} onChange={onChangeHandler}>
                            <option value="" disabled>Select Election</option>
                            {activeElections?.map((election) => {
                                return (
                                    <option value={election?._id} key={election?._id} > {election.election_topic}</option>
                                )
                            })}
                        </select>
                        {errors?.election_id && <span>{errors?.election_id}</span>}
                    </div>
                    <div className="input-container">
                        <input type="text" name="candidate_name" value={formData.candidate_name} placeholder='Candidate name' onChange={onChangeHandler} />
                        {errors?.candidate_name && <span>{errors?.candidate_name}</span>}
                    </div>

                    <div className="input-container">
                        <input type="text" name='candidate_address' value={formData.candidate_address} placeholder='Candidate Address' onChange={onChangeHandler} />
                        {errors?.candidate_address && <span>{errors?.candidate_address}</span>}
                    </div>
                    <div className="input-container">
                        <input type="text" minLength={10} maxLength={10} name='candidate_contact' value={formData.candidate_contact} placeholder='Candidate Contact' onChange={onChangeHandler} />
                        {errors?.candidate_contact && <span>{errors?.candidate_contact}</span>}
                    </div>

                    <div className="input-container">
                        <input type="file" accept=".png, .jpeg, .jpg" aria-label='Candidate Image' onChange={onImageFileHandler} />
                        {errors?.candidate_photo && <span>{errors?.candidate_photo}</span>}
                    </div>

                    <div className="btn-container">
                        <button type='submit'>Add Candidate</button>
                    </div>
                </form>
            </div>
            <hr />
            <div className="display-candidates">
                <DisplayCandidates candidates={candidates} />
            </div>
        </section>
    )
}

export default AddCandidates
