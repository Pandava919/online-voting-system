import React from 'react'
import '../../Styles/Navbar.css'
import { NavLink } from 'react-router-dom'

const UserNAvbar = () => {
    return (
        <div className='nav-container'>
            <div className="nav-items">
                <NavLink to='voting'>Home</NavLink>
                <NavLink to='/login'>Logout</NavLink>
            </div>
        </div>
    )
}

export default UserNAvbar
