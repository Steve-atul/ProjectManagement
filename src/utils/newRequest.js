import axios from "axios";

const newRequest = axios.create({
  baseURL: "https://projectmanagement-backend-971d.onrender.com",
  // baseURL: process.env.REACT_APP_BASE_URL,
  withCredentials: true,
});

export default newRequest;
