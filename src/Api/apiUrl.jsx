import axios from "axios";

let axiosInstance = axios.create({
  // baseURL: process.env.REACT_APP_BASE_URL,
  baseURL: "https://restapinodejs.onrender.com/api/",
});


export default axiosInstance;

