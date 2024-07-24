"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import TaskCard from "@/components/TaskCard";
import BuildHabits from "@/components/BuildHabits";
import BreakHabits from "@/components/BreakHabits";
import CreateTaskModal from "@/components/CreateTaskModal";



export default function HomePage() {
  const [tasks, setTasks] = useState([])
  const [goodTasks, setGoodTasks] = useState([])
  const [badTasks, setBadTasks] = useState([])
  const [tab,setTab]=useState("build-habits")
  const [showModal,setShowModal]=useState(false)
   


  useEffect(() => {
    // getTasks()
    setGoodTasks([1,23,242,42,1,7,8,8,8])
    setBadTasks([1])
  }, [])

  // useEffect(() => {
  //   const good = tasks.filter((task) => {
  //     return task?.type == "good"
  //   })
  //   const bad = tasks.filter((task) => {
  //     return task?.type == "bad"
  //   })
  //   setGoodTasks(good)
  //   setBadTasks(bad)
  // }, [tasks])

  // const getTasks = async () => {
  //   let result = await axios.get("http://localhost:5000/task/get-all-tasks", {
  //     withCredentials: true
  //   })
  //   setTasks(result.data.tasks)

  // }
  const handleModal=()=>{
      setShowModal(!showModal)
  }


  return (
    <div className="h-full w-full bg-gray-900 relative ">
      
      {
        showModal?<CreateTaskModal handleModal={handleModal}/>:<></>
      }
      <div className=" pl-5 ">
        <h1 className="text-7xl  text-white font-extrabold" >Gear Up!</h1>
        <h3  className=" text-white  text-m font-thin">Your daily tasks</h3>
      </div>
      <div className=" mt-6 h-10 flex text-white font-bold cursor-pointer" >
        <button className={ `${tab==="build-habits"?"font-extrabold ":"font-semibold text-gray-400"} h-full w-1/2 flex items-center justify-center border-r `} onClick={()=>setTab("build-habits")}> BUILD HABITS</button>
        <button className={ `${tab==="break-habits"?"font-extrabold ":"font-semibold text-gray-400"} h-full w-1/2 flex items-center justify-center border-l `} onClick={()=>setTab("break-habits")}>BREAK HABITS</button>
       

      </div>
      
      
      {
        tab==="build-habits"?<BuildHabits goodTasks={goodTasks} handleModal={handleModal}/>:<BreakHabits badTasks={badTasks} handleModal={handleModal}/>
      }
    
        
    
     
    </div>
  );
}
