import useSWR from "swr";
import studAPI from "../../api/stud.api";

const useStudsByKennel = (kennelId: string) => {
  const { data, error, mutate } = useSWR(`/kennels/${kennelId}/studs`, () => studAPI.getStudsByKennel(kennelId));
  return { studs: data, errorStudsByKennel: error, mutateStudsByKennel: mutate };
};
export default useStudsByKennel;
