import React from "react";
import { Drawer, Icon, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, IconButton, VStack } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import useUser from "../../../../hooks/swr/use-user";
import DrawerItemAccount from "./DrawerItemAccount";
import DrawerItemLogout from "./DrawerItemLogout";
import DrawerItemMyKennel from "./DrawerItemMyKennel";
import { isMobile } from "react-device-detect";
import { useContext, createContext } from "react";
import AppDrawerContext from "../../../../state/context/app-drawer-context";

interface IDrawerContext {
  isOpen: boolean;
  closeDrawer?: () => void;
}

export const DrawerContext = createContext<IDrawerContext>({ isOpen: false });

const AppDrawer = () => {
  const { isOpen, openDrawer, closeDrawer } = useContext(AppDrawerContext);

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

                  <DrawerItemAccount />
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
