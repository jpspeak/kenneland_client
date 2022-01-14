import useSWRInfinite from "swr/infinite";
import kennelAPI from "../../api/kennel.api";
import queryString from "query-string";
import { ICursorPagination, IStud } from "../../types";
import studAPI from "../../api/stud.api";

const useStudsFollowed = (userId: string, query: { [key: string]: any } = {}, initialStudsFollowed?: ICursorPagination<IStud[]>) => {
  const getKey: any = (pageIndex: number, previousPageData: ICursorPagination<IStud[]>) => {
    // reached the end
    if (previousPageData && !previousPageData.hasNext) return null;

    // // first page, we don't have `previousPageData`
    if (pageIndex === 0) return `/users/${userId}/feed/studs?${queryString.stringify(query)}`;

    // // add the cursor to the API endpoint
    return `/users/${userId}/feed/studs?${queryString.stringify(query)}&cursor=${previousPageData.cursor}`;
  };

  const fetcher = async (url: string) => {
    return await studAPI.getAllFollowed(userId, queryString.parseUrl(url).query).then(res => res.data);
  };
  const { data, size, setSize, error } = useSWRInfinite(userId ? getKey : null, fetcher, {
    fallbackData: [initialStudsFollowed]
  });
  return { studsFollowedData: data, studsFollowedError: error, studsFollowedSize: size, studsFollowedSetSize: setSize };
};

export default useStudsFollowed;
