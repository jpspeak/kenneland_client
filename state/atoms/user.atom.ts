import { atom } from "recoil";
import { AuthProvider } from "../../types";

interface IUser {
  email: string;
  firstName: string;
  lastName: string;
  picture: string;
  provider: AuthProvider;
}
export default atom<IUser | null>({
  key: "user",
  default: null
});
