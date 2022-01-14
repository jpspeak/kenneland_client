import { atom } from "recoil";

interface StudsFilter {
  studName: string;
  breeds: string[];
  location: string;
}

export default atom<StudsFilter>({
  key: "studsFilter",
  default: { studName: "", breeds: [], location: "" }
});
