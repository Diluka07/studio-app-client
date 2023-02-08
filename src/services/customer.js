import axios from "axios";
import setAuthToken from "../Utils/setAuthToken";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const customerRegister = async (data) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  const res = await axios.post("/api/customers", data, config);
  return res;
};

export const getAllCustomers = async () => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  const res = await axios.get("/api/customers", config);
  return res;
};


export const getSingleCustomer = async (id) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  const res = await axios.get(`/api/customers/${id}`, config);
  return res;
};


export const updateCustomer = async (data) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  const res = await axios.put(`/api/customers/`,data, config);
  return res;
};
