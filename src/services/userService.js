import axios from "../axios";

const handleLoginApi = (email, password) => {
    return axios.post('/api/login', {
        email: email,
        password: password
    })
}

const handleGetAllUsersService = (userId) => {
    return axios.get(`/api/get-all-user?id=${userId}`)
}

const handleCreateNewUserService = (data) => {
    return axios.post('/api/create-new-user', data);
}

const handleDeleteUserService = (userId) => {
    return axios.get(`/api/delete-user?id=${userId}`)
}

const handleUpdateUserService = (data) => {
    return axios.post('/api/update-user', data)
}

const handleGetAllCode = (type) => {
    return axios.get(`/api/getAllCode?type=${type}`);
}

const handleGetTopDoctor = (numberGet) => {
    return axios.get(`/api/getTopDoctor?numberGet=${numberGet}`)
}

const handleGetAllDoctor = () => {
    return axios.get('/api/getAllDoctor');
}

const handleSaveInforDoctor = (data) => {
    return axios.post('/api/saveInforDoctor', data)
}

const handleGetDetailInforDoctor = (id) => {
    return axios.get(`/api/get-doctor-infor?id=${id}`)
}


const handleCreateSchedule = (data) => {
    return axios.post('/api/create-schedule', data)
}

const handleGetAvailableSchedule = (doctorId, date) => {
    return axios.get(`/api/get-available-schedule?doctorId=${doctorId}&date=${date}`)
}

const handleGetProfileDoctorById = (doctorId) => {
    return axios.get(`/api/get-doctor-profile-by-id?doctorId=${doctorId}`)
}

const handleCreateAnAppointment = (data) => {
    return axios.post('/api/createAnAppointment', data)
}

const handleVerifyAnAppointment = (data) => {
    return axios.post('/api/verify-book-appointment', data)
}

const handleCreateSpecialty = (data) => {
    return axios.post('/api/createASpecialty', data)
}

const handleGetAllSpecialties = (data) => {
    return axios.get('/api/get-all-specialties', data)
}
export {
    handleLoginApi,
    handleGetAllUsersService,
    handleCreateNewUserService,
    handleDeleteUserService,
    handleUpdateUserService,
    handleGetAllCode,
    handleGetTopDoctor,
    handleGetAllDoctor,
    handleSaveInforDoctor,
    handleGetDetailInforDoctor,
    handleCreateSchedule,
    handleGetAvailableSchedule,
    handleGetProfileDoctorById,
    handleCreateAnAppointment,
    handleVerifyAnAppointment,
    handleCreateSpecialty,
    handleGetAllSpecialties
}  