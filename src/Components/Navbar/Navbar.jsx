import React, { useEffect, useState } from 'react'
import styles from "./Navbar.module.css"
import { useLocation, useNavigate } from 'react-router-dom';
import { auth, signOutUser } from '../../Config/firebase/firebaseMethod';
import Swal from 'sweetalert2';
const Navbar = () => {
  const [btnName, setBtnName] = useState("Sign Up");
  const navigate = useNavigate()
  const location = useLocation();
  const currentPath = location.pathname;

  function handelNavigation() {

    if (currentPath === "/signup") {
      navigate("/login")
    } else if (currentPath === "/login") {
      navigate("/signup")

    } else if(currentPath === "/"){
        navigate("/login")
    
    }else{
      Swal.fire({
        title: "Are you sure you want to log out?",
        text: "Any unsaved changes will be lost!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#7749F8",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, log me out!"
      }).then((result) => {
        if (result.isConfirmed) {
          signOutUser()
            .then((res) => {
              navigate("/login")
            }).catch((err) => {
              console.log(err);

            })
          Swal.fire({
            title: "Logged Out!",
            text: "You have been logged out successfully.",
            icon: "success"
          });
        }
      });
    }
  }


  useEffect(() => {
    switch (currentPath) {
      case "/":
        setBtnName("Login");
        break;
      case "/signup":
        setBtnName("Login");
        break;
      case "/login":
        setBtnName("Sign Up");
        break;
      case "/dashboard":
        setBtnName("Logout");
        break;

    }
  }, [currentPath]);



  return (
    <div style={{ backgroundColor: "#7749F8" }} className='main'>
      <div className={styles.navbar}>
        <h5 >Personal Blogging App</h5>
        <div >
          <button onClick={()=> navigate("/profile")} className={styles.profile_btn}>{
            auth.currentUser && auth.currentUser.displayName
            
            }</button>
          <button onClick={handelNavigation} className={styles.nav_btn}>{btnName}</button>
          
        </div>
      </div>
    </div>
  )
}

export default Navbar