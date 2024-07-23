import React from 'react'

export default function LogsBox({ logs }) {
    return (
        <div className='mt-9 mb-7 px-4 w-full'>
            <h1 className='text-white text-4xl'>TASK PROGRESS</h1>
            <div className='bg-black mt-2 border-gray-400 border shadow-[5px_5px] shadow-gray-400  text-white'>
                <div className='border-b-4 p-2 flex justify-between  '>
                    <h3 className='w-1/2  text-center'>Date</h3>
                    <h3 className='w-1/2  text-center'>Hours</h3>
                </div>

                <div className='h-44 overflow-y-auto'>
                
                        {
                            logs.map(log => (
                                <div className='border-b p-2 flex justify-between text-gray-400 '>
                                    <h3 className='w-1/2  text-center'>{log.date}</h3>
                                    <h3 className='w-1/2  text-center'>{log.hours}</h3>
                                </div>

                            ))
                        }
                    
                </div>



            </div>

        </div>
    )
}
