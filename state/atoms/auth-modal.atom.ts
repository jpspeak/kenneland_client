import { atom } from "recoil";

export default atom({
  key: "authModal",
  default: {
    isOpen: false
  }
});
