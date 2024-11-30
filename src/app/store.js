import { configureStore } from "@reduxjs/toolkit";
import authReducer from './fetures/authSlice.js'
import rootReducer from "./rootReducer.js";
import { authApi } from "./fetures/api/authApi.js";

const store = configureStore({
    reducer: rootReducer,
    middleware: (defaultMiddleware) => defaultMiddleware().concat(authApi.middleware)
})

export default store;