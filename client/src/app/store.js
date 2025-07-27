import {configureStore} from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice.js'
import userReducer from '../features/user/userSlice.js'

export const store = configureStore({
    reducer : {
        auth:authReducer,
        user:userReducer,
        // admin:adminReducer
    }
})