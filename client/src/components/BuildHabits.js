import React from 'react'
import TaskCard from "@/components/TaskCard";

export default function BuildHabits({goodTasks}) {
  return (
    <div id="good-habits" className=" bg-gray-900 flex flex-col items-center mt-3 ">
        {
        goodTasks.length > 0 ? (
          goodTasks.map((task) => {
            return <> <TaskCard  task={task} /></>
          })) :
          (
            <div className='text-white '>No habits</div>
          )
      }
    </div>
  )
}
