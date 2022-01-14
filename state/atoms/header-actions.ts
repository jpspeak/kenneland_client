import { atom } from "recoil";

export default atom({
  key: "header-actions",
  default: {
    unseenConversationsCount: 0
  }
});
