import React from "react";
import { Drawer, Icon, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, IconButton, VStack } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import useUser from "../../../../hooks/swr/use-user";
import DrawerItemAccount from "./DrawerItemAccount";
import DrawerItemLogout from "./DrawerItemLogout";
import DrawerItemMyKennel from "./DrawerItemMyKennel";
import { isMobile } from "react-device-detect";
import { useState, createContext } from "react";

interface IDrawerContext {
  isOpen: boolean;
  closeDrawer?: () => void;
}

export const DrawerContext = createContext<IDrawerContext>({ isOpen: false });

const AppDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeDrawer = () => {
    setIsOpen(false);
  };
  const openDrawer = () => {
    setIsOpen(true);
  };

  const btnRef = React.useRef(null);
  const { user } = useUser();
  return (
    <>
      <IconButton aria-label='Menu' variant='ghost' size='sm' icon={<Icon as={HamburgerIcon} h='5' w='5' color='blackAlpha.800' />} ref={btnRef} onClick={openDrawer} />

      <Drawer isOpen={isOpen} placement='right' onClose={closeDrawer} finalFocusRef={btnRef}>
        <DrawerOverlay />
        <DrawerContent maxWidth={isMobile ? "70%" : undefined}>
          <DrawerCloseButton />
          <DrawerHeader></DrawerHeader>

          <DrawerBody mt='4' px='2'>
            <VStack spacing='8px' alignItems='start'>
              {user && (
                <>
                  <DrawerItemMyKennel />
                  <DrawerContext.Provider value={{ isOpen, closeDrawer }}>
                    <DrawerItemAccount />
                  </DrawerContext.Provider>
                </>
              )}
            </VStack>
          </DrawerBody>

          <DrawerFooter px='2'>{user && <DrawerItemLogout />}</DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
export default AppDrawer;
