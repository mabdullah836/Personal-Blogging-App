import React, { useEffect, useState } from 'react'
import PageHeader from '../../Components/PageHeader/PageHeader'
import { getAllData } from '../../Config/firebase/firebaseMethod'
import Card from '../../Components/Card/Card'
import { Spinner } from 'react-bootstrap'

const Home = () => {
    const [greetings,setGreetings] = useState("")
    const [allBlogsData,setAllBlogsData] = useState([])
    const hours = new Date().getHours()
    useEffect(()=>{
        if(hours >= 0 && hours <= 12){
            setGreetings("Good Morning");
            
        }else if(hours > 12 && hours <= 17){
                setGreetings("Good Afternoon");
                
        }else if(hours > 17 && hours <= 21){
            setGreetings("Good Evening");
            
        }else{
            setGreetings("Good Night");
        }
    },[])
    useEffect(()=>{
        getAllData("Blogs-data")
        .then((res)=>{
          const uniqueAuthors = {};
          const uniqueBlogs = res.filter(blog => {
              if (!uniqueAuthors[blog.authorName]) {
                  uniqueAuthors[blog.authorName] = true; 
                  return true; 
              }
              return false; 
          });
          setAllBlogsData(uniqueBlogs)
          
        }).catch((err)=>{
            console.log(err);
          
        })
    },[])
    
  return (
    <div>
        <PageHeader  name={`${greetings} Readers!`}/>
        <div style={{marginTop:"80px"}} className='container'>
        {allBlogsData.length > 0 ? (
              allBlogsData.map((blog, i) => {
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
                    btnName="See all from this user"
                  />
                );
              })
            ): 
            <div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"50vh"}}>
              <Spinner animation="border" />
            </div>
            } 
        </div>
    </div>
  )
}

export default Home