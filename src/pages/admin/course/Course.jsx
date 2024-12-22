// src/CoursePage.jsx
import { useGetCoursesQuery } from '@/app/fetures/api/courseApi';
import Loading from '@/components/Loading';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Courses = () => {
  const navigate = useNavigate()
  const [courses, setCourses] = useState([
    { id: 1, title: 'Course 1', price: '$100', status: 'Published' },
    { id: 2, title: 'Course 2', price: '$200', status: 'Unpublished' },
    // Add more courses as needed
  ]);
  const { data, isLoading, refetch, isFetching, error, isError } = useGetCoursesQuery()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const message = queryParams.get('message')



  const editCourse = (id) => {
    // Implement edit course functionality here
   navigate(`/admin/courses/${id}`)
  };

  useEffect(() => {
    if (message !== null)
      refetch()
  }, [message])

  if (isLoading || isFetching) {
    return <Loading />
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Course Invoices</h1>
        <button
          onClick={() => navigate('/admin/courses/create_course')}
          className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300"
        >
          Create Course
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-600 text-left text-sm uppercase font-bold">
              <th className="py-2 px-4 border-b">Title</th>
              <th className="py-2 px-4 border-b">Price</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.courses.map(course => (
              <tr key={course.id} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">{course.title}</td>
                <td className="py-2 px-4 border-b">{`${course.courseprice} $`}</td>
                {/* <td className="py-2 w-fit border rounded-md bg-green-300 px-4 border-b">{course.status}</td> */}
                <td className="py-2 px-4 border-b w-fit"> <div className={`w-fit ${course.ispublished
                  ? 'bg-green-400' : 'bg-red-400'} text-white rounded-md px-2 py-1`}> {course.ispublished
                    ? 'Published' : 'Unpublished'} </div> </td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => editCourse(course.id)}
                    className="bg-blue-500 text-white py-1 px-2 rounded-lg hover:bg-blue-700 transition duration-300"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Courses;
