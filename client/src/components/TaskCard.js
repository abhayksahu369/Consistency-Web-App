import Link from "next/link"


export default function TaskCard({task}) {
  return (
    <Link href={`task/get-task/${task._id}`}>
      <div >
      {task.name}
      </div>
    </Link>
    
    
  )
}
