import CourseCard from '@/components/CourseCard';
import React from 'react';

const MyLearning = () => {
    // Sample data for enrolled courses
    const enrolledCourses = [1]; // Change this to some courses to test the display

    return (
        <div className="container mx-auto mt-20 p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold my-10">My Learning </h1>

            <div className="course-history mb-6">
              
                
                {enrolledCourses.length > 0 ? <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                    <CourseCard />
                    <CourseCard />
                    <CourseCard />
                    <CourseCard />
                    <CourseCard />
                    <CourseCard /></div>

                    : (
                        <div className="text-center p-4 border border-gray-300 rounded">
                            <p className="text-lg">You currently have no courses enrolled.</p>
                            <p className="text-gray-500">Explore our course catalog to find something that interests you!</p>
                        </div>
                    )}
            </div>
        </div>
    );
};

export default MyLearning;