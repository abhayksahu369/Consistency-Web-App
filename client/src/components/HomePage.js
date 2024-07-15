"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import TaskCard from "./TaskCard";


export default function HomePage() {
 const [tasks,setTasks]=useState([])
  
  
  useEffect(()=>{
    getTasks()
  },[])
  
  
  
  const getTasks=async()=>{
        let result=await axios.get("http://localhost:5000/task/get-all-tasks",{
          withCredentials:true
        })
        console.log(result)
        console.log(result.data.tasks)
        setTasks(result.data.tasks)
    
  }


  return (
    <div>
      <h1>Tasks</h1>
      {
           console.log(tasks)
      }
      {
     
        
        tasks.length>0?(
            tasks.map((task)=>{
                return <TaskCard key={task._id} task={task}/>
            })):
            (
                <></>
            )
      }
    </div>
  );
}
