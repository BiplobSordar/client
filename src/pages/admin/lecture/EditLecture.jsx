
import { useEditLectureMutation, useGetLectureByIdQuery, useRemoveLectureMutation } from '@/app/fetures/api/lectureApi'
import Loading from '@/components/Loading'
import { useToast } from '@/contexts/ToastContext';

import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from "axios";

const MEDIA_API = "http://localhost:8000/api/v1/media";
axios.defaults.withCredentials = true;
const EditLecture = () => {
  const navigate=useNavigate()
  const params = useParams()
  const { lecture_id, course_id } = params
  const addToast = useToast()

  const [lectureTitle, setLectureTitle] = useState("");
  const [uploadVideoUrl, setUploadVideoUrl] = useState(null);
  const [isFree, setIsFree] = useState(false);
  const [mediaProgress, setMediaProgress] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [btnDisable, setBtnDisable] = useState(true);
  const [uploadVideoPublicId, setUploadVideoPublicId] = useState(null);

  const [editLecture, { data: editLectureData, error: editLectureError, isLoading: editLectureIsLoading }] = useEditLectureMutation()
  const [removeLecture, { data: removeLectureData, error: removeLectureError, isLoading: removeLectureIsLoading }] = useRemoveLectureMutation()

  const { data: lectureData, error: lectureError, isLoading: lectureIsLoading, isSuccess: lectureIsSuccess, isFetching: lectureIsFetching } = useGetLectureByIdQuery({ course_id, lecture_id })
  const lecture = lectureData?.lecture;

  const fileChangeHandler = async (e) => {


    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      console.log('File:', file, 'this is the file at file');
      console.log('FormData:', formData.get('file'), 'thsi is the formdata file'); // Check if the file is attached

      setMediaProgress(true);
      try {
        const res = await axios.post(`http://localhost:8000/api/v1/media/upload-video`, formData, {

          onUploadProgress: ({ loaded, total }) => {
            setUploadProgress(Math.round((loaded * 100) / total));
          },
        });

        if (res.data.success) {
          console.log(res);
          setUploadVideoUrl(
            res.data.data.url,

          );
          setUploadVideoPublicId(res.data.data.public_id,)
          setBtnDisable(false);

          addToast(res.data.message, 'success')
        }
      } catch (error) {
        console.log(error);

        addToast("video upload failed", 'error')
      } finally {
        setMediaProgress(false);
      }
    }
  };


  const handleLectureRemove = async () => {

    await removeLecture({ course_id, lecture_id })
  }
  useEffect(() => {
    if (lecture) {
      setLectureTitle(lecture.title);
      setIsFree(lecture.isPreviewFree);
      setUploadVideoUrl(lecture.videoUrl)
      setUploadVideoPublicId(lecture.publicId)
    }
  }, [lecture])
  useEffect(()=>{
    if(removeLectureData){
      addToast(removeLectureData.message)
      navigate(`/admin/courses/${course_id}/lecture`)
     
    }
    if(removeLectureError){
      addToast(removeLectureError.message)
    }
  },[removeLectureData,removeLectureError])


  useEffect(()=>{
if(editLectureData){
  const {message}=editLectureData
  addToast(message,'success')
  navigate(`/admin/courses/${course_id}/lecture`)
}
if(editLectureError){
  const {message}=editLectureData
  addToast(message,'error')
}

  },[editLectureData,editLectureError])


  const editLectureHandler = async () => {
   
    const data = { lectureTitle, uploadVideoPublicId, uploadVideoUrl, isFree }
    await editLecture({ lecture_id, course_id, data })
  }



  if (lectureIsLoading || lectureIsFetching) return <Loading />
  return (
    <div className="w-full min-h-svh flex items-start  bg-gray-100">
      <div className="container mx-auto p-6 max-w-4xl bg-white shadow-md rounded-lg my-10">

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-6 border-b">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Edit Lecture</h2>
            <p className="text-sm text-gray-500">Make changes and click save when done.</p>
          </div>
          <div className="flex items-center gap-2 mt-4 md:mt-0">
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-md flex items-center gap-2 disabled:opacity-50"
              disabled={removeLectureIsLoading}
            onClick={handleLectureRemove}
            >
              <span className="flex items-center">

                {removeLectureIsLoading?'Removing...':'Remove Lecture'}
              </span>
            </button>
          </div>
        </div>


        <div className="p-6 space-y-6">

          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={lectureTitle}
              onChange={(e) => { setLectureTitle(e.target.value) }}
              placeholder="Ex. Introduction to Javascript"
            />
          </div>


          <div>
            <label className="block text-sm font-medium text-gray-700">
              Video <span className="text-red-500">*</span>
            </label>
            <input
              disabled={mediaProgress}
              onChange={fileChangeHandler}
              type="file"
              accept="video/*"
              className="mt-1 block w-full cursor-pointer text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border file:border-gray-300 file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"

            />
          </div>


          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="isFree"
              checked={isFree}
              className="toggle-checkbox h-5 w-5 text-indigo-600"
              onChange={() => { setIsFree(!isFree) }}
            />
            <label htmlFor="isFree" className="text-sm font-medium text-gray-700">Is this video FREE</label>
          </div>


          {mediaProgress && <div className="relative w-full h-6 bg-gray-300 rounded-full overflow-hidden">
            <progress
              value={uploadProgress}
              max="100"
              className="absolute top-0 left-0 w-full h-full bg-transparent"
            ></progress>
            <div
              className="absolute top-0 left-0 h-full bg-blue-500 transition-all"
              style={{ width: `${uploadProgress}%` }}
            ></div>
            <span className="absolute w-full text-center text-sm font-medium text-gray-700">
              {uploadProgress}%
            </span>
          </div>}




          <div>
            <button
              className="bg-indigo-600 text-white px-4 py-2 rounded-md flex items-center gap-2 disabled:opacity-50 w-full md:w-auto"
              disabled={editLectureIsLoading}
              onClick={editLectureHandler}
            >

              {editLectureIsLoading ? 'Updating...' : 'Update Lecture'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditLecture