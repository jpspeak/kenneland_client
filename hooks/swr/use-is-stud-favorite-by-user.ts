import useSWR from "swr";
import favoriteStudAPI from "../../api/favorite.api";
import useUser from "./use-user";

const useIsStudFavoriteByUser = (studId: string) => {
  const { user } = useUser();
  const { data, error, mutate } = useSWR(user ? `/favorite-studs/${studId}/is-favorite` : null, () => favoriteStudAPI.isStudFavoriteByUser(studId).then(res => res.data));
  return { isStudFavorite: data, errorIsStudFavoriteByUser: error, mutateIsStudFavoriteByUser: mutate };
};
export default useIsStudFavoriteByUser;
