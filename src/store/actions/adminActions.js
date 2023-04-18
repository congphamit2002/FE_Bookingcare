import actionTypes from './actionTypes';
import {
    handleGetAllCode, handleCreateNewUserService,
    handleGetAllUsersService, handleDeleteUserService,
    handleUpdateUserService, handleGetTopDoctor,
    handleGetAllDoctor, handleSaveInforDoctor,
    handleGetDetailInforDoctor, handleCreateSchedule,
    handleGetAvailableSchedule, handleGetProfileDoctorById
} from '../../services/userService'
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
                dispatch(fetchDataRoleFailed())
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

export const getAllDoctorStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await handleGetAllDoctor();
            console.log('check res doctor from get all doctor', res)
            if (res && res.errCode === 0) {
                console.log('into success from check res get all doctor')
                dispatch(getAllDoctorSuccess(res.data))
            } else {
                dispatch(getAllDoctorFailed())
            }
        } catch (error) {
            console.log('error fetch all doctor start ', error)
            dispatch(getAllDoctorFailed())
        }
    }
}

export const getAllDoctorSuccess = (data) => ({
    type: actionTypes.GET_ALL_DOCTOR_SUCCESS,
    data: data
})

export const getAllDoctorFailed = () => ({
    type: actionTypes.GET_ALL_DOCTOR_FAILED
})


export const saveInforDoctorStart = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await handleSaveInforDoctor(data);
            console.log('check res save infor doctor', res)
            if (res && res.errCode === 0) {
                console.log('into success from save infor doctor')
                dispatch(saveInforDoctorSuccess())
                toast.success('Save infor doctor success')
            } else {
                toast.error('Save infor doctor failed')
                dispatch(saveInforDoctorFailed())
            }
        } catch (error) {
            console.log('error save infor doctor ', error)
            dispatch(saveInforDoctorFailed())
        }
    }
}

export const saveInforDoctorSuccess = () => ({
    type: actionTypes.SAVE_INFOR_DOCTOR_SUCCESS
})

export const saveInforDoctorFailed = () => ({
    type: actionTypes.SAVE_INFOR_DOCTOR_SUCCESS
})

export const getDetailInforDoctorStart = (doctorId) => {
    return async (dispatch, getState) => {
        try {
            let res = await handleGetDetailInforDoctor(doctorId);
            if (res && res.errCode === 0) {
                dispatch(getDetailInforDoctorSuccess(res.data))
            } else {
                dispatch(getDetailInforDoctorFailed())
            }
        } catch (error) {
            console.log('error get detail infor doctor ', error)
            dispatch(getDetailInforDoctorFailed())
        }
    }
}

export const getDetailInforDoctorSuccess = (data) => ({
    type: actionTypes.GET_DETAIL_DOCTOR_SUCCESS,
    data: data
})

export const getDetailInforDoctorFailed = () => ({
    type: actionTypes.GET_DETAIL_DOCTOR_FAILED
})


export const fetchDataTimeStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await handleGetAllCode('TIME')
            if (res && res.errCode === 0) {
                dispatch(fetchDataTimeSuccess(res.data))
            } else {
                dispatch(fetchDataTimeFailed())
            }
        } catch (error) {
            console.log('error fetch data Time start ', error)
            dispatch(fetchDataTimeFailed())
        }
    }
}

export const fetchDataTimeSuccess = (data) => ({
    type: actionTypes.FETCH_DATA_TIME_SUCCESS,
    data: data
})


export const fetchDataTimeFailed = () => ({
    type: actionTypes.FETCH_DATA_TIME_FAILED
})


export const createScheduleStart = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await handleCreateSchedule(data)
            if (res && res.errCode === 0) {
                toast.success('Create schedule successfully')
                dispatch(createScheduleSuccess())
            } else {
                toast.error('Create schedule failed')
                dispatch(createScheduleFailed())
            }
        } catch (error) {
            console.log('error fetch data Time start ', error)
            toast.error('Create schedule failed')
            dispatch(createScheduleFailed())
        }
    }
}

export const createScheduleSuccess = (data) => ({
    type: actionTypes.CREATE_SCHEDULE_SUCCESS,
})


export const createScheduleFailed = () => ({
    type: actionTypes.CREATE_SCHEDULE_FAILED
})

export const getAvailableScheduleStart = (doctorId, date) => {
    return async (dispatch, getState) => {
        try {
            let res = await handleGetAvailableSchedule(doctorId, date)
            if (res && res.errCode === 0) {
                dispatch(getAvailableScheduleSuccess(res.data))
            } else {
                dispatch(getAvailableScheduleFailed())
            }
        } catch (error) {
            console.log('error fetch data available schedule ', error)
            dispatch(getAvailableScheduleFailed())
        }
    }
}

export const getAvailableScheduleSuccess = (data) => ({
    type: actionTypes.GET_AVAILABLE_SCHEDULE_SUCCESS,
    data: data
})


export const getAvailableScheduleFailed = () => ({
    type: actionTypes.GET_AVAILABLE_SCHEDULE_FAILED
})

export const fetchDataDoctorInforSelectStart = () => {
    return async (dispatch, getState) => {
        try {
            let resPrice = await handleGetAllCode('PRICE')
            let resPayment = await handleGetAllCode('PAYMENT')
            let resProvince = await handleGetAllCode('PROVINCE')
            if (resPrice && resPrice.errCode === 0
                && resPayment && resPayment.errCode === 0
                && resProvince && resProvince.errCode === 0
            ) {
                let data = {}
                data.dataPrice = resPrice.data
                data.dataPayment = resPayment.data
                data.dataProvince = resProvince.data
                dispatch(fetchDataDoctorInforSelectSuccess(data))
            } else {
                dispatch(fetchDataDoctorInforSelectFailed())
            }
        } catch (error) {
            console.log('error fetch data role start ', error)
            dispatch(fetchDataDoctorInforSelectSuccess())
        }
    }
}

export const fetchDataDoctorInforSelectSuccess = (data) => ({
    type: actionTypes.FETCH_DATA_DOCTOR_INFOR_SELECT_SUCCESS,
    data: data
})


export const fetchDataDoctorInforSelectFailed = () => ({
    type: actionTypes.FETCH_DATA_DOCTOR_INFOR_SELECT_FAILED
})

export const fetchDataProfileDoctorStart = (doctorId) => {
    return async (dispatch, getState) => {
        try {
            let res = await handleGetProfileDoctorById(doctorId)
            if (res && res.errCode === 0
            ) {
                console.log('check profile doctor success and data ', res.data)
                dispatch(fetchDataProfileDoctorSuccess(res.data))
            } else {
                dispatch(fetchDataProfileDoctorFailed())
            }
        } catch (error) {
            console.log('error fetch data role start ', error)
            dispatch(fetchDataProfileDoctorSuccess())
        }
    }
}

export const fetchDataProfileDoctorSuccess = (data) => ({
    type: actionTypes.FETCH_DATA_PROFILE_DOCTOR_SELECT_SUCCESS,
    data: data
})


export const fetchDataProfileDoctorFailed = () => ({
    type: actionTypes.FETCH_DATA_PROFILE_DOCTOR_SELECT_FAILED
})