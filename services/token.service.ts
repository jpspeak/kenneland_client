import { destroyCookie, parseCookies, setCookie } from "nookies";

//Client side
let accessToken = "";

export const setAccessToken = (token: string) => {
  accessToken = token;
};

export const getAccessToken = () => {
  return accessToken;
};

export const deleteAccessToken = () => {
  accessToken = "";
};

export const setRefreshToken = (token: string) => {
  setCookie(null, "token", token, {
    maxAge: 7 * 24 * 60 * 60,
    path: "/"
  });
};

export const getRefreshToken = () => {
  const cookies = parseCookies();
  return cookies.token || "";
};

export const deleteRefreshToken = () => {
  destroyCookie(null, "token");
};

//Server side
let serverAccessToken = "";

export const setServerAccessToken = (token: string) => {
  serverAccessToken = token;
};

export const getServerAccessToken = () => {
  return serverAccessToken;
};
