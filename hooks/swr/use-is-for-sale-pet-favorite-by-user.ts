import useSWR from "swr";
import favoriteStudAPI from "../../api-routes/favorite.api";
import useUser from "./use-user";

const useIsForSalePetFavoriteByUser = (studId: string) => {
  const { user } = useUser();
  const { data, error, mutate } = useSWR(user ? `/favorite-studs/${studId}/is-favorite` : null, () => favoriteStudAPI.isStudFavoriteByUser(studId).then(res => res.data));
  return { isForSalePetFavorite: data, errorIsForSalePetFavoriteByUser: error, mutateIsForSalePetFavoriteByUser: mutate };
};
export default useIsForSalePetFavoriteByUser;
