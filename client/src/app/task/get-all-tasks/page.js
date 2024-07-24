"use client"

import MyResponsiveCalendar from '@/components/MyResponsiveCalendar'
import React, { useState } from 'react'

export default function AllTaskPage() {
    const[data,setData]=useState([])
    const[task,setTask]=useState({})
  return (
    <div className='text-white h-full'>
        <div>
            <h1>task name</h1>
            <div className='h-44'>
            <MyResponsiveCalendar data={data}/>
            
            </div>
    
            
            
        </div>
        
    </div>

  )
}
