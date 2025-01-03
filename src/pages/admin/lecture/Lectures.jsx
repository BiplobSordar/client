import React, { useEffect, useState } from 'react'
import Lecture from './Lecture'
import { useNavigate, useParams } from 'react-router-dom'
import { useCreateLectureMutation, useGetLecturesQuery } from '@/app/fetures/api/lectureApi'
import { useToast } from '@/contexts/ToastContext'

const Lectures = () => {
  const addToast = useToast()
  const navigate = useNavigate()
  const params = useParams()
  const { course_id } = params
  const [createLecture, { data, error, isError, isLoading, isSuccess }] = useCreateLectureMutation()
  const { data: lecturesData, error: lecturesError, isError: lecturesIsError, isLoading: lecturesIsLoading, isSuccess: lecturesIsSuccess, refetch, isFetching: lecturesIsFetching } = useGetLecturesQuery(course_id)
  console.log(course_id, 'this is the course id')

  const [title, setTitle] = useState('')


  const handleCreateLecture = async () => {
    await createLecture({ course_id, title })
    setTitle('')
  }

  useEffect(() => {
    if (data) {
      addToast(data.message, 'success')
      refetch()
      // navigate(`/admin/courses/${course_id}/lecture`)
    }
    if (error) {
      addToast(error.message, 'error')
    }
  }, [data, error, isError, isSuccess, refetch])




  return (



    <div className="w-full min-h-svh flex items-start mt-10 bg-gray-100">
      <div className="container mx-auto p-6 max-w-4xl bg-white shadow-md rounded-lg my-10">
        {/* <!-- Heading Section --> */}
        <div className="mb-4">
          <h1 className="font-bold text-xl text-gray-800">
            Let's add lectures,
          </h1>
          <p className="text-sm text-gray-500">
            You Can Now Create Your Lecture According to the Course....
          </p>
        </div>

        {/* <!-- Content Section --> */}
        <div className="space-y-4">
          {/* <!-- Title Input --> */}
          <div>
            <label htmlFor="lecture-title" className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              id="lecture-title"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={title}
              onChange={(e) => { setTitle(e.target.value) }}
              placeholder="Your Title Name"
            />
          </div>

          {/* <!-- Buttons --> */}
          <div className="flex items-center gap-2">
            <button
              className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-md shadow-sm hover:bg-gray-100 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            // onclick="navigate(`/admin/course/${courseId}`)"
            >
              Back to course
            </button>
            <button
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"

              disabled={isLoading}
              onClick={handleCreateLecture}>
              {isLoading ? 'Creating...' : 'Create Lecture'}
            </button>
          </div>

          {/* <!-- Lectures List --> */}

        </div>
        <div className="my-10">
          {lecturesIsLoading  ||lecturesIsFetching? (
            <p className="text-gray-500">Loading lectures...</p>
          ) : lecturesError ? (
            <p className="text-red-500">Failed to load lectures.</p>
          ) : lecturesData.lectures.length === 0 ? (
            <p className="text-gray-500">No lectures available</p>
          ) : (
            lecturesData.lectures.map((lecture, index) => (

              <Lecture key={lecture.id} data={lecture} index={index} />
            ))
          )}

        </div>
      </div>
    </div>



  )
}

export default Lectures