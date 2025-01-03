const SearchResult = ({ course }) => {
    return (
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-300 py-4 gap-4">
        {/* Course Link */}
        <a
          href={`/course-detail/${course.id}`}
          className="flex flex-col md:flex-row gap-4 w-full md:w-auto"
        >
          {/* Course Thumbnail */}
          <img
            src={course.coursethumbnail}
            alt="course-thumbnail"
            className="h-32 w-full md:w-56 object-cover rounded"
          />
          {/* Course Details */}
          <div className="flex flex-col gap-2">
            <h1 className="font-bold text-lg md:text-xl">{course.title}</h1>
            <p className="text-sm text-gray-600">{course.subtitle}</p>
            <p className="text-sm text-gray-700">
              Instructor: <span className="font-bold">{course.instructor}</span>
            </p>
            {/* Badge */}
            <span className="bg-gray-200 text-gray-700 text-xs font-medium px-2 py-1 rounded w-fit mt-2 md:mt-0">
              {course.level}
            </span>
          </div>
        </a>
        {/* Course Price */}
        <div className="mt-4 md:mt-0 md:text-right w-full md:w-auto">
          <h1 className="font-bold text-lg md:text-xl">₹{course.courseprice
          }</h1>
        </div>
      </div>
    );
  };
  
  export default SearchResult;
  