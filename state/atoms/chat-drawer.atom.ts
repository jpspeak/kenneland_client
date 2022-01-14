import { atom } from "recoil";

export default atom({
  key: "chatDrawer",
  default: {
    isOpen: false,
    conversations: {
      isOpen: false
    },
    conversation: {
      isOpen: false,
      id: "",
      receiverUser: {
        id: "",
        fullname: ""
      }
    }
  }
});
