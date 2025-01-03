

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'




export const lectureApi = createApi({
    reducerPath: 'lectureApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8000/api/v1',
        credentials: 'include',
    }),
    endpoints: (builder) => ({

        createLecture: builder.mutation({
            query: ({ course_id, title }) => ({
                url: `/${course_id}/lecture`,
                method: 'POST',
                body: { course_id, title }
            })
        }),
        getLectures: builder.query({
            query: (course_id) => ({
                url: `/${course_id}/lecture`,
                method: 'GET'
            })
        }),
        getLectureById: builder.query({
            query: ({ course_id, lecture_id }) => ({
                url: `/${course_id}/lecture/${lecture_id}`,
                method: 'GET'
            })
        }),
        editLecture: builder.mutation({
            query: ({ course_id, lecture_id, data }) => ({
                url: `/${course_id}/lecture/${lecture_id}`,
                method: 'PUT',
                body: data
            })
        }),
        removeLecture:builder.mutation({
            query:({course_id,lecture_id})=>({
                url:`/${course_id}/lecture/${lecture_id}`,
                method:'DELETE'
            })
        })
    })
})

export const { useCreateLectureMutation, useGetLecturesQuery, useGetLectureByIdQuery ,useEditLectureMutation,useRemoveLectureMutation} = lectureApi