import axios from "axios";
import setAuthToken from "../Utils/setAuthToken";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const createProductinvoice = async (data) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  const res = await axios.post("/api/invoices/product", data, config);
  return res;
};

export const getAllProductinvoices = async () => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  const res = await axios.get("/api/invoices/product", config);
  return res;
};

export const getSingleProductinvoice = async (id) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  const res = await axios.get(`/api/invoices/${id}`, config);
  return res;
};

export const finishProductinvoice = async (data) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  const res = await axios.post("/api/invoices/finish", data, config);
  return res;
};
