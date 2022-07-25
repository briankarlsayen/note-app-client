import axios from 'axios';

const instance = axios.create({
    baseURL: "https://note-app-server-v1.herokuapp.com",
    timeout: 2,
    // baseURL: "http://localhost:5632",
});

instance.interceptors.request.use(function (config) {
    config.headers.Authorization = localStorage.getItem('token');
    return config;
});

export default instance;