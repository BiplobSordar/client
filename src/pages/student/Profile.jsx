import { useLoadUserQuery, useUpdateUserMutation } from "@/app/fetures/api/authApi";
import React, { useEffect, useState } from "react";
import defaultImage from "../../assets/user.png"
import { useToast } from "@/contexts/ToastContext";
import { useNavigate } from "react-router-dom";
import ProfileSkeleton from "@/components/Loading";
import Loading from "@/components/Loading";

const Profile = () => {
  const navigate = useNavigate()
  const { data: userData, isLoading: userIsLoading, isSuccess: userIsSuccess, error: userError, refetch, isFetching: userIsFetching, currentData } = useLoadUserQuery()
  const [updateUser, { data: updateUserData, isSuccess: updateUserIsSuccess, isError: updateUserIsError, isLoading: updateUserIsLoading, error: updateUserError }] = useUpdateUserMutation()
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [name, setName] = useState('')
  const [file, setFile] = useState('')
  const addToast = useToast()
  const skills = ["JavaScript", "React", "Node.js"]


  console.log(userIsFetching, 'this is the isFetching')
  const [courses, setCourses] = useState([
    { title: "React for Beginners", progress: 75 },
    { title: "Node.js Masterclass", progress: 50 },
    { title: "Tailwind CSS Advanced", progress: 30 },
  ]);
  useEffect(() => {
    refetch()
  }, [])

  const updateUserHandler = async (e) => {
    e.preventDefault()

    const formData = new FormData();
    formData.append("name", name);
    formData.append("file", file);
    await updateUser(formData);


  };
  useEffect(() => {
    if (updateUserIsSuccess) {
      addToast('User Updated Successfully,,,', 'success')
      setEditModalOpen(false)
      refetch()
    }
    if (updateUserIsError) {
      addToast('Failed To Update User', 'error')
    }

  }, [
    updateUserIsSuccess, updateUserIsError, refetch
  ])



  const handleInputChange = (e) => {


    const file = e.target.files?.[0];
    if (file) setFile(file)




  }





  if (userIsLoading || userIsFetching) return <Loading />

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        {/* User Details Section */}
        <section className="p-6 border-b">
          <div className="flex items-center">
            <img
              src={userData?.user?.photo_url || defaultImage}
              alt={userData?.user ? userData?.user?.username : 'User'}
              className="w-20 h-20 rounded-full border-4 border-blue-500 shadow-md"
            />
            <div className="ml-4">
              <h2 className="text-2xl font-semibold text-gray-800">
                {userData?.user?.username}
              </h2>
              <p className="text-sm text-gray-600">{userData?.user?.email}</p>
              <span className="mt-1 inline-block bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded">
                {userData?.user?.role.toUpperCase()}
              </span>
            </div>
            <button
              className="ml-auto bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
              onClick={() => setEditModalOpen(true)}
            >
              Edit
            </button>
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-gray-800">Skills</h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-gray-200 text-gray-800 text-sm font-medium px-3 py-1 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Enrolled Courses Section */}
        <section className="p-6 border-b">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Enrolled Courses
          </h3>
          <div className="space-y-4">
            {courses.map((course, index) => (
              <div
                key={index}
                className="p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition"
              >
                <h4 className="text-lg font-medium text-gray-700">
                  {course.title}
                </h4>
                <p className="text-sm text-gray-500 mt-1">
                  Progress: {course.progress}%
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Progress Overview Section */}
        <section className="p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Progress Overview
          </h3>
          <div className="space-y-4">
            {courses.map((course, index) => (
              <div key={index}>
                <div className="flex justify-between">
                  <h4 className="text-gray-700 font-medium">{course.title}</h4>
                  <span className="text-gray-500 text-sm">
                    {course.progress}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Edit User Details
            </h3>
            <form onSubmit={updateUserHandler}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 w-full p-2 border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={name}
                />
              </div>


              <div className="flex flex-col items-center justify-center p-4">




                <label className="block mb-5 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Upload file</label>
                <div className="relative w-full max-w-sm">
                  <input type="file" onChange={(e) => handleInputChange(e)} className="absolute inset-0 w-fullb  h-full opacity-0 cursor-pointer" id="file_input" />
                  <p className="mt-1 text-sm mb-2 text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 800x400px).</p>
                  <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300" > {userData?.user?.photo_url ? 'Change Your PP' : 'Upload PP'} </button>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 rounded shadow hover:bg-gray-400"
                  onClick={() => setEditModalOpen(false)}
                >
                  Cancel
                </button>
                <button disabled={updateUserIsLoading}
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600"
                >
                  {updateUserIsLoading ? 'Please Wait' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>

  );
};

export default Profile;


