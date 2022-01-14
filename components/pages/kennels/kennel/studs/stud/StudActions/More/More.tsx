import { IconButton } from "@chakra-ui/button";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";
import { HiOutlineDotsVertical, HiOutlineFlag } from "react-icons/hi";
import Delete from "./Delete";
import Edit from "./Edit";
import { IStud } from "../../../../../../../../types";
import useUser from "../../../../../../../../hooks/swr/use-user";

const More = ({ stud }: { stud: IStud }) => {
  const { user } = useUser();

  return (
    <>
      <Menu>
        <MenuButton as={IconButton} aria-label='Options' icon={<HiOutlineDotsVertical />} />

        <MenuList>
          {stud.kennel._id === user?.kennel?._id ? (
            <>
              <Edit stud={stud} />
              <Delete studId={stud._id} />
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
