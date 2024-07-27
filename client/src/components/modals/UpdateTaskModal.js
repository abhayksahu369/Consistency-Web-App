import axios from 'axios';
import React, { useState } from 'react'

export default function UpdateTaskModal({handleModal,taskId}) {
 const[hours,setHours]=useState(0);
 
 const handleTaskDone=async()=>{
  const result= await axios.put(`http://localhost:5000/task/update-task-hours/${taskId}`,{hours,isDone:true,},{
    withCredentials:true
  })
    console.log(result);
    window.location.href=window.location.pathname

 }

 
  return (
    <div className='w-screen h-full bg-opacity-75 bg-black absolute flex justify-center pt-24'>
        <div className='bg-black w-4/5 h-64 fixed text-white border-gray-600 border rounded-2xl shadow-[6px_5px] shadow-gray-600'>
           <h1 className='text-white text-4xl font-black mt-4 text-center'>Enter hours of task done</h1>
           <input type="text" className='bg-gray-900 border border-white w-1/4' value={hours} onChange={(e)=>{setHours(e.target.value)}}></input> <input type="text" className='bg-gray-900 border border-white w-1/4'></input> 
           <br/>
           <button className='bg-gray-900 border border-white ' onClick={()=>handleModal("")}>CANCEL</button>
           <button className='bg-gray-900 border border-white '  onClick={handleTaskDone}>MARK AS DONE</button>
        </div>

    </div>
  )
}

