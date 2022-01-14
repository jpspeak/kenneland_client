import useSWRInfinite from "swr/infinite";
import kennelAPI from "../../api/kennel.api";
import queryString from "query-string";
import { ICursorPagination, IForSalePet, IStud } from "../../types";
import studAPI from "../../api/stud.api";
import forSalePetAPI from "../../api/for-sale-pet.api";

const useForSalePetsFollowed = (userId: string, query: { [key: string]: any } = {}, initialForSalePetsFollowed?: ICursorPagination<IForSalePet[]>) => {
  const getKey: any = (pageIndex: number, previousPageData: ICursorPagination<IStud[]>) => {
    // reached the end
    if (previousPageData && !previousPageData.hasNext) return null;

    // // first page, we don't have `previousPageData`
    if (pageIndex === 0) return `/users/${userId}/feed/for-sale-pets?${queryString.stringify(query)}`;

    // // add the cursor to the API endpoint
    return `/users/${userId}/feed/for-sale-pets?${queryString.stringify(query)}&cursor=${previousPageData.cursor}`;
  };

  const fetcher = async (url: string) => {
    return await forSalePetAPI.getAllFollowed(userId, queryString.parseUrl(url).query).then(res => res.data);
  };
  const { data, size, setSize, error } = useSWRInfinite(userId ? getKey : null, fetcher, {
    fallbackData: [initialForSalePetsFollowed]
  });
  return { forSalePetsFollowedData: data, forSalePetsFollowedError: error, forSalePetsFollowedSize: size, forSalePetsFollowedSetSize: setSize };
};

export default useForSalePetsFollowed;
