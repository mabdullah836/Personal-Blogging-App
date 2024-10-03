import React, { useState } from 'react'
import lOGO from '../../assets/blog-logo.png';
import styles from "./Card.module.css"
import { useNavigate } from 'react-router-dom';
import { deleteDocument, updateDocument } from '../../Config/firebase/firebaseMethod';
import Swal from 'sweetalert2';
// import { reload } from 'firebase/auth';

const Card = ({title,author,description,day,btnName,id,display,docId,index,deleteCallback}) => {
    const navigate = useNavigate()
    const [showBlog , setShowBlog] = useState(true)
    const [formData ,setFormData] = useState({
      title: "",
      description: ""
    })
   function handleSigleUser() {
    navigate(`/singleuser/${id}`)
   }

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

   function handleDeleteDoc(){
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#7749F8",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      deleteDocument(docId,"Blogs-data")
      .then((res)=>{
        deleteCallback(index)
        if (result.isConfirmed) {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
        }
        
      }).catch((err)=>{
          console.log(err);
          
      })
      
    })}

    function handleEditDoc(e) {
      e.preventDefault()
      if(formData.title === "" || formData.description === ""){
        Toast.fire({
          icon: "warning",
          title: "Fields are empty"
        });
        return
      }
      updateDocument(formData,docId,"Blogs-data")
      .then((res)=>{
        Toast.fire({
          icon: "success",
          title: "Edited Successfully"
        });
          setShowBlog(true)  
          setFormData({
            title : "",
            description:""
          })        
      }).catch((err)=>{
        console.log(err);
        
      })
    }
    

  return (
    <article className={styles.blog}>
    {
      showBlog ? <>
       <div className={styles.blog_items}>
      <div className={styles.blog_img}>
        <img src={lOGO} alt="Blog Logo" />
      </div>
      <div className={styles.blog_title}>
        <h6>{title}</h6>
        <p className={styles.blog_subTitle}>{author} - {day}</p>
      </div>
    </div>
    <div className={styles.blog_description}>
      <p>{description}</p>

    </div>
    <div className={styles.blog_btn}>
        {btnName  ? 
        <button onClick={handleSigleUser}>{btnName}</button>
        :
        display  ? null :
       <>
        <button onClick={()=>handleDeleteDoc()}>Delete</button>
        <button onClick={()=>{ setShowBlog(false)}}>Edit</button>
       </>}
    </div> 
      
      </>
      :
     <>
       <form onSubmit={handleEditDoc} className={styles.textArea}>
          <input
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Title"
            type="text"
          />
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Description"
          />
          <div className={styles.textArea_btn}>
            <button type="submit">Save Changes</button>
          </div>
        </form>

     
     </>
    }
    
  </article>
  )
}

export default Card