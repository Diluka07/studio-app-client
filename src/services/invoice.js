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
  console.log(data);
  const res = await axios.post("/api/invoices/product", data, config);
  return res;
};
