import useSWRInfinite from "swr/infinite";
import kennelAPI from "../../api-routes/kennel.api";
import queryString from "query-string";
import { IKennel, ICursorPagination } from "../../types";

const useKennels = (query: { [key: string]: any } = {}, initialKennels?: ICursorPagination<IKennel[]>) => {
  const getKey: any = (pageIndex: number, previousPageData: ICursorPagination<IKennel[]>) => {
    // reached the end
    if (previousPageData && !previousPageData.hasNext) return null;

    // // first page, we don't have `previousPageData`
    if (pageIndex === 0) return `/kennels?${queryString.stringify(query)}`;

    // // add the cursor to the API endpoint
    return `/kennels?${queryString.stringify(query)}&cursor=${previousPageData.cursor}`;
  };

  const fetcher = async (url: string) => {
    return await kennelAPI.getAll(queryString.parseUrl(url).query).then(res => res.data);
  };
  const { data, size, setSize, error } = useSWRInfinite(getKey, fetcher, {
    fallbackData: [initialKennels]
  });
  return { kennelsData: data, kennelsError: error, kennelsSize: size, kennelSetSize: setSize };
};

export default useKennels;
