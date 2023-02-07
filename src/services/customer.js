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
