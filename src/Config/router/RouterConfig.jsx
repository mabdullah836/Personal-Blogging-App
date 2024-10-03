import React from 'react'
import {  Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import Login from '../../Pages/Login/Login'
import Navbar from '../../Components/Navbar/Navbar'
import SignUp from '../../Pages/Sigup/SignUp'
import Dashboard from '../../Pages/Dashboard/Dashboard'
import ProtectedRoutes from './ProtectedRoutes'
import Home from '../../Pages/Home/Home'
import SingleUser from '../../Pages/SingleUser/SingleUser'
import Profile from '../../Pages/Profile/Profile'
import { auth } from '../firebase/firebaseMethod'

const RouterConfig = () => {
  const navigate = useNavigate()
  return (
    <>
    <Navbar/>
    <Routes>
    <Route path='/' element={ auth.currentUser ? navigate("/dashboard")  : <Home/>} />
    <Route path='/signup' element={<SignUp/>} />
    <Route path='/login' element={<Login/>} />
    <Route path='/singleuser/:id' element={<SingleUser/>} />
    <Route path='/profile' element={<Profile/>} />
    <Route path='/dashboard' element={
       <ProtectedRoutes>
         <Dashboard/>
       </ProtectedRoutes>
      } />
      
    </Routes>
    
    
    </>
  )
}

export default RouterConfig