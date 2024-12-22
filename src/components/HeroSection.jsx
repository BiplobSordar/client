// src/HeroSection.jsx
import React from 'react';

const HeroSection = () => {
  return (
    <section className="bg-gray-100 py-20">
      <div className="container flex flex-col items-center mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
          Welcome to E-Learning
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mb-8">
          Discover the best courses to enhance your skills and knowledge.
        </p>
        <div className="flex w-[60%] justify-center  items-center mb-8">
          <div className="flex  p-2   w-full justify-between gap-5 bg-white rounded-lg shadow-lg overflow-hidden">
            <input
              type="text"
              placeholder="Search for courses..."
              className=" border-gray-400 w-[90%]   px-4 py-2  rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="px-4 py-2 bg-blue-500 rounded-md text-white hover:bg-blue-700 transition duration-300">
              Search
            </button>
          </div>
        </div>
        <button className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-700 transition duration-300">
          Explore Courses
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
