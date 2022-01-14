import { IForSalePet, IStud } from "../types";
import apiServerClient from "./api-server-client";

const getFavoriteStuds = () => apiServerClient.get<IStud[]>("/favorite-studs").then(res => res.data);
const isStudFavoriteByUser = (studId: string) => apiServerClient.get<boolean>(`/favorite-studs/${studId}/is-favorite`);
const getFavoriteForSale = () => apiServerClient.get<IForSalePet[]>("/favorite-for-sale").then(res => res.data);
const addToFavoriteStuds = (studId: string) => apiServerClient.put("/add-to-favorite-studs", { studId });
const removeFromFavoriteStuds = (studId: string) => apiServerClient.put("/remove-from-favorite-studs", { studId });
const addToFavoriteForSale = (studId: string) => apiServerClient.put("/add-to-favorite-studs", { studId });
const removeFromFavoriteForSale = (studId: string) => apiServerClient.put("/remove-from-favorite-studs", { studId });

const favoriteAPI = { getFavoriteStuds, getFavoriteForSale, addToFavoriteStuds, removeFromFavoriteStuds, addToFavoriteForSale, removeFromFavoriteForSale, isStudFavoriteByUser };
export default favoriteAPI;
