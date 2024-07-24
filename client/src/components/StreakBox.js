import React from 'react'
import MyResponsiveCalendar from './MyResponsiveCalendar'
import { changeDateFormat } from '@/lib/utils'



export default function StreakBox({ data, task }) {
    console.log(task)
    return (
        <div className='mt-6 px-4 w-full h-full'>
            <h1 className='text-white text-4xl'>STREAK</h1>
            <div className='bg-black mt-2 border-gray-400 border shadow-[5px_5px] shadow-gray-400  text-white'>
                <div className='border-b-2 p-2 text-sm'>
                    <div className='  flex justify-around'>
                        <h3 >Current-Streak - {task?.currentStreak?.days} days  </h3> <span className=' text-gray-400'>({task.currentStreak && changeDateFormat(task.currentStreak.start)} to {task.currentStreak && changeDateFormat(task.currentStreak.end)})</span>
                    </div>
                    <div className='  flex justify-around'>
                        <h3>Maximum-Streak - {task?.maxStreak?.days} days   </h3> <span className=' text-gray-400'>({task.currentStreak && changeDateFormat(task.maxStreak.start)} to {task.maxStreak && changeDateFormat(task.maxStreak.end)})</span>
                    </div>
                </div>
                <div className=" w-full overflow-x-auto">
                    <div className=" bg-black  h-80 min-w-[1800px]">
                        <MyResponsiveCalendar data={data} />
                    </div>
                </div>
            </div>
        </div>
    )
}
