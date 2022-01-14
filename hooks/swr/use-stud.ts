import useSWR from "swr";
import studAPI from "../../api-routes/stud.api";
import { IStud } from "../../types";

const useStud = (studId: string, initialData?: IStud) => {
  const { data, error, mutate } = useSWR(`/studs/${studId}`, () => studAPI.getSingle(studId).then(res => res.data), { fallbackData: initialData, revalidateIfStale: false });
  return { stud: data, errorStud: error, mutateStud: mutate };
};

export default useStud;
