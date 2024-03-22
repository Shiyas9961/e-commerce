import { 
    loginRequest, 
    loginSuccess, 
    loadUserFail, 
    loginFail, 
    clearError, 
    registerFail, 
    registerSuccess, 
    registerRequest, 
    loadUserRequest, 
    loadUserSuccess, 
    logoutFail, 
    logoutSuccess, 
    editProfileFail, 
    editProfileRequest, 
    editProfileSuccess, 
    changePasswordFail, 
    changePasswordRequest, 
    changePasswordSuccess, 
    forgotPasswordFail, 
    forgotPasswordRequest, 
    forgotPasswordSuccess, 
    resetPasswordFail, 
    resetPasswordRequest, 
    resetPasswordSuccess, 
    clearIsUpdated,
    clearMessage
} from '../slices/authSlice'
import { BASE_URL } from '../baseUrl'
import { privateAxios } from '../baseAxios'
import { getUserFail, getUserRequest, getUserSuccess, getUsersFail, getUsersRequest, getUsersSuccess, userDeleteFail, userDeleteRequest, userDeleteSuccess, userUpdateRequest, userUpdatedFail, userUpdatedSuccess } from '../slices/usersSlice'


//Login user
export const loginUser = (email, password) => {
    return async (dispatch) => {
        
        try {
            dispatch(loginRequest())

            const { data } = await privateAxios.post(`${BASE_URL}/api/v1/login`, { email, password })
            
            dispatch(loginSuccess(data))
            
        } catch (error) {
            //Handle Error
            //console.log(error)
            dispatch(loginFail(error.response.data))
        }
    }
}
    
//Register user
export const registerUser = ( userData ) => {
    return async (dispatch) => {
        try{

            dispatch(registerRequest())

            const { data } = await privateAxios.post(`${BASE_URL}/api/v1/register`, userData, { headers : { 'Content-Type' : 'multipart/form-data' } })

            dispatch(registerSuccess(data))
            
        }catch(error){
            //Handle Error
            dispatch(registerFail(error.response.data))
        }
    }
}
    
//get User Profile self
export const loadUser = async (dispatch) => {
    try{
        dispatch(loadUserRequest())
        const { data } = await privateAxios.get(`${BASE_URL}/api/v1/myProfile`)
        dispatch(loadUserSuccess(data))
    }catch(error){
        //Handle Error
        dispatch(loadUserFail(error.response.data.message))
    }
}

//Logout user
export const logoutUser = async (dispatch) => {
    try{
        await privateAxios.get(`${BASE_URL}/api/v1/logout`)
        dispatch(logoutSuccess())
    }catch(error){
        //Handle Error
        dispatch(logoutFail(error.response.data.message))
    }
}

//Edit user Profile self
export const editUser = (userData) => {
    return async (dispatch) => {
        try{
            dispatch(editProfileRequest())
            const { data } = await privateAxios.put(`${BASE_URL}/api/v1/update`, userData, { headers : { 'Content-Type' : 'multipart/form-data' } })
            dispatch(editProfileSuccess(data))
        }catch(error){
            //Handle Error
            dispatch(editProfileFail(error.response.data.message))
        }
    }
}
    
//Change Password
export const changePasswordAction = (formData) => {
    return async (dispatch) => {
        try{
            dispatch(changePasswordRequest())
            await privateAxios.put(`${BASE_URL}/api/v1/password/change`, formData, { headers : { 'Content-Type' : 'application/json' } })
            dispatch(changePasswordSuccess())
        }catch(error){
            //Handle Error
            dispatch(changePasswordFail(error.response.data.message))
        }
    }
}

//Forgot Password
export const forgotPasswordAction = (formData) => {
    return async (dispatch) => {
        try{
            dispatch(forgotPasswordRequest())

            const {data} = await privateAxios.post(`${BASE_URL}/api/v1/password/forgot`, formData, { headers : { 'Content-Type' : 'application/json' } })

            dispatch(forgotPasswordSuccess(data))
        }catch(error){
            //Handle Error
            dispatch(forgotPasswordFail(error.response.data.message))
        }
    }
}

//Reset Password
export const resetPasswordAction = (formData, token) => {
    return async (dispatch) => {
        try{
            dispatch(resetPasswordRequest())

            const { data } = await privateAxios.post(`${BASE_URL}/api/v1/password/reset/${token}`, formData, { headers : { 'Content-Type' : 'application/json' } })

            dispatch(resetPasswordSuccess(data))
        }catch(error){
            //Handle Error
            dispatch(resetPasswordFail(error.response.data.message))
        }
    }
}
    
//Clear Authslice Error 
export const clearAuthError = (dispatch) => {
    dispatch(clearError())
}

//Clear Authslice Updated 
export const clearIsUpdatedAction = (dispatch) => {
    dispatch(clearIsUpdated())
}

//Clear Authslice Forgot message
export const clearForgotMessage = (dispatch) => {
    dispatch(clearMessage())
}

//Get All User : Admin
export const getAllUsers = () => {
    return async (dispatch) => {
        try{
            dispatch(getUsersRequest())

            const { data } = await privateAxios.get(`${BASE_URL}/api/v1/admin/users`)

            dispatch(getUsersSuccess(data))
        }catch(error){
            dispatch(getUsersFail(error.response.data.message))
        }
    }
}

//Get Single User : Admin
export const getSingleUser = (id) => {
    return async (dispatch) => {
        try{
            dispatch(getUserRequest())

            const { data } = await privateAxios.get(`${BASE_URL}/api/v1/admin/user/${id}`)

            dispatch(getUserSuccess(data))
        }catch(error){
            dispatch(getUserFail(error.response.data.message))
        }
    }
}

//Update User : Admin
export const updateUser = (id, formData) => {
    return async (dispatch) => {
        try{
            dispatch(userUpdateRequest())

            await privateAxios.put(`${BASE_URL}/api/v1/admin/user/${id}`, formData, { headers : { "Content-Type" : 'application/json' } })

            dispatch(userUpdatedSuccess())
        }catch(error){
            dispatch(userUpdatedFail(error.response.data.message))
        }
    }
}

//Delete User : Admin
export const deleteUser = (id) => {
    return async (dispatch) => {
        try{
            dispatch(userDeleteRequest())

            await privateAxios.delete(`${BASE_URL}/api/v1/admin/user/${id}`)

            dispatch(userDeleteSuccess())
        }catch(error){
            dispatch(userDeleteFail(error.response.data.message))
        }
    }
}