// src/Cources.jsx
import React from 'react';
import CourseCard from './CourseCard';
import CourseSkeleton from './CourseSkeleton';

const Cources = () => {
  const courses = [
    // {
    //     imageUrl: 'https://via.placeholder.com/300',
    //   title: 'Course Title 1',
    //   instructor: 'Author 1',
    //   price: '$99',
    //   category: 'Category 1'
    // },
    // {
    //   thumbnail: 'https://via.placeholder.com/300',
    //   title: 'Course Title 2',
    //   author: 'Author 2',
    //   price: '$49',
    //   level: 'Category 2'
    // },
    // Add more courses as needed
  ];

  return (
    <section className="bg-gray-100 py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-10 text-center">Our Courses</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {courses.length > 0 ? (
            courses.map((course, index) => (
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
  );
};

export default Cources;
