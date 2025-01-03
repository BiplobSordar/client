import { configureStore } from "@reduxjs/toolkit";

import rootReducer from "./rootReducer.js";
import { authApi } from "./fetures/api/authApi.js";
import { courseApi } from "./fetures/api/courseApi.js";
import { lectureApi } from "./fetures/api/lectureApi.js";
import { purchaseApi } from "./fetures/api/purchaseApi.js";
import { progressApi } from "./fetures/api/progressApi.js";

const store = configureStore({
    reducer: rootReducer,

    middleware: (defaultMiddleware) => defaultMiddleware().concat(authApi.middleware, courseApi.middleware, lectureApi.middleware, purchaseApi.middleware, progressApi.middleware)
})

const initializeApp = async () => {
    await store.dispatch(authApi.endpoints.loadUser.initiate({}, { forceRefetch: true }))
}
initializeApp()

export default store;