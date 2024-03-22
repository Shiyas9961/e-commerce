import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading : false,
    users : [],
    user : {},
    error : null,
    isUserDeleted : false,
    isUserUpdated : false
}

const usersSlice = createSlice({
    name : 'users',
    initialState,
    reducers : {
        getUsersRequest : (state, action) => {
            return {
                ...state,
                loading : true
            }
        },
        getUsersSuccess : (state, action) => {
            return {
                ...state,
                loading : false,
                users : action.payload.users
            }
        },
        getUsersFail : (state, action) => {
            return {
                ...state,
                loading : false,
                error : action.payload
            }
        },
        getUserRequest : (state, action) => {
            return {
                ...state,
                loading : true
            }
        },
        getUserSuccess : (state, action) => {
            return {
                ...state,
                loading : false,
                user : action.payload.user
            }
        },
        getUserFail : (state, action) => {
            return {
                ...state,
                loading : false,
                error : action.payload
            }
        },
        userUpdateRequest : (state, action) => {
            return {
                ...state,
                loading : true
            }
        },
        userUpdatedSuccess : (state, action) => {
            return {
                ...state,
                loading : false,
                isUserUpdated : true
            }
        },
        userUpdatedFail : (state, action) => {
            return {
                ...state,
                loading : false,
                error : action.payload
            }
        },
        clearUserUpdated : (state, action) => {
            return {
                ...state,
                isUserUpdated : false
            }
        },
        userDeleteRequest : (state, action) => {
            return {
                ...state,
                loading : true
            }
        },
        userDeleteSuccess : (state, action) => {
            return {
                ...state,
                loading : false,
                isUserDeleted : true
            }
        },
        userDeleteFail : (state, action) => {
            return {
                ...state,
                loading : false,
                error : action.payload
            }
        },
        clearUserDeleted : (state, action) => {
            return {
                ...state,
                isUserDeleted : false
            }
        },
        clearUserError : (state, action) => {
            return {
                ...state,
                error : null
            }
        }
    }
})

export default usersSlice.reducer

export const {
    getUsersRequest,
    getUsersSuccess,
    getUsersFail,
    getUserRequest,
    getUserSuccess,
    getUserFail,
    userDeleteRequest,
    userDeleteSuccess,
    userDeleteFail,
    userUpdateRequest,
    userUpdatedSuccess,
    userUpdatedFail,
    clearUserDeleted,
    clearUserUpdated,
    clearUserError
} = usersSlice.actions