import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { AiOutlinePlayCircle } from "react-icons/ai";
import { useGetCourseProgressQuery, useUpdateLectureProgressMutation, useCompleteCourseMutation, useInCompleteCourseMutation } from "@/app/fetures/api/progressApi";
import { useParams } from "react-router-dom";
import Loading from "@/components/Loading";
import { useToast } from "@/contexts/ToastContext";

const CourseProgress = () => {
  const { course_id } = useParams()
  const [playedLecture, setPlayedLecture] = useState(null)
  const { data, isLoading, isError, refetch } = useGetCourseProgressQuery(course_id)
  const [updateLectureProgress, { isLoading: updateLectureProgressIsLoading, isSuccess: updateLectureProgressIsSuccess }] = useUpdateLectureProgressMutation()
  const [completeCourse, { data: markCompleteData, isSuccess: completedSuccess, isLoading: markCompleteDataIsLoading }] = useCompleteCourseMutation();
  const [inCompleteCourse, { data: markInCompleteData, isSuccess: inCompletedSuccess, isLoading: markInCompleteDataIsLoading }] = useInCompleteCourseMutation();
  const addToast = useToast()
  const { completed } = data?.courseProgress || true
  console.log(completed, 'this is the completed statuys')
  useEffect(() => {

    if (data) {
      console.log('i am here at useEffect after data')

      setPlayedLecture(data?.courseProgress?.related_lectures[0])
    }

  }, [data])

  const changeLecture = (data, index) => {
    setPlayedLecture(data)

  }
  const handelLectureProgress = async (lecture_id) => {
    console.log(lecture_id, 'i am calling inside handelLectureProgress')
    await updateLectureProgress({ course_id, lecture_id })

  }


  const handleCompleteCourse = async () => {
    await completeCourse(course_id);
  };
  const handleInCompleteCourse = async () => {
    await inCompleteCourse(course_id);
  };
  useEffect(() => {
    console.log(markCompleteData);

    if (completedSuccess) {
      addToast(markCompleteData.message, 'success')
      refetch();
      // toast.success(markCompleteData.message);
    }
    if (inCompletedSuccess) {
      addToast(markInCompleteData.message, 'success')
      refetch();
      // toast.success(markInCompleteData.message);
    }
  }, [completedSuccess, inCompletedSuccess]);
  console.log(playedLecture, 'thsi is the state')

  if (isLoading) return <Loading />

  return (
    <div className="w-full p-20 ">

      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">{data?.courseProgress?.title}</h1>
        <div>

          {
            completed ? <button
              id="completionButton"
              className="px-4 py-2 border rounded-md text-white bg-blue-500 hover:bg-blue-600"
              onClick={handleInCompleteCourse }
            >
             
              {markInCompleteDataIsLoading?'Please Wait':'Mark As Incomplete'}

            </button> : <button
              id="completionButton"
              className="px-4 py-2 border rounded-md text-white bg-blue-500 hover:bg-blue-600"
              onClick={handleCompleteCourse}
            >
              {markCompleteDataIsLoading?'Please Wait..':'Mark As Complete'}
            

            </button>
          }


        </div>

      </div>

      <div className="flex flex-col md:flex-row gap-6">

        <div className="flex-1 md:w-3/5 h-1/2 rounded-lg shadow-lg p-4 bg-white">
          <div>
            <video
              id="videoPlayer"
              src={playedLecture?.videourl || "http://res.cloudinary.com/djjejrmrg/video/upload/v1735045880/chsibmfz9vf7neowhyh0.mp4"}
              controls
              onPlay={() => {
                handelLectureProgress(playedLecture.id)
              }
              }
              className="w-full h-auto rounded-md"
            ></video>
          </div>

          <div className="mt-2">
            <h3 id="currentLectureTitle" className="font-medium text-lg">
              {playedLecture?.title}
            </h3>
          </div>
        </div>


        <div
          className="flex flex-col w-full md:w-2/5 border-t md:border-t-0 md:border-l border-gray-200 md:pl-4 pt-4 md:pt-0"
        >
          <h2 className="font-semibold text-xl mb-4">Course Lectures</h2>
          <div className="flex-1 overflow-y-auto">
            {data?.courseProgress?.related_lectures.map((lecture, index) => (
              <div className="mb-3 p-4 rounded-md shadow-md bg-gray-50 hover:bg-gray-100 cursor-pointer transition" key={index} onClick={() => { changeLecture(lecture, index) }} >
                <div className="flex items-center justify-between">


                  <div className="flex items-center">
                    <svg
                      className="h-6 w-6 text-gray-500 mr-2"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M14.752 11.168l-3.197-2.132A1.5 1.5 0 0010 10.25v3.5a1.5 1.5 0 001.555 1.446l3.197-2.131a1.5 1.5 0 000-2.563z"
                      />
                    </svg>
                    <div>
                      <h4 className="text-lg font-medium">
                        {lecture.title}
                      </h4>
                    </div>
                  </div>
                  <span
                    className="px-2 py-1 text-xs font-medium text-green-600 bg-green-200 rounded"
                  >
                    Completed
                  </span>
                </div>
              </div>

            ))}





          </div>
        </div>
      </div>
    </div>

  );
};

export default CourseProgress;
