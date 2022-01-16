import { HiUser } from "react-icons/hi";
import DrawerItemLinkWrapper from "./DrawerItemLinkWrapper";

const DrawerItemAccount = () => {
  return <DrawerItemLinkWrapper href='/account' text='ACCOUNT' icon={HiUser} />;
};

export default DrawerItemAccount;
