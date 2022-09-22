import axios from 'axios';

const instance = axios.create({
    baseURL: "https://note-app-server.onrender.com",
    // baseURL: "https://note-app-server-v1.herokuapp.com",
    // timeout: 2,
    // baseURL: "http://localhost:5632",
});

export default instance;