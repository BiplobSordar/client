import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { userLoggedIn } from '../authSlice.js'


export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8000/api/v1/user/',
        credentials: 'include'
    }),
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (signUpData) => ({
                url: 'register',
                method: 'POST',
                body: signUpData
            }),



        }),
        loginUser: builder.mutation({
            query: (signInData) => ({
                url: 'login',
                method: 'POST',
                body: signInData
            }),
            async onQueryStarted(_, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled
                    console.log(result, 'this is the result come from the api call')
                    dispatch(userLoggedIn({ user: result.data.user }))
                } catch (error) {
                    console.log(error)
                }

            }

        })
    })
})



export const { useLoginUserMutation, useRegisterUserMutation } = authApi;