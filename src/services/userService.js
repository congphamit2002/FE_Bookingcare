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

export { handleLoginApi, handleGetAllUsersService, handleCreateNewUserService, handleDeleteUserService, handleUpdateUserService }  