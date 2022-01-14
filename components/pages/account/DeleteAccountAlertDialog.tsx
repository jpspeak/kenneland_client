import { Button } from "@chakra-ui/button";
import { useBoolean, useDisclosure } from "@chakra-ui/hooks";
import { VStack } from "@chakra-ui/layout";
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/modal";
import { Alert, AlertIcon, AlertTitle, AlertDescription, Link } from "@chakra-ui/react";
import { useRouter } from "next/router";
import userAPI from "../../../api/user.api";
import useUser from "../../../hooks/swr/use-user";
import { setAccessToken } from "../../../services/token.service";

const DeleteAccountModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useBoolean();
  const { mutateUser } = useUser();
  const router = useRouter();

  const deleteAccount = () => {
    setIsLoading.on();
    userAPI
      .deleteAccount()
      .then(() => {
        router.replace("/");
        setAccessToken("");
        mutateUser(undefined);
      })
      .finally(() => setIsLoading.off());
  };

  return (
    <>
      <Link onClick={onOpen} color='red.500' alignSelf='start'>
        Delete account
      </Link>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent rounded='lg' mx='2'>
          <ModalHeader>Delete Account</ModalHeader>
          <ModalCloseButton rounded='full' />
          <ModalBody>
            <Alert status='warning' alignItems='start'>
              <AlertIcon />
              <VStack alignItems='start'>
                <AlertTitle>Warning!</AlertTitle>
                <AlertDescription>All of your data will be deleted permanently.</AlertDescription>
              </VStack>
            </Alert>
          </ModalBody>

          <ModalFooter mt='6'>
            <Button variant='ghost' rounded='full' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme='red' rounded='full' onClick={deleteAccount} isLoading={isLoading}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeleteAccountModal;
