import actionTypes from '../actions/actionTypes';

const initialState = {
    genders: [],
    roles: [],
    positions: [],
    users: [],
    doctors: [],
    allDoctors: [],
    inforDoctorDetail: {},
    times: [],
    availableSchedule: [],
    doctorInfor: {},
    doctorProfile: {}
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_DATA_GENDER_START:
            return {
                ...state
            }
        case actionTypes.FETCH_DATA_GENDER_SUCCESS:
            let copySate = { ...state };
            copySate.genders = action.data;

            return {
                ...copySate
            }
        case actionTypes.FETCH_DATA_GENDER_FAILED:
            state.genders = []
            return {
                ...state
            }
        case actionTypes.FETCH_DATA_ROLE_SUCCESS:
            state.roles = action.data
            return {
                ...state
            }
        case actionTypes.FETCH_DATA_ROLE_FAILED:
            state.roles = []
            return {
                ...state
            }
        case actionTypes.FETCH_DATA_POSITION_SUCCESS:
            state.positions = action.data
            return {
                ...state
            }

        case actionTypes.FETCH_DATA_POSITION_FAILED:
            state.positions = []
            return {
                ...state
            }

        case actionTypes.CREATE_USER_SUCCESS:
            return {
                ...state
            }

        case actionTypes.CREATE_USER_FAILED:
            return {
                ...state
            }

        case actionTypes.GET_ALL_USER_SUCCESS:
            state.users = action.data
            return {
                ...state
            }

        case actionTypes.GET_ALL_USER_FAILED:
            state.users = []
            return {
                ...state
            }

        case actionTypes.DELETE_USER_SUCCESS:
            return {
                ...state
            }

        case actionTypes.DELETE_USER_FAILED:
            return {
                ...state
            }

        case actionTypes.UPDATE_USER_SUCCESS:
            return {
                ...state
            }

        case actionTypes.UPDATE_USER_FAILED:
            return {
                ...state
            }

        case actionTypes.GET_TOP_DOCTOR_SUCCESS:
            state.doctors = action.data
            return {
                ...state
            }

        case actionTypes.GET_TOP_DOCTOR_FAILED:
            state.doctors = []
            return {
                ...state
            }
        case actionTypes.GET_ALL_DOCTOR_SUCCESS:
            state.allDoctors = action.data
            return {
                ...state
            }

        case actionTypes.GET_ALL_DOCTOR_FAILED:
            state.allDoctors = []
            return {
                ...state
            }

        case actionTypes.SAVE_INFOR_DOCTOR_SUCCESS:
            console.log('check reducer SAVE_INFOR_DOCTOR_SUCCESS and data ', action.data)
            return {
                ...state
            }

        case actionTypes.SAVE_INFOR_DOCTOR_FAILED:
            return {
                ...state
            }
        case actionTypes.GET_DETAIL_DOCTOR_SUCCESS:
            state.inforDoctorDetail = action.data
            return {
                ...state
            }

        case actionTypes.GET_DETAIL_DOCTOR_FAILED:
            state.inforDoctorDetail = {}
            return {
                ...state
            }

        case actionTypes.FETCH_DATA_TIME_SUCCESS:
            state.times = action.data;

            return {
                ...state
            }
        case actionTypes.FETCH_DATA_TIME_FAILED:
            console.log('check reducer fecth data time failed')
            state.times = []
            return {
                ...state
            }

        case actionTypes.CREATE_SCHEDULE_SUCCESS:
            return {
                ...state
            }

        case actionTypes.CREATE_SCHEDULE_FAILED:
            return {
                ...state
            }

        case actionTypes.GET_AVAILABLE_SCHEDULE_SUCCESS:
            state.availableSchedule = action.data;
            return {
                ...state
            }

        case actionTypes.GET_AVAILABLE_SCHEDULE_FAILED:
            state.availableSchedule = [];
            return {
                ...state
            }

        case actionTypes.FETCH_DATA_DOCTOR_INFOR_SELECT_SUCCESS:
            state.doctorInfor = action.data;
            return {
                ...state
            }

        case actionTypes.FETCH_DATA_DOCTOR_INFOR_SELECT_SUCCESS:
            state.doctorInfor = {};
            return {
                ...state
            }

        case actionTypes.FETCH_DATA_PROFILE_DOCTOR_SELECT_SUCCESS:
            state.doctorProfile = action.data;
            return {
                ...state
            }

        case actionTypes.FETCH_DATA_DOCTOR_INFOR_SELECT_SUCCESS:
            state.doctorProfile = {};
            return {
                ...state
            }
        default:
            return state;
    }
}

export default adminReducer;