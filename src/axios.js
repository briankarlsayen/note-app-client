import axios from 'axios';

const instance = axios.create({
    baseURL: "https://note-app-server-v1.herokuapp.com",
    // baseURL: "http://localhost:5090",
});

export default instance;