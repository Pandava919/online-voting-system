import React, { useState } from 'react'
import logo from '../assets/logo.gif'
import '../Styles/SignUp.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const SignUp = () => {
    const [formData, setFormData] = useState({      //state for form data
        voter_id: "",
        firstname: "",
        lastname: "",
        contact: "",
        password: "",
        confirmPassword: ""
    })
    const [error, setErrors] = useState({})     //state for errors
    const navigateFunc = useNavigate()      // hook to navigate on submission

    const onChangeHandler = ({ target }) => {       //onchange handler
        let { name, value } = target;
        setFormData({ ...formData, [name]: value.trim() })
    }

    const formValidation = (data) => {      //validation
        let errors = {}
        if (!data.firstname) {
            errors.firstname = "Firstname is mandatory";
        }
        if (!data.voter_id) {
            errors.voter_id = "Voter_id is mandatory";
        }
        if (!data.contact) {
            errors.contact = "Phone number is mandatory";
        }
        if (!data.password) {
            errors.password = "Password is mandatory";
        } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(data.password)) {
            errors.password = "Password should contain atleast one Uppercase, Lowercase, Number & Special character";
        }
        if (!data.confirmPassword) {
            errors.confirmPassword = "Confirm password is mandatory";
        }
        if (data.password !== data.confirmPassword) {
            errors.confirmPassword = "Confirm password is not matching";
        }
        return errors
    }

    const onSubmitHandler = async (e) => {       //onsubmit handler
        e.preventDefault();
        let validation = formValidation(formData);
        if (Object.keys(validation).length > 0) {
            setErrors(validation)
            return;
        }
        try {
            let { data } = await axios.post("http://localhost:4000/api/onlinevoting/register", formData);
            console.log(data);

            if (data.error === false) {
                navigateFunc('/Login')      //navigation function
            } else {
                return alert(data?.message)
            }

        } catch (error) {
            alert(error?.response?.data?.message);
            console.log(error);
        }
    }

    return (
        <section className='signup-main-container'>
            <section className="signup-container">
                <section className="signup-section">
                    <div className="logo-container">
                        <img src={logo} alt=" onine-voting-logo" />
                    </div>
                    <div className="signup-form-container">
                        <form onSubmit={onSubmitHandler}>
                            <section className="inp-section">
                                <div className="inp-container" style={{ border: error.firstname ? "1.5px solid red" : null }}>
                                    <input type="text" name="firstname" value={formData?.firstname} placeholder='Firstname' onChange={onChangeHandler} />
                                </div>
                                {error?.firstname && <span>{error.firstname}</span>}
                            </section>
                            <section className="inp-section">
                                <div className="inp-container" >
                                    <input type="text" name="lastname" value={formData?.lastname} placeholder='Lastname' onChange={onChangeHandler} />
                                </div>
                                {error?.lastname && <span>{error.lastname}</span>}
                            </section>
                            <section className="inp-section">
                                <div className="inp-container" style={{ border: error.voter_id ? "1.5px solid red" : null }}>
                                    <input type="text" name="voter_id" value={formData?.voter_id} placeholder='Voter_id' onChange={onChangeHandler} />
                                </div>
                                {error?.voter_id && <span>{error.voter_id}</span>}
                            </section>
                            <section className="inp-section">
                                <div className="inp-container" style={{ border: error.contact ? "1.5px solid red" : null }}>
                                    <input type="text" name="contact" value={formData?.contact} placeholder='Phone Number' onChange={onChangeHandler} />
                                </div>
                                {error?.contact && <span>{error.contact}</span>}
                            </section>
                            <section className="inp-section">
                                <div className="inp-container" style={{ border: error.password ? "1.5px solid red" : null }}>
                                    <input type="password" name='password' value={formData?.password} placeholder='Password' onChange={onChangeHandler} />
                                    {error?.password && <span>{error.password}</span>}
                                </div>
                            </section>
                            <section className="inp-section">
                                <div className="inp-container" style={{ border: error.confirmPassword ? "1.5px solid red" : null }}>
                                    <input type="password" name='confirmPassword' value={formData?.confirmPassword} placeholder='Confirm Password' onChange={onChangeHandler} />
                                    {error?.confirmPassword && <span>{error.confirmPassword}</span>}
                                </div>
                            </section>
                            <div className="signup-btn-container">
                                <button type='submit'>Sign Up</button>
                            </div>
                        </form>
                    </div>
                    <div className="login-link">
                        <span>Already have account?    </span>
                        <Link to='/login'> <strong>Login</strong></Link>
                    </div>
                </section>
            </section>
        </section>
    )
}

export default SignUp
