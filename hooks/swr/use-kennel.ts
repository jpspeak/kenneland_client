import useSWR from "swr";
import kennelAPI from "../../api-routes/kennel.api";
import { IKennel } from "../../types";

const useKennel = (kennelId: string, initialKennel?: IKennel) => {
  const { data, error, mutate } = useSWR(`/kennels/${kennelId}`, () => kennelAPI.getSingle(kennelId).then(res => res.data), { fallbackData: initialKennel });

  return { kennel: data, errorKennel: error, mutateKennel: mutate };
};

export default useKennel;
