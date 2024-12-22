import {combineReducers} from '@reduxjs/toolkit'
import { authApi } from './fetures/api/authApi.js'
import authReducer from './fetures/authSlice.js'
import { courseApi } from './fetures/api/courseApi.js'

const rootReducer=combineReducers({
    [authApi.reducerPath]:authApi.reducer,
    [courseApi.reducerPath]:courseApi.reducer,
    auth:authReducer
})

export default rootReducer