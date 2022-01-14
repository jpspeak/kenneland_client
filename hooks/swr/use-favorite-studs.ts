import useSWR from "swr";
import favoriteStudAPI from "../../api/favorite.api";
import useUser from "./use-user";

const useFavoriteStuds = () => {
  const { user } = useUser();
  const { data, error, mutate } = useSWR(user ? "/favorite-studs" : null, () => favoriteStudAPI.getFavoriteStuds());

  return { studs: data, errorFavoriteStuds: error, mutateFavoriteStuds: mutate };
};
export default useFavoriteStuds;
