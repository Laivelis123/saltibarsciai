import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001/api",
  headers: {
    "Content-type": "application/json",
  },
});

export default api;
