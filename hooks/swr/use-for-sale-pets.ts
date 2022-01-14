import useSWRInfinite from "swr/infinite";
import queryString from "query-string";
import { ICursorPagination, IForSalePet } from "../../types";
import forSalePetAPI from "../../api/for-sale-pet.api";

const useForSalePets = (query: { [key: string]: any } = {}, initialForSalePets?: ICursorPagination<IForSalePet[]>) => {
  const getKey: any = (pageIndex: number, previousPageData: ICursorPagination<IForSalePet[]>) => {
    // reached the end
    if (previousPageData && !previousPageData.hasNext) return null;

    // // first page, we don't have `previousPageData`
    if (pageIndex === 0) return `/for-sale-pets?${queryString.stringify(query)}`;

    // // add the cursor to the API endpoint
    return `/for-sale-pets?${queryString.stringify(query)}&cursor=${previousPageData.cursor}`;
  };

  const fetcher = async (url: string) => {
    return await forSalePetAPI.getAll(queryString.parseUrl(url).query).then(res => res.data);
  };
  const { data, size, setSize, error } = useSWRInfinite(getKey, fetcher, {
    fallbackData: [initialForSalePets]
  });
  return { forSalePetsData: data, forSalePetsError: error, forSalePetsSize: size, forSalePetsSetSize: setSize };
};

export default useForSalePets;
