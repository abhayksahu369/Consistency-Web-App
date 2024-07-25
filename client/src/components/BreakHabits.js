import React from 'react'
import TaskCard from "@/components/TaskCard";

export default function BreakHabits({ badTasks ,handleModal}) {
    return (
        <div id="bad-habits" className=' bg-gray-900 flex flex-col items-center mt-3'>
            {

                badTasks.length > 0 ? (
                    badTasks.map((task) => {
                        return <TaskCard key={task._id} task={task} handleModal={handleModal} />
                    })
                ) :
                    (
                        <div className='text-white'>No habits</div>
                    )
            }
    </div>
    )
}
