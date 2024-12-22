import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { userLoggedIn, userLoggedOut } from '../authSlice.js'



export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8000/api/v1/user/',
        
        credentials: 'include',

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

                    dispatch(userLoggedIn({ user: result.data.user }))
                } catch (error) {
                    console.log(error)
                }

            }

        }),
        loadUser: builder.query({
            query: () => ({
                url: 'profile',
                method: 'GET'

            }),
            providesTags: ['User'],
            async onQueryStarted(_, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled
                    dispatch(userLoggedIn({ user: result.data.user }))
                } catch (error) {
                    console.log(error)
                }
            }
        }),
        updateUser: builder.mutation({
            query: (formData) => ({
                url: '/profile/update',
                method: 'PUT',
                body: formData,
                credentials: 'include'
            

            }),

        })
        ,
        logoutUser: builder.mutation({
            query: () => ({
                url: 'logout',
                method: 'GET'
            }),
            invalidatesTags:["USER"],
            async onQueryStarted(_, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled
                    dispatch(userLoggedOut())

                } catch (error) {
                    console.log(error)

                }

            }
        }),
        invalidatesTags: ['User'],
    })
})



export const { useLoginUserMutation, useRegisterUserMutation, useLoadUserQuery, useLogoutUserMutation, useUpdateUserMutation } = authApi;