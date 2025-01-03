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
                url: '/',
                method: 'GET',


            })
        }),
        createCourse: builder.mutation({
            query: (formData) => ({
                url: '/',
                method: 'POST',
                body: formData,
                credentials: 'include'
            })
        }),
        getSearchCourse:builder.query({
            query: ({searchQuery, categories, sortByPrice}) => {
              // Build qiery string
              let queryString = `/search?query=${encodeURIComponent(searchQuery)}`
      
              // append cateogry 
              if(categories && categories.length > 0) {
                const categoriesString = categories.map(encodeURIComponent).join(",");
                queryString += `&categories=${categoriesString}`; 
              }
      
              // Append sortByPrice is available
              if(sortByPrice){
                queryString += `&sortByPrice=${encodeURIComponent(sortByPrice)}`; 
              }
      
              return {
                url:queryString,
                method:"GET", 
              }
            }
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
        }),
        getPublishCourses: builder.query({
            query: () => ({
                url: '/publish',
                method: 'GET'
            })
        }),
        getMyLearningCourses:builder.query({
            query:()=>({
               url:'/my-learning' ,
               method:'GET'
            })
        })
    })


})

export const { useGetCoursesQuery, useCreateCourseMutation, useGetCourseByIdQuery, useEditCourseMutation, usePublishCourseMutation, useGetPublishCoursesQuery,useGetSearchCourseQuery

 ,useGetMyLearningCoursesQuery} = courseApi;