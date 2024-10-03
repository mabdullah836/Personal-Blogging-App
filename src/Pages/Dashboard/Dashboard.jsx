import React, { useEffect, useState } from 'react';
import PageHeader from '../../Components/PageHeader/PageHeader';
import styles from './dashboard.module.css';
import Card from '../../Components/Card/Card';
import { auth, getData, sendData } from '../../Config/firebase/firebaseMethod';
import Swal from 'sweetalert2';
import {  Timestamp  } from 'firebase/firestore';

const Dashboard = () => {
  const [blogsData, setBlogsData] = useState([]);
  const [reload, setReload] = useState(false);
 
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    userId: auth.currentUser.uid,
    timestamp: Timestamp.fromDate(new Date()),
    authorName : auth.currentUser.displayName,

  });

  useEffect(() => {
    getData("Blogs-data")
      .then((res) => {
        setBlogsData(res); 
      })
      .catch((err) => {
        console.log("err =>>",err);
      });
  }, [ handlePublish , reload]);
  

  function handlePublish(e) {
    e.preventDefault();
    sendData(formData, "Blogs-data")
      .then((res) => {
        setFormData({
          title: "",
          description: "",
        });
        Toast.fire({
          icon: "success",
          title: "Blog Published Successfully",
        });
      })
      .catch((err) => {
        Toast.fire({
          icon: "error",
          title: err.data
        });
      });
  }
  function handleDelete(i) {
    setBlogsData(blogsData.splice(i,1))
   
    
    
  }
  
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });
  return (
    <div>
      <PageHeader name="Dashboard" />
      <div className={`container  ${styles.container}`}>
        <form onSubmit={handlePublish} className={styles.textArea}>
          <input
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Title"
            type="text"
          />
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="What is in your mind?"
          />
          <div className={styles.textArea_btn}>
            <button type="submit">Publish Blog</button>
          </div>
        </form>
        <section className={styles.blogs_container}>
          <h3>My Blogs</h3>
          
            {blogsData.length > 0 ? (
              blogsData.map((blog, i) => {
                const date = new Date(blog.timestamp.seconds * 1000); 
                const day = date.toLocaleDateString(); 
      
                return (
                  <Card 
                    key={i} 
                    title={blog.title} 
                    description={blog.description} 
                    day={day} 
                    author={blog.authorName}
                    id={blog.userId}
                    docId={blog.documentId}
                    deleteCallback={handleDelete}
                    index={i}
                  />
                );
              })
            ) :
            <div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"50vh"}}>
            {/* <Spinner animation="border" /> */}
            <h2>
              No Blog found
            </h2>
          </div>
            }
          
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
