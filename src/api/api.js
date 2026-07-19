import axios from "axios";

// Use localhost for development, fallback to remote URL for production
const backendURL = import.meta.env.VITE_API_URL || "http://localhost:8081/api";

const api = axios.create({
    baseURL: backendURL,
    timeout: 30000, // 30s timeout to handle slow connections
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