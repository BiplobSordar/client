import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
export const courseApi = createApi({
    reducerPath: 'courseApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8000/api/v1/courses',
        credentials: 'include'

    }),
    endpoints: (builder) => ({
        getCourses: builder.query({
            query: () => ({
                url: '',
                method: 'GET',


            })
        }),
        createCourse: builder.mutation({
            query: (formData) => ({
                url: '',
                method: 'POST',
                body: formData,
                credentials: 'include'
            })
        }),
        getCourseById: builder.query({
            query: (id) => ({
                url: `/${id}`,
                method: 'GET'
            })
        }),
        editCourse: builder.mutation({
            query: ({ formData, id }) => ({
                url: `/${id}`,
                method: 'PUT',
                body: formData,
                credentials: 'include'

            })
        }),
        publishCourse: builder.mutation({
            query: ({ id, query }) => ({
                url: `/${id}?publish=${query}`,
                method: 'PATCH',


            })
        })

    })


})

export const { useGetCoursesQuery, useCreateCourseMutation, useGetCourseByIdQuery, useEditCourseMutation,usePublishCourseMutation } = courseApi;