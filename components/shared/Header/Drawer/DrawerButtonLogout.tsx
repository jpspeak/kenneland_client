import { Icon } from "@chakra-ui/react";
import useUser from "../../../../hooks/swr/use-user";
import authAPI from "../../../../api-routes/auth.api";
import { HiLogout, HiOutlineLogout } from "react-icons/hi";
import DrawerButtonBase from "./DrawerButtonBase";
import { setAccessToken } from "../../../../services/token.service";
import { useRouter } from "next/router";

const DrawerButtonLogout = () => {
  const { mutateUser } = useUser();
  const router = useRouter();
  const logOut = () => {
    authAPI.logout().then(() => {
      setAccessToken("");
      mutateUser(undefined);
      router.push("/kennels");
    });
  };

  return <DrawerButtonBase onClick={logOut} text='Log out' icon={<Icon as={HiLogout} w={5} h={5} />} />;
};

export default DrawerButtonLogout;
