import React, { useEffect, useState } from 'react'
import '../../Styles/AddElection.css'
import axios from 'axios';
import Display from './Display';
import UseFetch from '../../Hooks/UseFetch';

const AddElection = () => {
    const [electionFormData, setElectionFormData] = useState({        //state to collect election data
        election_topic: "",
        no_of_candidates: "",
        starting_date: "",
        ending_date: ""
    });
    const [fetchedElections, setFetchedElections] = useState()      //state to store fetched elections
    const [errors, setErrors] = useState({});      //state for errors
    const [minStartingDate, setMinStartingDate] = useState();      //today's date state

    useEffect(() => {       // effect code to get today's date
        let today = new Date()
        let startingDate = String(today.getFullYear()) + "-" + String(today.getMonth() + 1).padStart(2, '0') + "-" + String(today.getDate()).padStart(2, '0')
        setMinStartingDate(startingDate)
    }, [])

    let { apiData, Loading } = UseFetch('http://localhost:4000/api/onlinevoting/get-elections');        //fetching elections from db
    useEffect(() => {
        console.log(apiData);

        setFetchedElections(apiData?.data)
    }, [apiData])


    const onchangeHandler = ({ target }) => {     //onchange handler
        let { name, value } = target
        setElectionFormData({ ...electionFormData, [name]: value })
    }
    const validateElectionInputs = (data) => {
        let errors = {};
        if (!data.election_topic) {
            errors.election_topic = "Election topic is mandatory"
        }
        if (!data.no_of_candidates) {
            errors.no_of_candidates = "No. of canidates is mandatory"
        }
        if (!data.starting_date) {
            errors.starting_date = "Starting date is mandatory"
        }
        if (!data.ending_date) {
            errors.ending_date = "Ending date is mandatory"
        }
        if (new Date(data.starting_date) > new Date(data.ending_date)) {
            errors.ending_date = "Ending date should be greater than starting date"
        }
        return errors
    }
    const addElectionSubmitHandler = async (e) => {       //onsubmit handler
        e.preventDefault()
        try {
            let validation = validateElectionInputs(electionFormData)
            if (Object.keys(validation).length > 0) {
                setErrors(validation)
                return
            } else {
                console.log("Election added successfully");
                let electionsAddeddata = await axios.post("http://localhost:4000/api/onlinevoting/addelection", electionFormData)
                if (electionsAddeddata?.data?.error === true) {
                    alert(electionsAddeddata?.data?.message)
                }

                let { data } = await axios.get('http://localhost:4000/api/onlinevoting/get-elections');
                setFetchedElections(data?.data)
                console.log(data);
            }
        } catch (error) {
            console.log(error);
            alert(error?.response?.data?.message)
        }
    }

    return (
        <section className='addelection-main-container' >
            <div className="addelection-form-container">
                <h1>Add Election</h1>
                <form onSubmit={addElectionSubmitHandler}>
                    <div className="input-container">
                        <input type="text" name="election_topic" value={electionFormData.election_topic} placeholder='Election topic' onChange={onchangeHandler} style={{ border: errors.election_topic ? "1px solid red" : null }} />
                        {errors?.election_topic && <span>{errors.election_topic}</span>}
                    </div>

                    <div className="input-container">
                        <input type="number" name='no_of_candidates' value={electionFormData.no_of_candidates} placeholder='Number of candidates' onChange={onchangeHandler} style={{ border: errors.no_of_candidates ? "1px solid red" : null }} />
                        {errors?.no_of_candidates && <span>{errors.no_of_candidates}</span>}
                    </div>
                    <div className="input-container">
                        <input type="date" name='starting_date' min={minStartingDate} value={electionFormData.starting_date} onChange={onchangeHandler} style={{ border: errors.starting_date ? "1px solid red" : null }} />
                        {errors?.starting_date && <span>{errors.starting_date}</span>}
                    </div>
                    <div className="input-container">
                        <input type="date" name='ending_date' min={minStartingDate} value={electionFormData.ending_date} onChange={onchangeHandler} style={{ border: errors.ending_date ? "1px solid red" : null }} />
                        {errors?.ending_date && <span>{errors.ending_date}</span>}
                    </div>

                    <div className="btn-container">
                        <button type='submit'>Add Election</button>
                    </div>
                </form>
            </div>
            <hr />
            <div className='display-elections'>
                <Display elections={fetchedElections} setElections={setFetchedElections} />
            </div>
        </section>
    )
}

export default AddElection
