"use client"

import { useEffect, useState } from "react"
import MyResponsiveCalendar from "./MyResponsiveCalendar"
import axios from "axios"


export default function TaskPage({taskId}) {
  const[data,setData]=useState([])
  const[task,setTask]=useState({})
  const[logs,setLogs]=useState([])
  
  useEffect(()=>{
    getTasks()
  },[])

  useEffect(()=>{
    let result=logs.map((log)=>{
      return {value:log.hours,day:log.date}
    })
    // result= JSON.stringify(result)
    console.log(result)
    setData(result)
  },[logs])
  
  const getTasks=async()=>{
    let result=await axios.get(`http://localhost:5000/task/get-task/${taskId}`,{
      withCredentials:true
    })
    setTask(result.data.task)
    console.log(result.data.task)
    setLogs(result.data.task.allLogs)

}
  return (
    <>
    {
      data?(
        <>
        {task.name}
        <div style={{height:"200px"}}><MyResponsiveCalendar data={data}/></div>
        </>
      ):(
        <></>
      )
    }
    </>
  )
}
