import { IconButton } from "@chakra-ui/button";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";
import { HiOutlineDotsVertical, HiOutlineFlag } from "react-icons/hi";
import useUser from "../../../../../../../../hooks/swr/use-user";
import { IForSalePet } from "../../../../../../../../types";
import Delete from "./Delete";
import Edit from "./Edit";
import SetAsAvailable from "./SetAsAvailable";
import SetAsSold from "./SetAsSold";

const More = ({ forSalePet }: { forSalePet: IForSalePet }) => {
  const { user } = useUser();

  return (
    <>
      <Menu>
        <MenuButton as={IconButton} aria-label='Options' icon={<HiOutlineDotsVertical />} />

        <MenuList>
          {forSalePet.kennel._id === user?.kennel?._id ? (
            <>
              {forSalePet.sold ? <SetAsAvailable forSalePetId={forSalePet._id} /> : <SetAsSold forSalePetId={forSalePet._id} />}
              <Edit forSalePet={forSalePet} />
              <Delete forSalePetId={forSalePet._id} />
            </>
          ) : (
            <MenuItem icon={<HiOutlineFlag />}>Report</MenuItem>
          )}
        </MenuList>
      </Menu>
    </>
  );
};

export default More;
