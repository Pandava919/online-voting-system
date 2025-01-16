import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import logo from '../../assets/logo.gif'
import UserNAvbar from './UserNAvbar'
const Voting = () => {
    let { state } = useLocation()
    return (
        <section className='admin-section'>
            <div className="top-section">
                <div className="top-container">
                    <div className="logo-container">
                        <img src={logo} alt="" />
                    </div>
                    <div className="title-container">
                        <h1>ONLINE VOTING SYSTEM</h1>
                        <span>--Welcome {state?.data?.fullname}</span>
                    </div>
                </div>
            </div>
            <div className="navbar">
                <UserNAvbar />
            </div>
            <div className="main-section">
                <Outlet />
            </div>
        </section>
    )
}

export default Voting
