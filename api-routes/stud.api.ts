import { ICursorPagination, IStud } from "../types";
import apiServerClient from "./api-server-client";

interface LooseObject {
  [key: string]: any;
}
let abortController: LooseObject = {};

const getAll = (params: { [key: string]: any }) => apiServerClient.get<ICursorPagination<IStud[]>>(`/studs`, { params });
const getAllFollowed = (userId: string, params: { [key: string]: any }) => apiServerClient.get<ICursorPagination<IStud[]>>(`/users/${userId}/feed/studs`, { params });
const getStudsByKennel = (kennelId: string) => apiServerClient.get<IStud[]>(`/kennels/${kennelId}/studs`).then(res => res.data);
const getRandom = () => apiServerClient.get<IStud[]>(`/studs/random`);
const getSingle = (studId: string) => apiServerClient.get<IStud | null>(`/studs/${studId}`);
const create = (kennelId: string, formData: any) => apiServerClient.post<IStud>(`/kennels/${kennelId}/studs`, formData);
const update = (studId: string, formData: any) => apiServerClient.put<IStud>(`/studs/${studId}`, formData);
const destroy = (studId: string) => apiServerClient.delete(`/studs/${studId}`);
const getLikesCount = (studId: string) => apiServerClient.get<number>(`/studs/${studId}/likes-count`);

const like = (studId: string, userId: string) => {
  abortController?.like?.abort();
  abortController.like = new AbortController();
  return apiServerClient.post(`/users/${userId}/studs/${studId}/like`, null, { signal: abortController?.like?.signal });
};

const unlike = (studId: string, userId: string) => {
  abortController?.unlike?.abort();
  abortController.unlike = new AbortController();
  return apiServerClient.post(`/users/${userId}/studs/${studId}/unlike`, null, { signal: abortController?.unlike?.signal });
};

const isLiked = (studId: string, userId: string) => apiServerClient.get<boolean>(`/users/${userId}/studs/${studId}/is-liked`);

const studAPI = { getStudsByKennel, getAll, getRandom, getAllFollowed, getSingle, create, update, destroy, getLikesCount, like, unlike, isLiked };
export default studAPI;
