import React from 'react';
import { Link } from 'react-router-dom';

const CourseCard = ({course}) => {
  const {course_title,course_thumbnail,author,course_level,avatar,course_price,course_id}=course
  
  return (
    <Link to={`/courses/${course_id}/show_details`}>
    <div className="relative rounded-md shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
      <img
        src={course_thumbnail||"https://i.imgur.com/2i3c4wA.png"}
        alt="Course Image"
        className="w-full h-48 object-cover"
      />
      <div className="p-4 bg-white">
        <h3 className="text-xl font-bold">{course_title}</h3>
        <div className="flex items-center mt-2">
          <img
            src={avatar||"https://i.imgur.com/xLq3B78.png"}
            alt="Author Image"
            className="w-8 h-8 rounded-full mr-2"
          />
          <p className="text-gray-600">{author}</p>
        </div>
        <div className="flex justify-between mt-3">
          <span className="text-blue-500 font-medium">{course_level||null}</span>
          <span className="text-lg font-bold">{course_price}$</span>
        </div>
      </div>
    </div>
    </Link>
  );
};

export default CourseCard;
