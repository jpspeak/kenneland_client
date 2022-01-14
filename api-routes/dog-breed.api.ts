import apiServerClient from "./api-server-client";

const getAll = () => apiServerClient.get<{ _id: string; name: string }[]>(`/dog-breeds`);

const dogBreedAPI = { getAll };
export default dogBreedAPI;
