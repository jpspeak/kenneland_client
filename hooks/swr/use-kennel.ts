import useSWR from "swr";
import kennelAPI from "../../api/kennel.api";

const useKennel = (kennelId: string) => {
  const { data, error, mutate } = useSWR(`/kennels/${kennelId}`, () => kennelAPI.getSingle(kennelId).then(res => res.data));

  return { kennel: data, errorKennel: error, mutateKennel: mutate };
};

export default useKennel;
