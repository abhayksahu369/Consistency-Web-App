"use client"
import { useState } from "react"
import CreateTaskModal from "./modals/CreateTaskModal"



export default function Footer() {
    const[openModal,setOpenModal]=useState(false)
    const handleModal=()=>{
        setOpenModal(!openModal)
    }
  return (
    <>
    {openModal?<CreateTaskModal handleModal={handleModal}/>:<></>}
    <footer className='flex justify-between items-center bg-black h-16 px-5 text-white w-full fixed bottom-0  '>
       <h2 onClick={handleModal}>ADD HABIT</h2>
    </footer>
    </>
  )
}
