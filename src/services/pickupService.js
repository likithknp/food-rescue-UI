import api from "../api/api";

export const createPickupRequest = async (request) => {
    return await api.post("/requests", request);
};

export const getAllPickupRequests = async () => {
    return await api.get("/requests");
};