import axios from "axios";

const API = axios.create({
  baseURL:
    "http://localhost:5000/api",

  withCredentials: true,
});


// TOKEN INTERCEPTOR
API.interceptors.request.use(
  (config) => {
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("token")
        : null;

    if (token) {
      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  }
);

export default API;