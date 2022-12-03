import axios from "axios";

export const axiosClient = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => error.response
);
