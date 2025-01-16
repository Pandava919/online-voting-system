import React from 'react'
import Login from './Components/Login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignUp from './Components/SignUp'
import Admin from './Components/Admin/Admin'
import AddElection from './Components/Admin/AddElection'
import AdminDashboard from './Components/Admin/AdminDashboard'
import AddCandidates from './Components/Admin/AddCandidates'
import Voting from './Components/User/Voting'
import VotingDashboard from './Components/User/VotingDashboard'

const App = () => {
  return (
    <div>
      <BrowserRouter future={{ v7_relativeSplatPath: true }}>
        {/* <Login /> */}
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          <Route path='/voting' element={<Voting />} >
            <Route index element={<VotingDashboard />} />
            <Route path='voting' element={<VotingDashboard />} />
          </Route>
          <Route path='/Admin' element={<Admin />} >
            <Route index element={<AdminDashboard />} />
            <Route path='admin' element={<AdminDashboard />} />
            <Route path='add-election' element={<AddElection />} />
            <Route path='add-candidates' element={<AddCandidates />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
