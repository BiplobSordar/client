import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const COURSE_PROGRESS_API = "http://localhost:8000/api/v1/progress";
export const progressApi = createApi({
    reducerPath: 'progressApi',
    baseQuery: fetchBaseQuery({
        baseUrl: COURSE_PROGRESS_API,
        credentials: 'include'

    }),
    endpoints: (builder) => ({
        getCourseProgress: builder.query({
            query: (course_id) => ({
                url: `/${course_id}`,
                method: "GET",
            }),
        }),

        updateLectureProgress: builder.mutation({
            query: ({ course_id, lecture_id }) => ({
                url: `/${course_id}/lecture/${lecture_id}/view`,
                method: "POST"
            }),
        }),

        completeCourse: builder.mutation({
            query: (courseId) => ({
                url: `/${courseId}/complete`,
                method: "POST"
            })
        }),
        inCompleteCourse: builder.mutation({
            query: (courseId) => ({
                url: `/${courseId}/incomplete`,
                method: "POST"
            })
        }),

    })
})

export const {
    useGetCourseProgressQuery,
    useUpdateLectureProgressMutation,
    useCompleteCourseMutation,
    useInCompleteCourseMutation
} = progressApi;