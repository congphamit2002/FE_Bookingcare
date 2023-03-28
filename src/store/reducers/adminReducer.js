import actionTypes from '../actions/actionTypes';

const initialState = {
    genders: [],
    roles: [],
    positions: [],
    users: [],
    doctors: [],
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_DATA_GENDER_START:
            console.log('check reducer fecth data gender start')
            return {
                ...state
            }
        case actionTypes.FETCH_DATA_GENDER_SUCCESS:
            console.log('check reducer fecth data gender success and data ', action.data)
            let copySate = { ...state };
            copySate.genders = action.data;

            return {
                ...copySate
            }
        case actionTypes.FETCH_DATA_GENDER_FAILED:
            console.log('check reducer fecth data gender failed')
            state.genders = []
            return {
                ...state
            }
        case actionTypes.FETCH_DATA_ROLE_SUCCESS:
            console.log('check reducer fecth data ROLE success and data ', action.data)
            state.roles = action.data
            return {
                ...state
            }
        case actionTypes.FETCH_DATA_ROLE_FAILED:
            console.log('check reducer fecth data ROLE failed')
            state.roles = []
            return {
                ...state
            }
        case actionTypes.FETCH_DATA_POSITION_SUCCESS:
            console.log('check reducer fetch data position success and data ', action.data)
            state.positions = action.data
            return {
                ...state
            }

        case actionTypes.FETCH_DATA_POSITION_FAILED:
            console.log('check reducer fecth data position failed')
            state.positions = []
            return {
                ...state
            }

        case actionTypes.CREATE_USER_SUCCESS:
            console.log('check reducer CREATE_USER_SUCCESS')
            return {
                ...state
            }

        case actionTypes.CREATE_USER_FAILED:
            console.log('check reducer CREATE_USER_FAILED')
            return {
                ...state
            }

        case actionTypes.GET_ALL_USER_SUCCESS:
            state.users = action.data
            console.log('check reducer GET_ALL_USER_SUCCESS and data ', action.data)
            return {
                ...state
            }

        case actionTypes.GET_ALL_USER_FAILED:
            state.users = []
            console.log('check reducer GET_ALL_USER_FAILED')
            return {
                ...state
            }

        case actionTypes.DELETE_USER_SUCCESS:
            console.log('check reducer DELETE_USER_SUCCESS')
            return {
                ...state
            }

        case actionTypes.DELETE_USER_FAILED:
            console.log('check reducer DELETE_USER_FAILED')
            return {
                ...state
            }

        case actionTypes.UPDATE_USER_SUCCESS:
            console.log('check reducer UPDATE_USER_SUCCESS')
            return {
                ...state
            }

        case actionTypes.UPDATE_USER_FAILED:
            console.log('check reducer UPDATE_USER_FAILED')
            return {
                ...state
            }

        case actionTypes.GET_TOP_DOCTOR_SUCCESS:
            state.doctors = action.data
            console.log('check reducer GET_TOP_DOCTOR_SUCCESS and data ', action.data)
            return {
                ...state
            }

        case actionTypes.GET_TOP_DOCTOR_FAILED:
            state.doctors = []
            console.log('check reducer GET_TOP_DOCTOR_FAILED')
            return {
                ...state
            }
        default:
            return state;
    }
}

export default adminReducer;