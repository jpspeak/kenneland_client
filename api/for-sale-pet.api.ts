import { ICursorPagination, IForSalePet } from "../types";
import apiServerClient from "./api-server-client";

interface LooseObject {
  [key: string]: any;
}
let abortController: LooseObject = {};

const getForSalePetsByKennel = (kennelId: string) => apiServerClient.get<IForSalePet[]>(`/kennels/${kennelId}/for-sale-pets`).then(res => res.data);
const getAll = (params: { [key: string]: any }) => apiServerClient.get<ICursorPagination<IForSalePet[]>>(`/for-sale-pets`, { params });
const getRandom = () => apiServerClient.get<IForSalePet[]>(`/for-sale-pets/random`);
const getAllFollowed = (userId: string, params: { [key: string]: any }) => apiServerClient.get<ICursorPagination<IForSalePet[]>>(`/users/${userId}/feed/for-sale-pets`, { params });
const getSingle = (forSalePetId: string) => apiServerClient.get<IForSalePet | null>(`/for-sale-pets/${forSalePetId}`);
const create = (kennelId: string, formData: any) => apiServerClient.post<IForSalePet>(`/kennels/${kennelId}/for-sale-pets`, formData);
const update = (forSalePetId: string, formData: any) => apiServerClient.put<IForSalePet>(`/for-sale-pets/${forSalePetId}`, formData);
const destroy = (forSalePetId: string) => apiServerClient.delete(`/for-sale-pets/${forSalePetId}`);

const getLikesCount = (studId: string) => apiServerClient.get<number>(`/for-sale-pets/${studId}/likes-count`);

const setAsSold = (forSalePetId: string, userId: string) => apiServerClient.post(`/users/${userId}/for-sale-pets/${forSalePetId}/set-as-sold`);
const setAsAvailable = (forSalePetId: string, userId: string) => apiServerClient.post(`/users/${userId}/for-sale-pets/${forSalePetId}/set-as-available`);

const like = (studId: string, userId: string) => {
  abortController?.like?.abort();
  abortController.like = new AbortController();
  return apiServerClient.post(`/users/${userId}/for-sale-pets/${studId}/like`, null, { signal: abortController?.like?.signal });
};

const unlike = (studId: string, userId: string) => {
  abortController?.unlike?.abort();
  abortController.unlike = new AbortController();
  return apiServerClient.post(`/users/${userId}/for-sale-pets/${studId}/unlike`, null, { signal: abortController?.unlike?.signal });
};

const isLiked = (studId: string, userId: string) => apiServerClient.get<boolean>(`/users/${userId}/for-sale-pets/${studId}/is-liked`);

const forSalePetAPI = { getForSalePetsByKennel, getAll, getRandom, getAllFollowed, getSingle, create, update, destroy, setAsSold, setAsAvailable, like, unlike, getLikesCount, isLiked };
export default forSalePetAPI;
