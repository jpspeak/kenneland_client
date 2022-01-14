import { Button } from "@chakra-ui/button";
import { useBoolean, useDisclosure } from "@chakra-ui/hooks";
import { Box, VStack } from "@chakra-ui/layout";
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/modal";
import { Alert, AlertIcon, AlertTitle, AlertDescription, Link, useBreakpointValue } from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import useSWR from "swr";
import testAtom from "../../state/atoms/test.atom";
import { TestContext } from "../../state/context/test-context";
import { useContext } from "react";
const TestModal = () => {
  // const isOpen = useRecoilValue(testAtom);
  const { isOpen } = useContext(TestContext);
  const { todo } = useTodo();
  return (
    <>
      <Modal isOpen={true} onClose={() => {}} isCentered>
        <ModalOverlay />
        <ModalContent rounded='lg' mx='2'>
          <ModalHeader>The header {JSON.stringify(todo)}</ModalHeader>
          <ModalCloseButton rounded='full' />
          <ModalBody>The body</ModalBody>

          <ModalFooter mt='6'>The footer</ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default TestModal;

const useTodo = () => {
  const { data } = useSWR("https://jjsonplaceholder.typicode.com/todos/1", url => axios.get(url).then(res => res.data));
  return { todo: data };
};
