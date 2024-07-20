"use client"

import { useEffect, useState } from "react"
import MyResponsiveCalendar from "@/components/MyResponsiveCalendar"
import axios from "axios"
import { useParams } from "next/navigation"


export default function TaskPage() {
  const [data, setData] = useState([])
  const [task, setTask] = useState({})
  const [logs, setLogs] = useState([])

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
    console.log(result)
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
  return (
    <div className="w-full flex justify-center">
      {data ? (
        <div className="flex flex-col items-center w-full">
          <span className="mb-4">{task.name}</span>
          <div className="w-full overflow-x-auto">
            <div className="inline-block h-80 min-w-[1800px]"> 
              <MyResponsiveCalendar data={data} />
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
