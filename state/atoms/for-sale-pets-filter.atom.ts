import { atom } from "recoil";

interface ForSalePetsFilter {
  breeds: string[];
  location: string;
  sex: string;
  minPrice: string;
  maxPrice: string;
}

export default atom<ForSalePetsFilter>({
  key: "forSalePetsFilter",
  default: { breeds: [], location: "", sex: "", minPrice: "", maxPrice: "" }
});
