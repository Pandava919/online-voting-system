import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import logo from '../assets/logo.gif'
import '../Styles/Login.css'

const Login = () => {
    let [formData, setFormData] = useState({      //state hook formdata
        voter_id: "",
        password: "",
    });
    let [loginData, setLoginData] = useState()
    let [errors, setErrors] = useState({});     //state for errors
    let navigateFunc = useNavigate()        //hook to navigate on form submission
    let [isLoading, setIsLoading] = useState(false)

    const onChangeHandler = ({ target }) => {       //onchange handler
        let { name, value } = target;
        setFormData({ ...formData, [name]: value.trim() })

    }
    const validateLoginForm = (data) => {
        let errors = {};
        if (!data.voter_id) {
            errors.voter_id = "This field is mandatory";
        }
        if (!data.password) {
            errors.password = "Password is mandatory";
        }
        return errors
    }

    // useEffect(() => {
    //     try {
    //         let fetch = async () => {
    //             let { data } = await axios.post("http://localhost:4000/api/onlinevoting/login", { ...formData })
    //             setLoginData(data)
    //         }
    //         fetch()
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }, [login])

    const onSubmitHandler = async (e) => {       //onsubmit handler
        e.preventDefault();
        let validation = validateLoginForm(formData);
        if (Object.keys(validation).length > 0) {       //Stopping submission if form not validated
            setErrors(validation)
            return
        }
        try {
            setIsLoading(true)
            let { data } = await axios.post("http://localhost:4000/api/onlinevoting/login", { ...formData })
            setLoginData(data)
            setIsLoading(false)

            if (data?.data?.role === "admin") {     //Navigating to admin component if the role is admin
                navigateFunc('/Admin', { state: data })
            } else {
                navigateFunc('/Voting', { state: data })
            }
        } catch (error) {
            setIsLoading(false)
            alert(error?.response?.data?.message)
            console.log(error?.response?.data?.message);
        }
    }
    return (
        <section className='login-main-container'>
            <section className="login-container">
                <section className="login-section">
                    <div className="logo-container">
                        {/* <div className="logo-circle"> */}
                        <img src={logo} alt=" onine-voting-logo" />
                        {/* </div> */}
                    </div>
                    <div className="login-form-container">
                        <form onSubmit={onSubmitHandler}>
                            <section className="login-inp-section">
                                <div className="inp-container">
                                    <input type="text" name="voter_id" value={formData?.voter_id} placeholder='Voter_id or Mobile' onChange={onChangeHandler} />
                                </div>
                                {errors?.voter_id && <span>{errors.voter_id}</span>}
                            </section>

                            <section className="login-inp-section">
                                <div className="inp-container">
                                    <input type="password" name='password' value={formData?.password} placeholder='Password' onChange={onChangeHandler} />
                                </div>
                                {errors?.password && <span>{errors.password}</span>}
                            </section>

                            <div className="btn-container">
                                <button type='submit'>Login</button>
                            </div>
                        </form>
                    </div>
                    <div className="signup-link">
                        <span>Don't have an account?    </span>
                        <Link to='/signup'> <strong>Sign Up</strong></Link>
                    </div>
                </section>
            </section>
        </section>
    )
}

export default Login