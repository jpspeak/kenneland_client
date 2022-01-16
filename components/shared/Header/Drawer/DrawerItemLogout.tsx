import useUser from "../../../../hooks/swr/use-user";
import authAPI from "../../../../api-routes/auth.api";
import { HiLogout } from "react-icons/hi";
import DrawerItemButtonWrapper from "./DrawerItemButtonWrapper";
import { setAccessToken } from "../../../../services/token.service";
import { useRouter } from "next/router";

const DrawerItemLogout = () => {
  const { mutateUser } = useUser();
  const router = useRouter();
  const logOut = () => {
    authAPI.logout().then(() => {
      setAccessToken("");
      mutateUser(null, false);
      router.push("/kennels");
    });
  };

  return <DrawerItemButtonWrapper onClick={logOut} text='LOG OUT' icon={HiLogout} />;
};

export default DrawerItemLogout;
