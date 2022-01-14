import useSWR from "swr";
import favoriteStudAPI from "../../api/favorite.api";
import useUser from "./use-user";

const useFavoriteForSale = () => {
  const { user } = useUser();
  const { data, error, mutate } = useSWR(user ? "/favorite-for-sale" : null, () => favoriteStudAPI.getFavoriteForSale());
  return { favoriteForSale: data, errorFavoriteForSale: error, mutateFavoriteForSale: mutate };
};
export default useFavoriteForSale;
