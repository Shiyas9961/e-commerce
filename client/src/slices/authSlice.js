import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading : true,
    isAuthenticated : false
}

const authSlice = createSlice({
    name : 'auth',
    initialState,
    reducers : {
        loginRequest : (state, actions) => {
            return {
                ...state,
                loading : true
            }
        },
        loginSuccess : (state, action) => {
            return {
                loading : false,
                isAuthenticated : true,
                user : action.payload.user
            }
        },
        loginFail : (state, action) => {
            return {
                ...state,
                loading : false,
                error : action.payload.message
            }
        },
        clearError : (state, action) => {
            return {
                ...state,
                error : null
            }
        },
        registerRequest : (state, action) => {
            return {
                ...state,
                loading : true
            }
        },
        registerSuccess : (state, action) => {
            return {
                loading : false,
                isAuthenticated : true,
                user : action.payload.user
            }
        },
        registerFail : (state, action) => {
            return {
                ...state,
                loading : false,
                error : action.payload.message
            }
        },
        loadUserRequest : (state, action) => {
            return {
                ...state,
                loading : true
            }
        },
        loadUserSuccess : (state, action) => {
            return {
                loading : false,
                isAuthenticated : true,
                user : action.payload.user
            }
        },
        loadUserFail : (state, action) => {
            return {
                ...state,
                loading : false
            }
        },
        logoutSuccess : (state, action) => {
            return {
                ...state,
                loading : false,
                isAuthenticated : false,
                user : null
            }
        },
        logoutFail : (state, action) => {
            return {
                ...state,
                loading : false,
                error : action.payload
            }
        },
        editProfileRequest : (state, action) => {
            return {
                ...state,
                isUpdated : false,
                loading : true
            }
        },
        clearIsUpdated : (state, action) => {
            return {
                ...state,
                isUpdated : false
            }
        },
        editProfileSuccess : (state, action) => {
            return {
                ...state,
                loading : false,
                isUpdated : true,
                user : action.payload.user
            }
        },
        editProfileFail : (state, action) => {
            return {
                ...state,
                loading : false,
                error : action.payload
            }
        },
        changePasswordRequest : (state, action) => {
            return {
                ...state,
                loading : true,
                isUpdated : false
            }
        },
        changePasswordSuccess : (state, action) => {
            return {
                ...state,
                isUpdated : true,
                loading : false
            }
        },
        changePasswordFail : (state, action) => {
            return {
                ...state,
                loading : false,
                error : action.payload
            }
        },
        forgotPasswordRequest : (state, action) => {
            return {
                ...state,
                loading : true
            }
        },
        forgotPasswordSuccess : (state, action) => {
            return {
                ...state,
                loading : false,
                message : action.payload.message
            }
        },
        clearMessage : (state, action) => {
            return {
                ...state,
                message : null
            }
        },
        forgotPasswordFail : (state, action) => {
            return {
                ...state,
                loading : false,
                error : action.payload
            }
        },
        resetPasswordRequest : (state, action) => {
            return {
                ...state,
                loading : true
            }
        },
        resetPasswordSuccess : (state, action) => {
            return {
                ...state,
                loading : false,
                isAuthenticated : true,
                user : action.payload.user
            }
        },
        resetPasswordFail : (state, action) => {
            return {
                ...state,
                loading : false,
                isAuthenticated : false,
                error : action.payload
            }
        }
    }
})

export default authSlice.reducer

export const {
    loginRequest,
    loginSuccess,
    loginFail,
    clearError,
    registerRequest,
    registerSuccess,
    registerFail,
    loadUserRequest,
    loadUserSuccess,
    loadUserFail,
    logoutSuccess,
    logoutFail,
    editProfileRequest,
    editProfileSuccess,
    editProfileFail,
    changePasswordRequest,
    changePasswordSuccess,
    changePasswordFail,
    forgotPasswordRequest,
    forgotPasswordSuccess,
    forgotPasswordFail,
    resetPasswordRequest,
    resetPasswordSuccess,
    resetPasswordFail,
    clearMessage,
    clearIsUpdated
} = authSlice.actions