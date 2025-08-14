import axios from "axios";

const api = axios.create({
    baseURL:"https://akil-backend.onrender.com",
    headers:{
        "Content-Type": "application/json"
    },
});

export default api;