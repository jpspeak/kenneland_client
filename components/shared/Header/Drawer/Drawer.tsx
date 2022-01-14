import React from "react";
import { Drawer, Icon, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, IconButton, VStack } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import useUser from "../../../../hooks/swr/use-user";
import DrawerLinkAccount from "./DrawerLinkAccount";
import DrawerLogoutButton from "./DrawerButtonLogout";
import DrawerLinkMyKennel from "./DrawerLinkMyKennel";
import { useRecoilValue, useSetRecoilState } from "recoil";
import drawerAtom from "../../../../state/atoms/drawer.atom";
import { isMobile } from "react-device-detect";

export const useDrawer = () => {
  const isOpen = useRecoilValue(drawerAtom);
  const setDrawer = useSetRecoilState(drawerAtom);
  const closeDrawer = () => {
    setDrawer(false);
  };
  const openDrawer = () => {
    setDrawer(true);
  };
  return { isOpen, openDrawer, closeDrawer };
};
const AppDrawer = () => {
  const { isOpen, openDrawer, closeDrawer } = useDrawer();

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
                  <DrawerLinkMyKennel />
                  <DrawerLinkAccount />
                </>
              )}
            </VStack>
          </DrawerBody>

          <DrawerFooter px='2'>{user && <DrawerLogoutButton />}</DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
export default AppDrawer;
