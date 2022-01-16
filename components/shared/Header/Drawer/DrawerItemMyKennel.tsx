import { Avatar } from "@chakra-ui/avatar";
import Icon from "@chakra-ui/icon";
import { HiOutlineHome } from "react-icons/hi";
import useUser from "../../../../hooks/swr/use-user";
import Kennel from "../../../icons/Kennel";
import KennelCreateModal from "../../../pages/kennels/kennel/KennelCreateModal";
import DrawerItemLinkWrapper from "./DrawerItemLinkWrapper";

const DrawerItemMyKennel = () => {
  const { user } = useUser();
  return <>{user?.kennel ? <DrawerItemLinkWrapper href={`/kennels/${user?.kennel?._id}`} text='My Kennel' icon={Kennel} /> : <KennelCreateModal />}</>;
};

export default DrawerItemMyKennel;
