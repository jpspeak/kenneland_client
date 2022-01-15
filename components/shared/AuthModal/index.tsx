import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import authModalAtom from "../../../state/atoms/auth-modal.atom";
import Login from "./Login";
import Register from "./Register";
// import SingUp from "./components/SignUp";

const Auth = () => {
  const [authModal, setAuthModal] = useRecoilState(authModalAtom);

  const closeAuthModal = () => {
    setAuthModal({ isOpen: false });
  };
  return (
    <Modal isOpen={authModal.isOpen} onClose={closeAuthModal}>
      <ModalOverlay />
      <ModalContent mx='4'>
        {/* <ModalHeader>Modal Title</ModalHeader> */}
        <ModalCloseButton rounded='full' />
        <ModalBody mt='10' px='8' minWidth='400'>
          <Tabs isFitted variant='enclosed' colorScheme='brand'>
            <TabList mb='1em'>
              <Tab>
                <Text>Login</Text>
              </Tab>
              <Tab>
                <Text>Register</Text>
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel px='0'>
                <Login />
              </TabPanel>
              <TabPanel px='0'>
                <Register />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>

        {/* <ModalFooter>
          <Button colorScheme='blue' mr={3} onClick={closeAuthModal}>
            Close
          </Button>
          <Button variant='ghost'>Secondary Action</Button>
        </ModalFooter> */}
      </ModalContent>
    </Modal>
  );
};

export default Auth;
