import React,{ useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { FaInfoCircle, FaLock, FaPlayCircle } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";

import Loading from "@/components/Loading";
import { useCreateCheckOutSessionMutation, useGetCourseByIdWithStatusQuery, } from "@/app/fetures/api/purchaseApi.js";
import { useToast } from "@/contexts/ToastContext";
import BuyCourseBtn from "@/components/BuyCourseBtn";


const CourseDetail = () => {
  const [videoUrl,setVideoUrl]=useState(null)
  const [title,setTitle]=useState(null)

  const params = useParams();
  const courseId = params.course_id;
  
  const addToast=useToast()


 const { data, error, isError, isLoading, isSuccess } = useGetCourseByIdWithStatusQuery(courseId)

 




console.log(data,'this is the course details')

useEffect(()=>{
  if(data && data?.course?.related_lectures[0]?.lecture_preview){

    setVideoUrl(data?.course?.related_lectures[0]?.lecture_url)
    setTitle(data?.course?.related_lectures[0]?.lecture_title)
  }
},[data])
  if (isLoading) return <Loading />

 const handelLectureChange=(lecture)=>{
  if(lecture.lecture_preview){
    setVideoUrl(lecture.lecture_url)
    setTitle(lecture.lecture_title)
  }else{
    addToast('Sorry This Lecture Is not Visiable .Please Buy The Course To Learn More','error')
  }
  
 }


 


 
  return (
    <div className="space-y-5">
      {/* Hero Section */}
      <div className="bg-gray-800  text-white">
        <div className="max-w-7xl mx-auto py-8 px-4 md:px-8 flex flex-col gap-2">
          <h1 className="font-bold text-2xl md:text-3xl">
            {data?.course?.title || ''}

          </h1>
          <p className="text-base md:text-lg">{data?.course?.titlesubtitle || ''}</p>
          <p>
            Created By{" "}
            <span className="text-blue-400 underline italic">
              {data?.course?.instructor || ''}

            </span>
          </p>
          <div className="flex items-center gap-2 text-sm">
            <FaInfoCircle size={16} />

            <p>Last updated : {new Date(data?.course?.created_at).toLocaleDateString()}</p>

          </div>
          {/* <p>Students enrolled: {course?.enrolledStudents.length}</p> */}
          <p>Students enrolled:5</p>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto my-5 px-4 md:px-8 flex flex-col lg:flex-row justify-between gap-10">
        {/* Left Section */}
        <div className="w-full lg:w-1/2 space-y-5">

        <div className="border rounded-lg p-4 shadow-lg">
            <h2 className="font-semibold text-lg">Course Content</h2>
            <p className="text-gray-500 text-sm mb-4">{data?.course?.related_lectures?.length}</p>
            <div className="space-y-3">
              {


                data?.course?.related_lectures?.map((lecture, idx) => (
                  <div onClick={()=>{handelLectureChange(lecture)}}
                    key={idx}
                    className="flex items-center gap-3 text-sm"
                  >
                    <span>
                      {idx === 0 ? (
                        <FaPlayCircle size={14} />
                      ) : (
                        <FaLock size={14} />
                      )}
                    </span>
                    <p>{lecture.lecture_title}</p>
                  </div>
                ))}
            </div>
          </div>
          <h1 className="font-bold text-xl md:text-2xl">Description</h1>
          <p
            className="text-sm leading-relaxed"
           
          >{data?.course?.description}</p>


         
        </div>

        {/* Right Section */}
        <div className="w-full lg:w-1/3">
          <div className="border rounded-lg p-4 shadow-lg">
            <div className="w-full aspect-video mb-4">
              <ReactPlayer
                width="100%"
                height="100%"
                // url={course.lectures[0].videoUrl}
                url={videoUrl}
                controls={true}
              />
            </div>
            <h1 className="text-lg font-medium">Lecture Title</h1>
            <div className="my-2 h-[1px] bg-gray-300" />
            <h1 className="text-lg md:text-xl font-semibold">Course Price</h1>
            <div className="mt-4">
             

              <BuyCourseBtn status={data?.course?.purchase_status ||false} courseId={courseId} />
            </div>
          </div>
        </div>
      </div>
    </div>
    // <div>this is nothing</div>

  );
};

export default CourseDetail;
