import actionTypes from './actionTypes';
import { handleGetAllCode, handleCreateNewUserService, handleGetAllUsersService, handleDeleteUserService, handleUpdateUserService, handleGetTopDoctor } from '../../services/userService'
import { toast } from 'react-toastify';


export const fetchDataGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await handleGetAllCode('GENDER');
            if (res && res.errCode === 0) {
                dispatch(fetchDataGenderSuccess(res.data));
            } else {
                dispatch(fetchDataGenderFailed());
            }
        } catch (error) {
            console.log('error fetch data gender start ', error)
            dispatch(fetchDataGenderFailed())
        }
    }
}


export const fetchDataGenderSuccess = (data) => ({
    type: actionTypes.FETCH_DATA_GENDER_SUCCESS,
    data: data
})


export const fetchDataGenderFailed = () => ({
    type: actionTypes.FETCH_DATA_GENDER_FAILED
})

export const fetchDataRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await handleGetAllCode('ROLE')
            if (res && res.errCode === 0) {
                dispatch(fetchDataRoleSuccess(res.data))
            } else {
                dispatch(fetchDataRoleSuccess())
            }
        } catch (error) {
            console.log('error fetch data role start ', error)
            dispatch(fetchDataRoleSuccess())
        }
    }
}

export const fetchDataRoleSuccess = (data) => ({
    type: actionTypes.FETCH_DATA_ROLE_SUCCESS,
    data: data
})


export const fetchDataRoleFailed = () => ({
    type: actionTypes.FETCH_DATA_ROLE_FAILED
})


export const fetchDataPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await handleGetAllCode('POSITION');
            if (res && res.errCode === 0) {
                dispatch(fetchDataPositionSuccess(res.data))
            } else {
                dispatch(fetchDataPositionFailed())
            }
        } catch (error) {
            console.log('error fetch data position start ', error)
            dispatch(fetchDataPositionFailed())
        }
    }
}

export const fetchDataPositionSuccess = (data) => ({
    type: actionTypes.FETCH_DATA_POSITION_SUCCESS,
    data: data
})

export const fetchDataPositionFailed = () => ({
    type: actionTypes.FETCH_DATA_POSITION_FAILED
})


export const createUserStart = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await handleCreateNewUserService(data);
            if (res && res.errCode === 0) {
                toast.success('Create user success')
                dispatch(createUserSuccess())
                dispatch(getAllUserStart())
            } else {
                toast.error('Create user failed')
                dispatch(createUserFailed())
            }
        } catch (error) {
            console.log('error fetch create user start ', error)
            toast.error('Create user success')
            dispatch(createUserFailed())
        }
    }
}

export const createUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS
})

export const createUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED
})

export const getAllUserStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await handleGetAllUsersService('ALL');
            console.log('check get data all user ', res)
            if (res && res.errCode === 0) {
                dispatch(getAllUserSuccess(res.userData.reverse()))
            } else {
                dispatch(getAllUserFailed)
            }
        } catch (error) {
            console.log('error fetch get all  user start ', error)
            dispatch(getAllUserFailed)
        }
    }
}

export const getAllUserSuccess = (data) => ({
    type: actionTypes.GET_ALL_USER_SUCCESS,
    data: data,
})

export const getAllUserFailed = () => ({
    type: actionTypes.GET_ALL_USER_FAILED
})

export const deleteUserStart = (userId) => {
    return async (dispatch, getState) => {
        try {
            let res = await handleDeleteUserService(userId);
            console.log('check res delete user  ', res)
            if (res && res.errCode === 0) {
                toast.success('Delete user success')
                dispatch(deleteUserSuccess())
                dispatch(getAllUserStart())
            } else {
                toast.error('Delete user failed')
                dispatch(deleteUserFailed)
            }
        } catch (error) {
            console.log('error fetch get all  user start ', error)
            toast.error('Delete user failed')
            dispatch(deleteUserFailed)
        }
    }
}

export const deleteUserSuccess = () => ({
    type: actionTypes.GET_ALL_USER_SUCCESS
})

export const deleteUserFailed = () => ({
    type: actionTypes.GET_ALL_USER_FAILED
})

export const updateUserStart = (user) => {
    return async (dispatch, getState) => {
        try {
            let res = await handleUpdateUserService(user);
            console.log('check res update user  ', res)
            if (res && res.errCode === 0) {
                toast.success('Update user success')
                dispatch(updateUserSuccess())
                dispatch(getAllUserStart())
            } else {
                toast.error('update user failed')
                dispatch(updateUserFailed)
            }
        } catch (error) {
            console.log('error fetch update  user start ', error)
            toast.error('Update user failed')
            dispatch(updateUserFailed)
        }
    }
}

export const updateUserSuccess = () => ({
    type: actionTypes.UPDATE_USER_SUCCESS
})

export const updateUserFailed = () => ({
    type: actionTypes.UPDATE_USER_FAILED
})

export const getTopDoctorStart = (numberGet) => {
    return async (dispatch, getState) => {
        try {
            let res = await handleGetTopDoctor(+numberGet);
            console.log('check res user from get doctor', res)
            if (res && res.errCode === 0) {
                console.log('into success from check res doctor')
                dispatch(getTopDoctorSuccess(res.data))
            } else {
                dispatch(getTopDoctorFailed())
            }
        } catch (error) {
            console.log('error fetch doctor start ', error)
            dispatch(getTopDoctorFailed())
        }
    }
}

export const getTopDoctorSuccess = (data) => ({
    type: actionTypes.GET_TOP_DOCTOR_SUCCESS,
    data: data
})

export const getTopDoctorFailed = () => ({
    type: actionTypes.GET_TOP_DOCTOR_FAILED
})