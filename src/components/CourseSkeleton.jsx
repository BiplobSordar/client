// src/CourseSkeleton.jsx
import React from 'react';

const CourseSkeleton = () => {
  return (
    <div className="bg-gray-200 rounded-lg shadow-md p-4">
      <div className="h-24 w-full rounded-lg bg-gray-300 mb-4" />
      <div className="flex items-center mb-2">
        <div className="h-8 w-8 rounded-full bg-gray-300 mr-2" />
        <div className="text-gray-500">
          <div className="h-4 w-24 rounded-lg bg-gray-300" />
          <div className="h-2 w-16 rounded-lg bg-gray-300 mt-1" />
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="bg-gray-300 rounded-lg px-4 py-2">
          <div className="h-3 w-16 rounded-lg bg-gray-300" />
        </div>
        <div className="bg-gray-300 rounded-lg px-4 py-2">
          <div className="h-3 w-16 rounded-lg bg-gray-300" />
        </div>
      </div>
    </div>
  );
};

export default CourseSkeleton;
