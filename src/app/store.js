import { configureStore } from "@reduxjs/toolkit";

import rootReducer from "./rootReducer.js";
import { authApi } from "./fetures/api/authApi.js";
import { courseApi } from "./fetures/api/courseApi.js";

const store = configureStore({
    reducer: rootReducer,

    middleware:(defaultMiddleware) => defaultMiddleware().concat(authApi.middleware, courseApi.middleware)
})

const initializeApp = async () => {
    await store.dispatch(authApi.endpoints.loadUser.initiate({}, { forceRefetch: true }))
}
initializeApp()

export default store;