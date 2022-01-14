import { atom } from "recoil";
import { Socket } from "socket.io-client";

export default atom<any>({
  key: "socket",
  default: undefined
});
