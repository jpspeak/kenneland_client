import useSWR from "swr";
import forSaleAPI from "../../api-routes/for-sale-pet.api";
import studAPI from "../../api-routes/stud.api";
import { IForSalePet, IStud } from "../../types";

const useForSalePet = (forSalePetId: string, initialData?: IForSalePet) => {
  const { data, error, mutate } = useSWR(`/for-sale-pet/${forSalePetId}`, () => forSaleAPI.getSingle(forSalePetId).then(res => res.data), { fallbackData: initialData, revalidateIfStale: false });
  return { forSalePet: data, errorForSalePet: error, mutateForSalePet: mutate };
};

export default useForSalePet;
