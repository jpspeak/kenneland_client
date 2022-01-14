import { Icon } from "@chakra-ui/react";
import { HiUser } from "react-icons/hi";
import DrawerLinkBase from "./DrawerLinkBase";

const DrawerLinkAccount = () => {
  return <DrawerLinkBase href='/account' text='Account' icon={<Icon as={HiUser} w={5} h={5} />} />;
};

export default DrawerLinkAccount;
