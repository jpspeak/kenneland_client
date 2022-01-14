import Icon from "@chakra-ui/icon";
import { HStack, Text } from "@chakra-ui/layout";
import { Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay } from "@chakra-ui/modal";
import { HiOutlineFilter } from "react-icons/hi";

const FilterModalWrapper: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ children, isOpen, onClose }) => {
  return (
    <>
      <Drawer placement='bottom' isOpen={isOpen} onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth='1px'>
            <HStack>
              <Icon as={HiOutlineFilter} />
              <Text>Filter </Text>
            </HStack>
          </DrawerHeader>
          <DrawerBody>{children}</DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default FilterModalWrapper;
