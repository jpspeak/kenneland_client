import { atom } from "recoil";
import { IConversation } from "../../types";

export default atom<IConversation[]>({
  key: "conversations",
  default: []
});
