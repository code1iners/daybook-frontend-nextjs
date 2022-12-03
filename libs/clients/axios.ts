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
    console.error("request");
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
    const __error__ = { ...error };

    if ("response" in error) {
      __error__.response.data = {
        ok: false,
        message: __error__.response.data.message || __error__.message,
      };
    } else {
      __error__.response = {
        data: { ok: false, message: __error__.message },
      };
    }

    return __error__.response;
  }
);
