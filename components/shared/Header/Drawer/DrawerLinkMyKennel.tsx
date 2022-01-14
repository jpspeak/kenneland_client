import { Avatar } from "@chakra-ui/avatar";
import Icon from "@chakra-ui/icon";
import { HiOutlineHome } from "react-icons/hi";
import useUser from "../../../../hooks/swr/use-user";
import Kennel from "../../../icons/Kennel";
import KennelCreateModal from "../../../pages/kennels/kennel/KennelCreateModal";
import DrawerLinkBase from "./DrawerLinkBase";

const DrawerLinkMyKennel = () => {
  const { user } = useUser();
  return <>{user?.kennel ? <DrawerLinkBase href={`/kennels/${user?.kennel?._id}`} text='My Kennel' icon={<Icon as={Kennel} w={5} h={5} />} /> : <KennelCreateModal />}</>;
};

export default DrawerLinkMyKennel;
