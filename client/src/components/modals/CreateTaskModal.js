"use client"
import axios from 'axios'
import { useRouter } from 'next/navigation'



import React, { useState } from 'react'


export default function CreateTaskModal({ handleModal }) {
    const [task, setTask] = useState({ name: "", description: "", type: "" })
    const router=useRouter();
    
    
    const handleCreateTask = async() => {
        console.log(task)
        if(!(task.name&&task.description&&task.type)){
            return window.alert("all fields are necessary.")
        }
        const result=await axios.post("http://localhost:5000/task/create-task",task,{
            withCredentials:true
        })
        if(result?.data?.success){
            window.alert("task created")
            window.location.href="/"
        }
        console.log(result.data.task)
        
        
 
        
    }
    
    
    return (
        <div className='w-screen h-full bg-opacity-75 bg-black absolute flex justify-center pt-24'>
            <div className='bg-black w-4/5 h-64 fixed text-white border-gray-600 border rounded-2xl shadow-[6px_5px] shadow-gray-600'>
                <h1 className='text-white text-4xl font-black mt-4 text-center'>CREATE TASK</h1>
                <input type="text" value={task.name} onChange={(e) => { setTask({ ...task, name: e.target.value }) }} placeholder="task name" className='bg-gray-900 border border-white w-4/5'></input>
                <input type="text" value={task.description} onChange={(e) => { setTask({ ...task, description: e.target.value }) }} placeholder='task description' className='bg-gray-900 border border-white w-4/5'></input>
                <select value={task.type} onChange={(e)=>{setTask({...task,type:e.target.value})}} className='bg-black'>
                    <option value="">CHOOSE TYPE</option>
                    <option value="good">BUILD HABIT</option>
                    <option value="bad">BREAK HABIT</option>
                </select>
                <br />
                <button className='bg-gray-900 border border-white ' onClick={ handleModal}>CANCEL</button>
                
                <button className='bg-gray-900 border border-white ' onClick={handleCreateTask}>CREATE TASK</button>
            </div>

        </div>
    )
}
