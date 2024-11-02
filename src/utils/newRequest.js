import axios from "axios";

const newRequest = axios.create({
  baseURL: "https://projectmanagement-backend-sqb4.onrender.com",
  // baseURL: process.env.REACT_APP_BASE_URL,
  withCredentials: true,
});

export default newRequest;
