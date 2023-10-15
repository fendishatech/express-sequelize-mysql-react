import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:5000/api", // change this to your api url
});

export default axiosClient;
