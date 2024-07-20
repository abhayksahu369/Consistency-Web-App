"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import TaskCard from "@/components/TaskCard";


export default function HomePage() {
 const [tasks,setTasks]=useState([])
 const [goodTasks,setGoodTasks]=useState([])
 const [badTasks,setBadTasks]=useState([])
  
  
  useEffect(()=>{
    getTasks()
  },[])
  
  useEffect(()=>{
    const good=tasks.filter((task)=>{
      return task?.type=="good"
    })
    const bad=tasks.filter((task)=>{
      return task?.type=="bad"
    })
    setGoodTasks(good)
    setBadTasks(bad)
  },[tasks])
  
  const getTasks=async()=>{
        let result=await axios.get("http://localhost:5000/task/get-all-tasks",{
          withCredentials:true
        })
        setTasks(result.data.tasks)
    
  }


  return (
    <div>
      <h1>Tasks</h1>
      {
    
       goodTasks.length>0?(
            goodTasks.map((task)=>{
                return <TaskCard key={task._id} task={task}/>
            })):
            (
                <></>
            )
      }
      
      {
    
        badTasks.length>0?(
             badTasks.map((task)=>{
                 return <TaskCard key={task._id} task={task}/>
             })
             ):
             (
                 <></>
             )
       }
    </div>
  );
}
