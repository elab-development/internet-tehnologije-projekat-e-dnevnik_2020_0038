import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
  withCredentials: true,
});

const csrfToken = document
  .querySelector('meta[name="csrf-token"]')
  .getAttribute("content");
api.defaults.headers.common["X-CSRF-TOKEN"] = csrfToken;

export default api;
