import { AxiosResponse } from "axios";
import apiServerClient from "./api-server-client";
import { getRefreshToken } from "../services/token.service";
import { IAccessToken } from "../types";

const refreshToken: () => Promise<AxiosResponse<IAccessToken>> = () => {
  return apiServerClient.post("/refresh-token", {
    refreshToken: getRefreshToken()
  });
};

const tokenAPI = { refreshToken };
export default tokenAPI;
