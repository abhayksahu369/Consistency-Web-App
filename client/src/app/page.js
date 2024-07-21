"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import TaskCard from "@/components/TaskCard";


export default function HomePage() {
  const [tasks, setTasks] = useState([])
  const [goodTasks, setGoodTasks] = useState([])
  const [badTasks, setBadTasks] = useState([])


  useEffect(() => {
    getTasks()
  }, [])

  useEffect(() => {
    const good = tasks.filter((task) => {
      return task?.type == "good"
    })
    const bad = tasks.filter((task) => {
      return task?.type == "bad"
    })
    setGoodTasks(good)
    setBadTasks(bad)
  }, [tasks])

  const getTasks = async () => {
    let result = await axios.get("http://localhost:5000/task/get-all-tasks", {
      withCredentials: true
    })
    setTasks(result.data.tasks)

  }


  return (
    <div className="h-full w-full bg-blue-400  flex flex-col  align-middle">
      <div className="bg-black pl-5 mt-5">
        <h1 className="text-6xl  bg-black  text-white font-extrabold" >Gear Up!</h1>
        <h3  className=" text-white my-2 text-m font-thin">Your daily tasks</h3>
      </div>

      {
        goodTasks.length > 0 ? (
          goodTasks.map((task) => {
            return <> <TaskCard key={task._id} task={task} /></>
          })) :
          (
            <></>
          )
      }

      {

        badTasks.length > 0 ? (
          badTasks.map((task) => {
            return <TaskCard key={task._id} task={task} />
          })
        ) :
          (
            <></>
          )
      }
    </div>
  );
}
