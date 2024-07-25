import React from 'react'
import TaskCard from "@/components/TaskCard";
import { Key } from 'lucide-react';

export default function BuildHabits({goodTasks,handleModal}) {
  return (
    <div  id="good-habits" className=" bg-gray-900 flex flex-col items-center mt-3 ">
        {
        goodTasks.length > 0 ? (
          goodTasks.map((task) => {
            return <TaskCard key={task._id} task={task} handleModal={handleModal}/>
          })) :
          (
            <div className='text-white '>No habits</div>
          )
      }
    </div>
  )
}
