import React, {  useEffect, useState } from 'react'
import {  useNavigate } from 'react-router-dom';
import { auth } from '../firebase/firebaseMethod';
import { onAuthStateChanged } from 'firebase/auth';
import { Spinner } from 'react-bootstrap';

const ProtectedRoutes = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const navigate = useNavigate()

    
    onAuthStateChanged(auth, (user) => {
        if(!user) {
            navigate("/login");
            return
        }
        setIsLoggedIn(true);
    });
    return (
        <>
           {isLoggedIn ? children : 
           <div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh"}}>
            <Spinner animation="border" />
           </div> }
        </>
    )
}

export default ProtectedRoutes