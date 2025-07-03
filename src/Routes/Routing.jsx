import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from '../Pages/AdminSignin'
import Home from '../Pages/Home'
import HomeLogin from '../Pages/Admin/HomeLogin'
import Logout from '../Pages/Admin/Logout'
import PasswordChange from '../Pages/Admin/PasswordChange'
import NavbarAdmin from '../Components/NavbarAdmin'
import TeamList from '../Pages/Admin/Team/TeamList'
import AddTeam from '../Pages/Admin/Team/AddTeam'
import EditTeam from '../Pages/Admin/Team/EditTeam'
import AdminSignin from '../Pages/AdminSignin'


const Routing = () => {
  return (
    <div>
        <BrowserRouter>
        <Routes>
        
           <Route path='/' element={<Home/>} />
            <Route path='/login' element={<AdminSignin/>}/>
            {/* private route */}
            <Route path='/home' element={<HomeLogin/>}/>
            <Route path='/team' element={<TeamList/>}/>
            <Route path='/addTeam' element={<AddTeam/>}/>
            <Route path='/editTeam' element={<EditTeam/>}/>
            <Route path='/navbaradmin' element={<NavbarAdmin/>}/>
            <Route path='/password' element={<PasswordChange/>}/>
            <Route path='/logout' element={<Logout/>}/>
        </Routes>
        </BrowserRouter>
    </div>
  )
}

export default Routing