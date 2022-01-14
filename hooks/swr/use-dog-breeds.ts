import useSWR from "swr";
import dogBreedAPI from "../../api-routes/dog-breed.api";

const useDogBreeds = () => {
  const { data, error } = useSWR("/dog-breeds", () => dogBreedAPI.getAll().then(res => res.data));

  return { dogBreeds: data, errorDogBreeds: error };
};
export default useDogBreeds;
