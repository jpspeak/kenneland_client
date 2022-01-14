import { IconButton } from "@chakra-ui/button";
import Icon from "@chakra-ui/icon";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";
import { useToast } from "@chakra-ui/toast";
import copy from "copy-to-clipboard";
import { HiOutlineGlobeAlt, HiOutlineShare } from "react-icons/hi";

const Share = () => {
  const toast = useToast();
  const copyUrl = () => {
    copy(window.location.href);
    toast({
      title: "Copied link.",
      duration: 3000,
      status: "success",
      position: "top",
      variant: "left-accent",
      isClosable: true
    });
  };
  return (
    <>
      <Menu>
        <MenuButton as={IconButton} aria-label='Share' icon={<Icon as={HiOutlineShare} h='4' w='4' />} fontSize='xs'></MenuButton>

        <MenuList>
          <MenuItem icon={<HiOutlineGlobeAlt />} onClick={copyUrl}>
            Copy Link
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
};

export default Share;
