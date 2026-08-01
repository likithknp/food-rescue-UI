import api from "../api/api";

export const loginUser = async (data) => {
    // Login with intelligent retry strategy for cold server starts
    // The backend on Render free tier can take 60+ seconds to start
    let lastError;
    const maxAttempts = 3;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
            console.log(`Login attempt ${attempt}/${maxAttempts}...`);
            return await api.post("/auth/login", data, {
                timeout: 180000 // 180 seconds = 3 minutes (handles cold start + processing)
            });
        } catch (error) {
            lastError = error;

            // Check if it's a timeout error
            const isTimeout = error.code === 'ECONNABORTED' ||
                            error.message?.includes('timeout') ||
                            error.message?.includes('ECONNABORTED');

            // Only retry on timeout, not on auth errors
            if (isTimeout && attempt < maxAttempts) {
                console.log(`Login timeout on attempt ${attempt}. Retrying in 5 seconds...`);
                // Wait 5 seconds before retry to let server fully start
                await new Promise(resolve => setTimeout(resolve, 5000));
                continue;
            }

            // If not a timeout or last attempt, throw the error
            throw error;
        }
    }

    throw lastError;
};

export const registerUser = async (data) => {
    return await api.post("/auth/register", data, {
        timeout: 180000 // Also increase for register
    });
};