import api from "../api/api";

export const createDonation = async (donation) => {
    return await api.post("/donations", donation);
};

export const getAllDonations = async () => {
    return await api.get("/donations");
};

export const getAvailableDonations = async () => {
    return await api.get("/donations/available");
};