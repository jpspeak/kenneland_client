import { ICursorPagination, IKennel } from "../types";
import apiServerClient from "./api-server-client";

interface LooseObject {
  [key: string]: any;
}
let abortController: LooseObject = {};

const getAll = (params: { [key: string]: any }) => apiServerClient.get<ICursorPagination<IKennel[]>>(`/kennels`, { params });
const getYouMightLike = (params: { [key: string]: any }) => apiServerClient.get<IKennel[]>(`/kennels/you-might-like`, { params });
const getRandom = () => apiServerClient.get<IKennel[]>(`/kennels/random`);
const getSingle = (kennelId: string) => apiServerClient.get<IKennel>(`/kennels/${kennelId}`);
// const getRandom = (url: string) => apiServerClient.get<{ results: IKennel[] }>(url);
const create = (userId: string, newData: any) => apiServerClient.post(`/users/${userId}/kennels`, newData);
const update = (kennelId: string, newData: any) => apiServerClient.put(`/kennels/${kennelId}`, newData);

const follow = (kennelId: string, userId: string) => {
  abortController?.follow?.abort();
  abortController.follow = new AbortController();
  return apiServerClient.post(`/users/${userId}/kennels/${kennelId}/follow`, null, { signal: abortController?.follow?.signal });
};

const unfollow = (kennelId: string, userId: string) => {
  abortController?.unfollow?.abort();
  abortController.unfollow = new AbortController();
  return apiServerClient.post(`/users/${userId}/kennels/${kennelId}/unfollow`, null, { signal: abortController?.unfollow?.signal });
};

const isFollowed = (kennelId: string, userId: string) => apiServerClient.get<boolean>(`/users/${userId}/kennels/${kennelId}/is-followed`);

const kennelAPI = { getAll, getYouMightLike, getRandom, getSingle, create, update, follow, unfollow, isFollowed };
export default kennelAPI;
