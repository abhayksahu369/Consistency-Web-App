import Link from "next/link"


export default function TaskCard({ task,handleModal }) {
  return (
    <div className="bg-black text-white w-11/12 h-20 my-3 flex border-gray-600 border rounded-2xl shadow-[6px_5px] shadow-gray-600">
      <div className=" w-1/6 h-full flex items-center justify-center text-yellow-50">
        <i className="ri-time-line ri-2x"></i>
      </div>
      <div className="  flex justify-center items-center w-4/5 h-full pl-4">
        <div className=" w-full  h-2/3  items-center capitalize  ">
        <Link className="bg-red-800" href={`task/get-task/${task._id}`}><h4>{task.name}</h4></Link>
          <p className="text-gray-500 text-xs">{task.description}</p>
        </div>
      </div>
      <div className="  flex justify-center items-center w-2/6 h-full">
        <div className=" w-full  h-2/3  items-center flex flex-col">
          <h4 onClick={()=>handleModal(task._id)}>pending</h4>
          <Link className="" href={`task/get-task/${task._id}`}><p className="text-gray-500 text-sm mt-4">view details</p></Link>
        </div>
      </div>
    </div>
    // <Link className="bg-red-800" href={`task/get-task/${task._id}`}>
    //   <h2 className="">
    //   {task.name}
    //   </h2>
    // </Link>


  )
}
