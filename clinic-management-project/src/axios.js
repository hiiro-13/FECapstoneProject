import axios from "axios";
export const HTTP = axios.create({
  baseURL: "http://localhost:80/api/",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});
export const HTTP_DJANGO = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
  headers: {
    "Content-Type": "application/json",
  },
});
