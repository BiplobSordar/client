// src/AddCourse.jsx
import { useCreateCourseMutation } from '@/app/fetures/api/courseApi';
import { useToast } from '@/contexts/ToastContext';

import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

const AddCourse = () => {
  const addToast = useToast()
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');

  const navigateTo = useNavigate();

  const [createCourse, { isLoading, data, isSuccess, isError, error }] = useCreateCourseMutation()


  const handleSubmit = async (e) => {
    e.preventDefault();

    await createCourse({ title, category })


  };


  useEffect(() => {
    if (error) {
      const { data: { message: errorMessage, success: errorSuccess, status: errorStatus } } = error
      addToast(errorMessage, 'error')
    }


  }, [error, isError])
  useEffect(() => {
    if (data) {
      const { message, status } = data
      addToast(message, 'success')
      setTitle('');
      setCategory('');
      navigateTo('/admin/courses?message=New Course Added')

    }


  }, [isSuccess, data])




  const handleBack = () => {

    navigateTo('/admin/courses')
  };




  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 my-5">Add Course</h1>
      <form onSubmit={handleSubmit} className="space-y-4 mx-auto w-[50%]">
        <div>
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-lg mt-1 p-2 border border-gray-300 "
            // required
          />
          {error?.data?.errors && <span className='text-lg text-red-600 '>{error?.data?.errors?.title?.msg}</span>}
        </div>
        <div>
          <label className="block text-gray-700 ">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
            // required
          >
            <option value="" disabled>
              Select Category
            </option>
            <option value="Next JS">Next JS</option>
            <option value="Data Science">Data Science</option>
            <option value="Frontend Development">Frontend Development</option>
            <option value="Fullstack Development">Fullstack Development</option>
            <option value="MERN Stack Development">MERN Stack Development</option>
            <option value="Javascript">Javascript</option>
            <option value="Python">Python</option>
            <option value="Docker">Docker</option>
            <option value="MongoDB">MongoDB</option>
            <option value="HTML">HTML</option>
            {/* Add more categories as needed */}
          </select>
          {error?.data?.errors && <span className='text-lg text-red-600 '>{error?.data?.errors?.category?.msg}</span>}

        </div>
        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={handleBack}
            className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition duration-300"
          >
            Back
          </button>
          <button
            type="submit" disabled={isLoading}
            className="bg-green-500 text-white sm:text-sm py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300"
          >
            {isLoading ? 'Loading' : 'Add '}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCourse;
