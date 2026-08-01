import api from "../api/api";

export const loginUser = async (data) => {
    // Increase timeout for login to handle cold server starts
    // Add automatic retry on timeout (up to 2 attempts)
    let lastError;
    const maxAttempts = 2;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
            return await api.post("/auth/login", data, {
                timeout: 120000 // 120 seconds for login to handle cold server starts
            });
        } catch (error) {
            lastError = error;

            // Check if it's a timeout error
            const isTimeout = error.code === 'ECONNABORTED' ||
                            error.message?.includes('timeout') ||
                            error.message?.includes('ECONNABORTED');

            // Only retry on timeout, not on auth errors
            if (isTimeout && attempt < maxAttempts) {
                console.log(`Login timeout on attempt ${attempt}. Retrying...`);
                // Wait 2 seconds before retry
                await new Promise(resolve => setTimeout(resolve, 2000));
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
        timeout: 120000 // Also increase for register
    });
};