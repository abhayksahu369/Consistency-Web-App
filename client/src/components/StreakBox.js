import React from 'react'
import MyResponsiveCalendar from './MyResponsiveCalendar'


export default function StreakBox({data}) {
    return (
        <div className='mt-6 px-4 w-full'>
            <h1 className='text-white text-4xl'>STREAK</h1>
            <div className='bg-black mt-2 border-gray-400 border shadow-[5px_5px] shadow-gray-400  text-white'>
                <div className='border-b-2 p-2 '>
                    <h3>Current-Streak - 29 days</h3>
                    <h3>Maximum-Streak - 144 days</h3>
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
