import axios from "axios";
import { getAccessToken, setAccessToken, setRefreshToken } from "../services/token.service";
import tokenAPI from "./token.api";
import config from "../config";

let apiServerClient = axios.create({
  baseURL: config.API_SERVER_URL
});

apiServerClient.interceptors.request.use(
  config => {
    const token = getAccessToken();
    if (token) {
      config.headers = { ...config.headers, authorization: `Bearer ${token}` };
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

apiServerClient.interceptors.response.use(
  function(response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function(error) {
    const originalRequest = error.config;
    //Failed status
    // if (!error.response) {
    //   alert("CONNECTION ERROR");
    // }
    //500 status
    if (error.response?.status === 500) {
      console.log("SOMETHING WENT WRONG :(");
    }
    //401 status
    if (
      error.response?.status === 401 &&
      !(error.config.url === "/refresh-token" || error.config.url === "/auth/login" || error.config.url === "/auth/google" || error.config.url === "/auth/facebook")
    ) {
      return tokenAPI
        .refreshToken()
        .then(({ data }) => {
          setAccessToken(data.accessToken);
          setRefreshToken(data.refreshToken);
          return apiServerClient(originalRequest);
        })
        .catch(error => {
          return Promise.reject(error);
        });
    }
    return Promise.reject(error);
  }
);

export default apiServerClient;
