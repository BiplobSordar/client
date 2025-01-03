import { combineReducers } from '@reduxjs/toolkit'
import { authApi } from './fetures/api/authApi.js'
import authReducer from './fetures/authSlice.js'
import { courseApi } from './fetures/api/courseApi.js'
import { lectureApi } from './fetures/api/lectureApi.js'
import { purchaseApi } from './fetures/api/purchaseApi'
import { progressApi } from './fetures/api/progressApi.js'

const rootReducer = combineReducers({
    [authApi.reducerPath]: authApi.reducer,
    [courseApi.reducerPath]: courseApi.reducer,
    [lectureApi.reducerPath]: lectureApi.reducer,
    [purchaseApi.reducerPath]: purchaseApi.reducer,
    [progressApi.reducerPath]: progressApi.reducer,
    auth: authReducer
})

export default rootReducer