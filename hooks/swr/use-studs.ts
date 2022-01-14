import useSWRInfinite from "swr/infinite";
import kennelAPI from "../../api/kennel.api";
import queryString from "query-string";
import { ICursorPagination, IStud } from "../../types";
import studAPI from "../../api/stud.api";

const useStuds = (query: { [key: string]: any } = {}, initialStuds?: ICursorPagination<IStud[]>) => {
  const getKey: any = (pageIndex: number, previousPageData: ICursorPagination<IStud[]>) => {
    // reached the end
    if (previousPageData && !previousPageData.hasNext) return null;

    // // first page, we don't have `previousPageData`
    if (pageIndex === 0) return `/studs?${queryString.stringify(query)}`;

    // // add the cursor to the API endpoint
    return `/studs?${queryString.stringify(query)}&cursor=${previousPageData.cursor}`;
  };

  const fetcher = async (url: string) => {
    return await studAPI.getAll(queryString.parseUrl(url).query).then(res => res.data);
  };
  const { data, size, setSize, error } = useSWRInfinite(getKey, fetcher, {
    fallbackData: [initialStuds]
  });
  return { studsData: data, studsError: error, studsSize: size, studsSetSize: setSize };
};

export default useStuds;
