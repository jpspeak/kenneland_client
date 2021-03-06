import useSWR from "swr";
import userAPI from "../../api-routes/user.api";

const useUser = () => {
  const { data, error, mutate } = useSWR("/users/me", () => userAPI.getMe().then(res => res.data), { shouldRetryOnError: false, revalidateOnFocus: false, revalidateIfStale: false });
  const isLoggedIn = !error && data;
  const isLoadingUser = !error && !data && data !== null;
  return { user: data, mutateUser: mutate, isLoggedIn, isLoadingUser };
};

export default useUser;
