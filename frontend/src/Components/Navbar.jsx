import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import '../Styles/Navbar.css'

const Navbar = () => {
  return (
    <div className='nav-container'>
      <div className="nav-items">
        <NavLink to='admin'>Home</NavLink>
        <NavLink to='add-election'>Add Election</NavLink>
        <NavLink to='add-candidates'>Add Candidate</NavLink>
        <NavLink to='/login'>Logout</NavLink>
      </div>
    </div>
  )
}

export default Navbar
