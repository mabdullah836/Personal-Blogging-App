import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import PageHeader from '../../Components/PageHeader/PageHeader'
import { getSingleUserData } from '../../Config/firebase/firebaseMethod'
import Card from '../../Components/Card/Card'
import { Spinner } from 'react-bootstrap'


const SingleUser = () => {
    const [userData ,setUserData] = useState([])
    const params = useParams()
    useEffect(()=>{
        getSingleUserData("Blogs-data",params.id)
        .then((res)=>{
                // console.log(res);
                setUserData(res)                
    }).catch((err)=>{
        console.log(err);
        
    })
    })

    return (
        <div>
         <PageHeader btnName="< Back to all blogs"/>
         <div className='container'>
         {userData.length > 0 ? (
              userData.map((blog, i) => {
                const date = new Date(blog.timestamp.seconds * 1000); 
                const day = date.toLocaleDateString(); 
      
                return (
                  <Card 
                    key={i} 
                    title={blog.title} 
                    description={blog.description} 
                    day={day} 
                    author={blog.authorName}
                    display={true}
                  />
                );
              })
            ) :
            <div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"70vh"}}>
            <Spinner animation="border" />
          </div>
            }
         </div>
        </div>
    )
}

export default SingleUser