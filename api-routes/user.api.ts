import { IUser } from "../types";
import apiServerClient from "./api-server-client";

export interface IUpdateUserFormData {
  firstName: string;
  lastName: string;
}

const getMe = () => {
  return apiServerClient.get<IUser | null>("/users/me");
};

const getOne = (userId: string) => {
  return apiServerClient.get<IUser | null>(`/users/${userId}`);
};

const update = (userId: string, formData: FormData) => {
  return apiServerClient.post(`/users/${userId}`, formData);
};

export interface IUpdatePasswordFormData {
  passwordCurrent: string;
  passwordNew: string;
  passwordNewConfirm: string;
}
const updatePassword = (formData: IUpdatePasswordFormData) => {
  return apiServerClient.put("/users/me/password", formData);
};

const updatePicture = (formData: FormData) => {
  return apiServerClient.put("/me/picture", formData);
};

const deleteAccount = () => {
  return apiServerClient.delete("users/me");
};

const userAPI = { getOne, getMe, update, updatePassword, updatePicture, deleteAccount };
export default userAPI;
