
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const purchaseApi = createApi({
    reducerPath: 'purchaseApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8000/api/v1/purchase',
        credentials: 'include'

    }),
    endpoints: (builder) => ({
        getCourseByIdWithStatus: builder.query({
            query: (course_id) => ({
                url: `/courses/${course_id}/show_details`,
                method: 'GET'
            })
        }),
        createCheckOutSession: builder.mutation({
            query: (course_id) => ({
                url: '/checkout/create-checkout-session',
                method: 'POST',
                body:{course_id}
            })
        }),
        getPurchasedCourses: builder.query({
            query: () => ({
              url: `/`,
              method: "GET",
            }),
          }),


    })


})



export const { useGetCourseByIdWithStatusQuery ,useCreateCheckOutSessionMutation,useGetPurchasedCoursesQuery} = purchaseApi;