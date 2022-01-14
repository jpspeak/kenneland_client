import { atom } from "recoil";

interface KennelFilter {
  kennelName: string;
  breeds: string[];
  location: string;
}

export default atom<KennelFilter>({
  key: "kennelFilter",
  default: { kennelName: "", breeds: [], location: "" }
});
