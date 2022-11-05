import axios from "axios";
import setAuthToken from "../Utils/setAuthToken";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

// Login User
export const login = async (data) => {
  const res = await axios.post("/api/auth/login", data, config);
  return res;
};

export const loadUser = async () => {

  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  const res = await axios.get("/api/auth/me", config);
  console.log(res);
  return res;
};

