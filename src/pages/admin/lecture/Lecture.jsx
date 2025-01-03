import React from 'react'
import { BiEdit } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';


const Lecture = ({data,index}) => {
  const navigate=useNavigate()
  
  return (
    <div className="flex items-start justify-between space-y-2 border-b py-2 w-full">
    <h1 className="font-bold text-gray-800 dark:text-gray-100">
      Lecture - {index+1}: {data.title} 
    </h1>
    <BiEdit
    onClick={()=>{navigate(`/admin/courses/${data.course_id}/lecture/${data.id}`)}}
      size={20}
      className=" cursor-pointer text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
    />
  </div>
  )
}

export default Lecture