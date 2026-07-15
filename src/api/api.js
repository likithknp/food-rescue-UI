import axios from "axios";

const api = axios.create({
    baseURL: "https://food-rescue-backend-kcdx.onrender.com/api",
    headers: {
        "Content-Type": "application/json"
    }
});

// Attach token from localStorage (if present) to each request
api.interceptors.request.use(
  (config) => {
    try {
      const token = localStorage.getItem("authToken");
      if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch {
      // ignore localStorage errors
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;