import Link from "next/link"


export default function TaskCard({ task }) {
  return (
    <div className="bg-yellow-300 w-full h-20 my-4 flex ">
      <div className="bg-purple-500 w-1/6 h-full flex items-center justify-center text-yellow-50">
        <i className="ri-time-line ri-2x"></i>
      </div>
      <div className="bg-green-500 w-4/5 h-full">
        <div className="bg-green-300  h-2/3 flex items-center ">data structures and alogirithm</div>
        <div className="bg-green-950  h-1/3 flex items-center"> data straucture and algorithm is</div>
      </div>
      <div className="bg-orange-500 w-2/6 h-full">
        <div className="bg-green-200  h-2/3 flex items-center "> Pending</div>
        <div className="bg-green-700  h-1/3 flex items-center "> view details</div>
      </div>
    </div>
    // <Link className="bg-red-800" href={`task/get-task/${task._id}`}>
    //   <h2 className="">
    //   {task.name}
    //   </h2>
    // </Link>


  )
}
