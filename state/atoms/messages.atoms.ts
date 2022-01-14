import { atom, selector } from "recoil";
import { IMessage } from "../../types";

export default atom<IMessage[]>({
  key: "messages",
  default: []
});
