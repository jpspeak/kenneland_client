import { useRouter } from "next/router";
const useBack = () => {
  const router = useRouter();
  const prevUrl = globalThis.sessionStorage?.getItem("prevUrl");
  if (prevUrl) {
    return router.back;
  }
  return () => router.push("/");
};
export default useBack;
