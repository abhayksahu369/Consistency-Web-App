import React from 'react'

export default function CreateTaskModal({handleModal}) {
  return (
    <div className='w-screen h-full bg-opacity-75 bg-black absolute flex justify-center pt-24'>
        <div className='bg-black w-4/5 h-64 fixed text-white border-gray-600 border rounded-2xl shadow-[6px_5px] shadow-gray-600'>
           <h1 className='text-white text-4xl font-black mt-4 text-center'>Enter hours of task done</h1>
           <input type="text" className='bg-gray-900 border border-white w-1/4'></input> <input type="text" className='bg-gray-900 border border-white w-1/4'></input> 
           <br/>
           <button className='bg-gray-900 border border-white ' onClick={handleModal}>CANCEL</button>
           <button className='bg-gray-900 border border-white ' >MARK AS DONE</button>
        </div>

    </div>
  )
}
