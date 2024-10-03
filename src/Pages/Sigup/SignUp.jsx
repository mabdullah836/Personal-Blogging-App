import React, { useState } from 'react'
import PageHeader from '../../Components/PageHeader/PageHeader'
import styles from "./Signup.module.css"
import {  signUpUser } from '../../Config/firebase/firebaseMethod'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
const SignUp = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  })

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 1000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });


  function handelSignUpForm(e) {
    e.preventDefault()
    signUpUser(formData)
      .then((res) => {
       
        setFormData({
          first_name: "",
          last_name: "",
          email: "",
          password: "",
        })
        Toast.fire({
          icon: "success",
          title: "Signed in successfully"
        });
        
        setTimeout(()=>{
            navigate("/dashboard")
        },2000)
      }).catch((err) => {
        Toast.fire({
          icon: "error",
          title: err.data
        });
      })
  }



  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  return (
    <div>
      <PageHeader name={"Sign Up"} />
      <div className={styles.container}>
        <form onSubmit={handelSignUpForm} className={styles.form}>
          {[
            { name: "first_name", type: "text", placeholder: "First Name" },
            { name: "last_name", type: "text", placeholder: "last Name" },
            { name: "email", type: "email", placeholder: "Email" },
            { name: "password", type: "password", placeholder: "Password" },
          ].map(({ name, type, placeholder }) => (
            <div className={styles.input} key={name}>
              <input
                type={type}
                name={name}
                required
                value={formData[name]}
                onChange={handleChange}
                placeholder={placeholder}
                aria-label={placeholder}
              />
            </div>
          ))}
          <div style={{ textAlign: "center" }}>
            <button type='submit' className={styles.signUp_Btn}>Sign Up</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignUp