import React from 'react'

export default function BreakHabits({ badTasks }) {
    return (
        <div id="bad-habits" className=' bg-gray-900 flex flex-col items-center mt-3'>
            {

                badTasks.length > 0 ? (
                    badTasks.map((task) => {
                        return <TaskCard key={task._id} task={task} />
                    })
                ) :
                    (
                        <div className='text-white'>no habits</div>
                    )
            }
    </div>
    )
}
