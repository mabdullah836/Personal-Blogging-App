import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const PageHeader = ({ name, btnName }) => {
  const navigate = useNavigate()
   const location = useLocation();
  const currentPath = location.pathname;

  
  const contentStyle = {
    divContent: {
      backgroundColor: "white",
      width: "100%",
      margin: "0 auto",
      padding: "15px",
    },
    btnStyle: {
      border: "none",
      outline: "none",
      cursor: "pointer",
      color: "#7749F8",
      background: "transparent",
      fontSize: '30px',
      marginLeft: "10%",
      fontWeight: "bold",

    }

  }
  return (
    <div style={contentStyle.divContent} >
      {
        btnName ? <button onClick={() => currentPath === "/profile" ? navigate("/dashboard") : navigate("/")} style={contentStyle.btnStyle}>{btnName}</button> :
          <h3 style={{ marginLeft: "10%", fontWeight: "bold" }} >{name}</h3>
      }
    </div>
  )
}

export default PageHeader