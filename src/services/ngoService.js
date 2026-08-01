import api from "../api/api";

export const createNgo = (ngo) => {
  return api.post("/ngos", ngo);
};

export const getAllNgos = () => {
  return api.get("/ngos");
};

