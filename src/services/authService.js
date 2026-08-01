import api from "../api/api";

// Warm up the server with a health check before login
const warmupServer = async () => {
    try {
        await api.get("/health", {
            timeout: 5000
        });
        return true;
    } catch (error) {
        console.log("Server not ready, waiting...");
        return false;
    }
};

// Wait for server to be ready with exponential backoff
const waitForServer = async (maxAttempts = 6) => {
    let attempt = 0;
    while (attempt < maxAttempts) {
        const isReady = await warmupServer();
        if (isReady) {
            console.log("Server is ready!");
            return true;
        }
        attempt++;
        // Exponential backoff: 2s, 4s, 8s, 16s, 32s, 64s
        const delay = Math.min(2000 * Math.pow(2, attempt - 1), 64000);
        console.log(`Attempt ${attempt}/${maxAttempts} failed. Waiting ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
    }
    return false;
};

export const loginUser = async (data) => {
    // First, try to warm up the server (up to 6 attempts with exponential backoff)
    console.log("Checking if server is ready...");
    const isReady = await waitForServer(6);

    if (!isReady) {
        throw new Error("Server is not responding. Please try again in a moment.");
    }

    // Once server is ready, attempt login with retries
    let lastError;
    const maxLoginAttempts = 2;

    for (let attempt = 1; attempt <= maxLoginAttempts; attempt++) {
        try {
            return await api.post("/auth/login", data, {
                timeout: 60000 // 60 seconds for login itself
            });
        } catch (error) {
            lastError = error;

            // Check if it's a timeout error
            const isTimeout = error.code === 'ECONNABORTED' ||
                            error.message?.includes('timeout') ||
                            error.message?.includes('ECONNABORTED');

            // Only retry on timeout, not on auth errors
            if (isTimeout && attempt < maxLoginAttempts) {
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
    // Warm up server before register too
    const isReady = await warmupServer();
    if (!isReady) {
        // Don't need full wait, just attempt immediately if health check fails
        console.log("Server warmup check failed, attempting register anyway...");
    }

    return await api.post("/auth/register", data, {
        timeout: 60000
    });
};