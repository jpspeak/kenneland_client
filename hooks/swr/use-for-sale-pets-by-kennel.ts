import useSWR from "swr";
import forSalePetAPI from "../../api/for-sale-pet.api";

const useForSalePetsByKennel = (kennelId: string) => {
  const { data, error, mutate } = useSWR(`/kennels/${kennelId}/for-sale-pets`, () => forSalePetAPI.getForSalePetsByKennel(kennelId));
  return { forSalePetsByKennel: data, errorForSalePetsByKennel: error, mutateForSalePetsByKennel: mutate };
};
export default useForSalePetsByKennel;
