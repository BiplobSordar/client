import React, { useEffect } from 'react'
import { useState } from 'react';


import { AiOutlineCloudUpload } from "react-icons/ai"; // Publish Icon
import { AiOutlineDelete } from "react-icons/ai"; // Delete Icon
import { useNavigate, useParams } from 'react-router-dom';
import { FiTrash } from "react-icons/fi";
import { useEditCourseMutation, useGetCourseByIdQuery, usePublishCourseMutation } from '@/app/fetures/api/courseApi';
import Loading from '@/components/Loading';
import { useToast } from '@/contexts/ToastContext';


const EditCourse = () => {
    const params = useParams()
    const navigate = useNavigate()
    const addToast = useToast()
    const { data, error, isError, isLoading, isSuccess, isFetching, refetch } = useGetCourseByIdQuery(params.id, { refetchOnMountOrArgChange: true })
    const [editCourse, { isSuccess: editIsSuccess, isError: editIsError, error: editError, data: editData, isLoading: editIsLoading }] = useEditCourseMutation()
    const [publishCourse, { data: publishData, error: publishError, isLoading: publishIsLoading, isSuccess: publishIsSuccess, isError: publishIsError }] = usePublishCourseMutation()


    const [title, setTitle] = useState(null)
    const [id, setId] = useState(null)
    const [subTitle, setSubtitle] = useState(null)
    const [description, setDescription] = useState(null)
    const [category, setCategory] = useState(null)
    const [level, setLevel] = useState(null)
    const [price, setPrice] = useState(null)
    const [thumbnail, setThumbnail] = useState(null)
    const [preview, setPreview] = useState(null)
    const [publish, setPublish] = useState(null)


    useEffect(() => {
        refetch()
    }, [refetch])

    //  set course data coming from server to the form 
    useEffect(() => {
        if (data?.course) {
            const { title, subtitle, category, level, courseprice, coursethumbnail, description, id, ispublished } = data?.course
            setPreview(null)
            setTitle(title ? title : null)
            setSubtitle(subtitle ? subtitle : null)
            setCategory(category ? category : null)
            setLevel(level ? level : null)
            setDescription(description ? description : null)
            setPrice(courseprice ? courseprice : null)
            setThumbnail(coursethumbnail ? coursethumbnail : null)
            setPreview(thumbnail ? thumbnail : null)
            setId(id)
            setPublish(ispublished)
        }
    }, [data, isSuccess])

    // after successfull edited
    useEffect(() => {
        if (editData) {
            const { message } = editData
            addToast(message, 'success')
            navigate('/admin/courses?status=course_updated_successfully')
        }


    }, [editIsSuccess, editData])

    //   if error Happend
    useEffect(() => {
        if (error) {
            const { message } = error?.data
            addToast(message, 'error')
            navigate('/admin/courses')
        }
    }, [error, isError])


    useEffect(() => {
        if (publishData) {
            const { message } = publishData
            addToast(message, 'success')
            refetch()
        }
        if (publishError) {
            const { message } = publishError
            addToast(message, 'error')
        }
    }, [publishData, publishIsError, publishError, publishIsSuccess, refetch])

    const handelChange = (e) => {

        switch (e.target.name) {
            case 'title':

                setTitle(e.target.value);
                break

            case 'subTitle':
                setSubtitle(e.target.value)
                break
            case 'description':
                setDescription(e.target.value)
                break;
            case 'category':
                setCategory(e.target.value)

                break;
            case 'level':
                setLevel(e.target.value)

                break;

            case 'price':
                setPrice(e.target.value)
                break


            case 'thumbnail':

                const file = e.target.files[0]
                if (file) {
                    setThumbnail(file)
                    const reader = new FileReader()

                    reader.onload = (e) => {
                        setPreview(e.target.result)
                    }
                    reader.readAsDataURL(file)
                }
                break

        }

    }
    const deleteSelectedThumbnail = (e) => {

        console.log(e)
        e.stopPropagation()

        setPreview(null)
        if (data?.course?.coursethumbnail) {
            setThumbnail(data?.course?.coursethumbnail)

        } else {
            setThumbnail(null)
        }

    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('title', title)
        formData.append('subTitle', subTitle)
        formData.append('category', category)
        formData.append('level', level)
        formData.append('description', description)
        formData.append('price', price)
        formData.append('file', thumbnail)

        if (id == params.id) {
            console.log('id is matched')

            await editCourse({ formData, id })
        }


    }


    const handlePublish = async (query) => {
        console.log('i am cliked query', query)
        if (id == params.id) {

            await publishCourse({ id, query })
        }
    }










    if (isLoading || isFetching) {
        return <Loading />
    }
    console.log(category, 'thsi is the published statsu')
    console.log(editError, 'thsi is the editError')


    return (

        <div className="w-full min-h-svh flex items-center bg-gray-100">
            <div className="container mx-auto p-6 max-w-4xl bg-white shadow-md rounded-lg my-10">
                {/* Button Section */}
                <div className="flex justify-between items-center mb-6">


                    <button onClick={() => { handlePublish(publish ? 'false' : 'true') }}
                        type="button"
                        className={`flex items-center gap-2 ${publish ? 'bg-red-500' : 'bg-green-500'}  text-white py-2 px-5 rounded-lg hover:bg-green-600 transition duration-300`}
                    >
                        <AiOutlineCloudUpload size={20} /> {publishIsLoading ? 'Please Wait ' : publish ? 'UnPublish' : 'Publish'}

                    </button>



                    <button
                        type="button"
                        className="flex items-center gap-2 bg-red-500 text-white py-2 px-5 rounded-lg hover:bg-red-600 transition duration-300"
                    >
                        <AiOutlineDelete size={20} /> Delete Course
                    </button>
                </div>

                {/* Form Section */}
                <h1 className="text-3xl font-extrabold mb-6 text-gray-800">Add Course</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-lg font-medium text-gray-700">Title</label>
                        <input
                            // required
                            type="text"
                            name="title"
                            placeholder="Ex. Fullstack Developer"
                            value={title == null ? '' : title}
                            onChange={handelChange}
                            className="w-full mt-2 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        {editError?.data?.errors && <span className='text-lg text-red-600 '>{editError?.data?.errors?.title?.msg}</span>}
                    </div>
                    <div>
                        <label className="block text-lg font-medium text-gray-700">Subtitle</label>
                        <input
                            type="text"
                            name="subTitle"
                            value={subTitle == null ? '' : subTitle}
                            onChange={handelChange}
                            placeholder="Ex. Become a Fullstack Developer from zero to hero in 2 months"
                            className="w-full mt-2 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-lg font-medium text-gray-700">Description</label>
                        <textarea
                            value={description == null ? '' : description}
                            onChange={handelChange}
                            name="description"
                            placeholder="Write a brief description about the course..."
                            rows="4"
                            className="w-full mt-2 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        ></textarea>
                    </div>
                    <div className="flex flex-wrap gap-6">
                        <div className="flex-1 min-w-[180px]">
                            <label className="block text-lg font-medium text-gray-700">Category</label>
                            <select
                                required
                                name="category"
                                value={category == null ? '' : category}
                                onChange={handelChange}
                                className="w-full mt-2 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                                <option value="Design">Design</option>
                                <option value="Programming">Programming</option>
                            </select>
                            {editError?.data?.errors && <span className='text-lg text-red-600 '>{editError?.data?.errors?.category?.msg}</span>}
                        </div>
                        <div className="flex-1 min-w-[180px]">
                            <label className="block text-lg font-medium text-gray-700">Course Level</label>
                            <select
                                required
                                value={level == null ? '' : level}
                                onChange={handelChange}
                                name="level"
                                className="w-full mt-2 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="" disabled>
                                    Select Course Level
                                </option>
                                <option value="beginner">Beginner</option>
                                <option value="medium">Medium</option>
                                <option value="advance">Advance</option>
                            </select>
                            {editError?.data?.errors && <span className='text-lg text-red-600 '>{editError?.data?.errors?.level?.msg}</span>}
                        </div>
                        <div className="flex-1 min-w-[150px]">
                            <label className="block text-lg font-medium text-gray-700">Price ($USD)</label>
                            <input
                                type="number"
                                name="price"
                                value={price == null ? '' : price}

                                onChange={handelChange}
                                placeholder="199"
                                className="w-full mt-2 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-center w-full relative">
                        {/* Delete Icon (Separate from Label) */}
                        {preview && (
                            <div
                                className="absolute top-2 right-2 flex items-center justify-center w-8 h-8 bg-black bg-opacity-50 rounded-full opacity-0 hover:opacity-100 transition-opacity cursor-pointer z-10"
                                onClick={deleteSelectedThumbnail}
                            >
                                <FiTrash className="text-white w-4 h-4" />
                            </div>
                        )}

                        <label
                            htmlFor="dropzone-file"
                            className="flex flex-col items-center justify-center w-full h-60 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 relative overflow-hidden"
                        >
                            {/* Display the image preview */}
                            {thumbnail ? (
                                <img
                                    id="image-preview"
                                    src={preview || thumbnail}
                                    alt="Selected"
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                            ) : (
                                <div
                                    id="dropzone-content"
                                    className="flex flex-col items-center justify-center pt-5 pb-6"
                                >
                                    <svg
                                        className="w-8 h-8 mb-4 text-gray-500"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 20 16"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                        />
                                    </svg>
                                    <p className="mb-2 text-sm text-gray-500">
                                        <span className="font-semibold">Click to upload</span> or drag and drop
                                    </p>
                                    <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                </div>
                            )}
                            {/* File input */}
                            <input
                                id="dropzone-file"
                                type="file"
                                name="thumbnail"
                                accept="image/*"
                                className="hidden"
                                onChange={(event) => handelChange(event)}
                            />
                        </label>
                    </div>
                    <div className="flex justify-end gap-4">
                        <button
                            type="button"
                            className="bg-gray-500 text-white py-2 px-5 rounded-lg hover:bg-gray-600 transition duration-300"
                        >
                            Cancel
                        </button>
                        <button
                            disabled={editIsLoading}

                            type="submit"
                            className="bg-blue-500 text-white py-2 px-5 rounded-lg hover:bg-blue-600 transition duration-300"
                        >
                            {editIsLoading ? 'Please Wait...' : 'Save'}
                        </button>
                    </div>
                </form>
            </div>
        </div>



    )
}

export default EditCourse