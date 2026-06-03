import axios from "axios";

const API_URL = "http://https://food-rescue-backend-kcdx.onrender.com/api/dashboard";

export const getDashboardStats = () => {
    return axios.get(`${API_URL}/stats`);
};