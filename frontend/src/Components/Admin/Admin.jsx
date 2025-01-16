import React from 'react'
import Navbar from '../Navbar'
import '../../Styles/Admin.css'
import logo from '../../assets/logo.gif'
import { Outlet } from 'react-router-dom'
const Admin = () => {
    return (
        <section className='admin-section'>
            <div className="top-section">
                <div className="top-container">
                    <div className="logo-container">
                        <img src={logo} alt="" />
                    </div>
                    <div className="title-container">
                        <h1>ONLINE VOTING SYSTEM</h1>
                        <span>--Admin</span>
                    </div>
                </div>
            </div>
            <div className="navbar">
                <Navbar />
            </div>
            <div className="main-section">
                <Outlet />
            </div>
        </section>
    )
}

export default Admin
