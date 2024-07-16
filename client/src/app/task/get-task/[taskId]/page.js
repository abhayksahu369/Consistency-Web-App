"use client"
import TaskPage from '@/components/TaskPage'
import { useParams } from 'next/navigation'


export default function getTask() {
    const {taskId}=useParams()

  return (
    <TaskPage taskId={taskId}/>
  )
}
