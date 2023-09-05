import { rootStore } from "@stores/root";
import axios, { HttpStatusCode } from "axios";
import queryString from "query-string";

const axiosClient = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "content-type": "application/json",
  },
  paramsSerializer: {
    serialize: params => queryString.stringify(params),
  },
});

axiosClient.interceptors.request.use(config => {
  const { accessToken } = rootStore.userStore;
  if (accessToken) {
    config.headers["Authorization"] = `Bearer ${accessToken}`;
  }

  return config;
});

axiosClient.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    // Handle errors
    if (error.response) {
      // Server-side error (has HTTP status code)
      if (error.response.status === HttpStatusCode.Unauthorized) {
        rootStore.userStore.logout();
      }
      console.error("[SERVER-SIDE] Error:", error.response);
    } else if (error.request) {
      // Request-related error (cannot connect, timeout, etc.)
      console.error("[CLIENT-SIDE] Error:", error.message);
    } else {
      // Others error
      console.error("[AXIOS] Error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
