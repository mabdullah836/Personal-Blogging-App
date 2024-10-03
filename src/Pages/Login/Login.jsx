import React, { useState } from 'react'
import styles from "./login.module.css"
import PageHeader from '../../Components/PageHeader/PageHeader'
import { signInUser } from '../../Config/firebase/firebaseMethod'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
const SignUp = () => {
  const navigate = useNavigate() 
  const [formData, setFormData] = useState({

    email: "",
    password: "",
  })
  
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });


  function handelLoginForm(e) {
    e.preventDefault()
    // console.log(formData);
    signInUser(formData).then((res) => {
         Toast.fire({
          icon: "success",
          title: "logged in successfully"
        });
        navigate("/dashboard")
    }).catch((err)=>{
      Toast.fire({
        icon: "error",
        title: "Invalid Cerdentials"
      });
      
    })

  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }


  return (
    <div>
      <PageHeader name={"Login"} />
      <div className={styles.container}>
        <form onSubmit={handelLoginForm} className={styles.form}>
          {[

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
            <button type='submit' className={styles.login_Btn}>Login</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignUp