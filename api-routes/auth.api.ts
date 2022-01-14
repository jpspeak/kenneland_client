import apiServerClient from "./api-server-client";
import { IAccessToken, IUser } from "../types";
import { getRefreshToken } from "../services/token.service";

interface ILoginResponse extends IAccessToken {
  user: IUser;
}
const googleLogin = (tokenId: string) => {
  return apiServerClient.post<{}, ILoginResponse>("/auth/google", {
    idToken: tokenId
  });
};

const facebookLogin = (accessToken: string) => {
  return apiServerClient.post<{}, ILoginResponse>("/auth/facebook", {
    accessToken
  });
};

const login = (credentials: { email: string; password: string }) => {
  return apiServerClient.post<{}, ILoginResponse>("/auth/login", credentials);
};

const register = (credentials: { email: string; password: string; passwordConfirm: string }) => {
  return apiServerClient.post<{}, ILoginResponse>("/auth/register", credentials);
};

const logout = () => {
  const refreshToken = getRefreshToken();
  return apiServerClient.post("/auth/logout", { refreshToken });
};
const authAPI = { googleLogin, login, register, logout, facebookLogin };
export default authAPI;
