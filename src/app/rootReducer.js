import {combineReducers} from '@reduxjs/toolkit'
import { authApi } from './fetures/api/authApi.js'
import authReducer from './fetures/authSlice.js'

const rootReducer=combineReducers({
    [authApi.reducerPath]:authApi.reducer,
    auth:authReducer
})

export default rootReducer