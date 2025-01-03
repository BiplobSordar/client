
import { useGetSearchCourseQuery } from '@/app/fetures/api/courseApi.js';
import Filter from '@/components/Filter'
import SearchResult from '@/components/SearchResult';
import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom';


const dummyCourse = {
    _id: "12345",
    courseThumbnail:
   'https://res.cloudinary.com/djjejrmrg/image/upload/v1735712167/tukbhvocy3thys61tbeq.webp',
    courseTitle: "Mastering React: A Complete Guide",
    subTitle: "Learn React from scratch and build amazing apps",
    creator: {
      name: "John Doe",
    },
    courseLevel: "Beginner",
    coursePrice: 4999,
  };
const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const [selectedCategories, setSelectedCatgories] = useState([]);
  const [sortByPrice, setSortByPrice] = useState("");

  const { data, isLoading } = useGetSearchCourseQuery({
    searchQuery:query,
    categories:selectedCategories,
    sortByPrice
  });

  const isEmpty = !isLoading && data?.courses.length === 0;

  const handleFilterChange = (categories, price) => {
    setSelectedCatgories(categories);
    setSortByPrice(price);
  }
  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
    <div className="my-6">
      <h1 className="font-bold text-xl md:text-2xl">result for "{query}"</h1>
      <p>
        Showing results for{""}
        <span className="text-blue-800 font-bold italic">{query}</span>
      </p>
    </div>
    <div className="flex flex-col md:flex-row gap-10">
      <Filter handleFilterChange={handleFilterChange} />
      <div className="flex-1">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, idx) => (
            // <CourseSkeleton key={idx} />
            <CourseSkeleton/>
          ))
        ) : isEmpty ? (
          <CourseNotFound />
        ) : (
          data?.courses?.map((course) => <SearchResult key={course.id} course={course}/>)
        )}
        {/* <SearchResult course={dummyCourse}/> */}
      </div>
    </div>
  </div>
);
  
}

export default Search

const CourseSkeleton = () => {
    return (
      <div className="flex-1 flex flex-col md:flex-row justify-between border-b border-gray-300 py-4">
        {/* Skeleton for the image */}
        <div className="h-32 w-full md:w-64 bg-gray-200 animate-pulse"></div>
  
        {/* Skeleton for text and content */}
        <div className="flex flex-col gap-2 flex-1 px-4">
          <div className="h-6 w-3/4 bg-gray-200 animate-pulse"></div>
          <div className="h-4 w-1/2 bg-gray-200 animate-pulse"></div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-1/3 bg-gray-200 animate-pulse"></div>
          </div>
          <div className="h-6 w-20 mt-2 bg-gray-200 animate-pulse"></div>
        </div>
  
        {/* Skeleton for additional content */}
        <div className="flex flex-col items-end justify-between mt-4 md:mt-0">
          <div className="h-6 w-12 bg-gray-200 animate-pulse"></div>
        </div>
      </div>
    );
  };
  const CourseNotFound = () => {
    return (
      <div className="flex flex-col items-center justify-center min-h-32 dark:bg-gray-900 p-6">
        
        <div className="text-red-500 h-16 w-16 mb-4 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
            />
          </svg>
        </div>
        
      
        <h1 className="font-bold text-2xl md:text-4xl text-gray-800 dark:text-gray-200 mb-2">
          Course Not Found
        </h1>
        
     
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
          Sorry, we couldn't find the course you're looking for.
        </p>
        
        
        <a
          href="/"
          className="text-blue-500 underline hover:text-blue-700 text-lg"
        >
          Browse All Courses
        </a>
      </div>
    );
  };
  