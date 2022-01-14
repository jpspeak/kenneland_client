import { Icon } from "@chakra-ui/react";
import { HiOutlineHeart } from "react-icons/hi";
import DrawerLinkBase from "./DrawerLinkBase";

const DrawerLinkFavorites = () => {
  return <DrawerLinkBase href='/favorite-studs' text='Favorites' icon={<Icon as={HiOutlineHeart} w={5} h={5} />} />;
};

export default DrawerLinkFavorites;
