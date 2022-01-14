import useSWRInfinite from "swr/infinite";
import kennelAPI from "../../api/kennel.api";
import queryString from "query-string";
import { IKennel, ICursorPagination } from "../../types";
import useSWR from "swr";

const useKennelsYouMightLike = (query: { [key: string]: any } = {}) => {
  const fetcher = async (url: string) => {
    return await kennelAPI.getYouMightLike(queryString.parseUrl(url).query).then(res => res.data);
  };
  const { data, error } = useSWR(`/kennels/you-might-like?${queryString.stringify(query)}`, fetcher, {});
  return { kennelsYouMightLikeData: data, kennelsYouMightLikeError: error };
};

export default useKennelsYouMightLike;
