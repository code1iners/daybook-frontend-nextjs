import axios from "axios";
import { Environments } from "@/constants/environments";
import { getAccessTokenFromSession } from "@/libs/clients/storage-helpers";

export const axiosClient = axios.create({
  baseURL: Environments.BaseOrigin,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use(
  (request) => {
    try {
      const accessToken = getAccessTokenFromSession();
      return {
        ...request,
        headers: {
          ...(accessToken && { token: accessToken }),
        },
      };
    } catch (error) {
      console.error(error);
      return request;
    }
  },
  (error) => {
    return error;
  }
);
axiosClient.interceptors.response.use(
  (response) => {
    response.data = {
      ...response.data,
      ok: true,
    };
    return response;
  },
  (error) => {
    error.response.data = {
      ok: false,
    };
    return error.response;
  }
);
