import axios from "axios";

const api = axios.create({
    baseURL: "https://food-rescue-backend-kcdx.onrender.com/api",
    headers: {
        "Content-Type": "application/json"
    }
});

export default api;