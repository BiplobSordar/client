import { useGetPublishCoursesQuery } from '@/app/fetures/api/courseApi'
import CourseCard from '@/components/CourseCard'
import Loading from '@/components/Loading'
import React from 'react'

const Courses = () => {
      const { data, isLoading, isFetching, error, isError } =useGetPublishCoursesQuery()

      if(isLoading)return <Loading/>
  return (
    <section className="bg-gray-100 py-20">
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold text-gray-900 mb-10 text-center">Our Courses</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data?.courses?.length > 0 ? (
         data.courses.map((course, index) => (
            <CourseCard
              key={index}
              course={course}
            />
          ))
        ) : (
          <>
            <CourseSkeleton />
            <CourseSkeleton />
            <CourseSkeleton />
            <CourseSkeleton />
          </>
        )}
      </div>
    </div>
  </section>
  )
}

export default Courses