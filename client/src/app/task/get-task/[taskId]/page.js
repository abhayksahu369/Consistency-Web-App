"use client"

import { useEffect, useState } from "react"
import MyResponsiveCalendar from "@/components/MyResponsiveCalendar"
import axios from "axios"
import { useParams } from "next/navigation"
import StreakBox from "@/components/StreakBox"
import LogsBox from "@/components/LogsBox"
import UpdateTaskModal from "@/components/modals/UpdateTaskModal"


export default function TaskPage() {
  const [data, setData] = useState([])
  const [task, setTask] = useState({})
  const [logs, setLogs] = useState([])
  const[showModal,setShowModal]=useState(false)

  const { taskId } = useParams();

  useEffect(() => {
    if (taskId) {
      getTasks()
    }

  }, [taskId])

  useEffect(() => {
    let result = logs.map((log) => {
      return { value: log.hours, day: log.date }
    })
    setData(result)
  }, [logs])

  const getTasks = async () => {
    let result = await axios.get(`http://localhost:5000/task/get-task/${taskId}`, {
      withCredentials: true
    })
    setTask(result.data.task)
    console.log(result.data.task)
    setLogs(result.data.task.allLogs)

  }

  const handleModal=()=>{
      setShowModal(!showModal)
  }


  return (
    <div id="taskpage" className=" w-full pb-20">
      {
        showModal?<UpdateTaskModal handleModal={handleModal} taskId={task._id}/>:<></>
      }
      <div id="taskNameAndDesc" className="mt-3 px-4">
          <h1 className="text-white capitalize text-6xl break-words ">{task.name}</h1>
          <h5 className="text-gray-500 text-left break-words">{task.description}</h5>
          <h3 className="text-white text-right mt-6" onClick={()=>handleModal()}>{task?.todayLog?"done":"pending.."}</h3>
      </div>
      <StreakBox data={data} task={task}/>
      <LogsBox logs={logs}/>

    </div>
  );
}





// {data ? (
//   <div className="flex flex-col items-center w-full">
//     <span className="mb-4 text-white">{task.name}</span>
//     <div className="w-full overflow-x-auto">
//       <div className="inline-block h-80 min-w-[1800px]"> 
//         <MyResponsiveCalendar data={data} />
//       </div>
//     </div>
//   </div>
// ) : (
//   <></>
// )}
