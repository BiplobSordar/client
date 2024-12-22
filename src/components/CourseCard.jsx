import React from 'react';

const CourseCard = () => {
  return (
    <div className="relative rounded-md shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
      <img
        src="https://i.imgur.com/2i3c4wA.png"
        alt="Course Image"
        className="w-full h-48 object-cover"
      />
      <div className="p-4 bg-white">
        <h3 className="text-xl font-bold">JavaScript Basics: From Zer...</h3>
        <div className="flex items-center mt-2">
          <img
            src="https://i.imgur.com/xLq3B78.png"
            alt="Author Image"
            className="w-8 h-8 rounded-full mr-2"
          />
          <p className="text-gray-600">Patel MernStack</p>
        </div>
        <div className="flex justify-between mt-3">
          <span className="text-blue-500 font-medium">Medium</span>
          <span className="text-lg font-bold">₹449</span>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
