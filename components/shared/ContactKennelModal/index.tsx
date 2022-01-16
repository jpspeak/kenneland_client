import { Button, IconButton } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import Icon from "@chakra-ui/icon";
import { HStack, Spacer, Text, VStack } from "@chakra-ui/layout";
import { useBreakpointValue } from "@chakra-ui/media-query";
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from "@chakra-ui/modal";
import { useToast } from "@chakra-ui/toast";
import copy from "copy-to-clipboard";
import { HiChatAlt2, HiOutlineClipboardCopy, HiOutlineMail, HiOutlinePhone } from "react-icons/hi";
import ChatDrawerContext from "../../../state/context/chat-drawer-context";
import { useContext } from "react";
import useUser from "../../../hooks/swr/use-user";
import { IKennel } from "../../../types";
import { MdPermPhoneMsg } from "react-icons/md";

const ContactKennelModal = ({ kennel }: { kennel: IKennel }) => {
  const { user } = useUser();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const buttonSize = useBreakpointValue({ base: "xs", md: "sm" });
  const toast = useToast();
  const { openConversation } = useContext(ChatDrawerContext);

  const copyContact = () => {
    copy(window.location.href);
    toast({
      title: "Copied",
      duration: 3000,
      status: "success",
      position: "top",
      variant: "subtle",
      isClosable: true
    });
  };

  const chatKennel = () => {
    if (user) {
      onClose();
      openConversation(user._id, kennel._id, kennel.user._id, kennel.name, kennel.displayPicture);
    } else {
      toast({
        title: "Please log in first",
        duration: 3000,
        status: "error",
        position: "top",
        variant: "subtle",
        isClosable: true
      });
    }
  };

  return (
    <>
      <Button onClick={onOpen} leftIcon={<Icon as={MdPermPhoneMsg} />} variant='solid' p='4' size={buttonSize} colorScheme='primary' rounded='full' flexShrink={0}>
        Contact
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered size='sm'>
        <ModalOverlay />
        <ModalContent mx='4'>
          <ModalHeader>Contact Kennel</ModalHeader>
          <ModalCloseButton rounded='full' />
          <ModalBody pb='8'>
            <VStack alignItems='stretch' spacing='4'>
              <Button onClick={chatKennel} px='4' py='2' colorScheme='primary' rounded='full'>
                <Icon as={HiChatAlt2} mr='2'></Icon>
                Mini-Chat
              </Button>

              {kennel?.email && (
                <VStack alignItems='stretch' spacing='1'>
                  <Text ml='1'>Email</Text>
                  <HStack spacing='4' bgColor='primary.50' px='4' py='2' rounded='lg'>
                    <Icon as={HiOutlineMail} color='blackAlpha.500' />
                    <Text wordBreak='break-all' noOfLines={1}>
                      {kennel?.email}
                    </Text>
                    <Spacer />
                    <IconButton onClick={copyContact} aria-label='copy' size='sm' variant='ghost' rounded='full' icon={<Icon as={HiOutlineClipboardCopy} />} />
                  </HStack>
                </VStack>
              )}

              {kennel?.mobileNumber && (
                <VStack alignItems='stretch' spacing='1'>
                  <Text ml='1'>Mobile number</Text>
                  <HStack spacing='4' bgColor='primary.50' px='4' py='2' rounded='lg'>
                    <Icon as={HiOutlinePhone} color='blackAlpha.500' />
                    <Text isTruncated>{kennel?.mobileNumber}</Text>
                    <Spacer />
                    <IconButton onClick={copyContact} aria-label='copy' size='sm' variant='ghost' rounded='full' icon={<Icon as={HiOutlineClipboardCopy} />} />
                  </HStack>
                </VStack>
              )}

              {/* <VStack alignItems='stretch' spacing='1'>
                <Text ml='1'>Facebook</Text>
                <HStack spacing='4' bgColor='primary.50' px='4' py='2' rounded='lg'>
                  <Icon as={FiFacebook} color='blackAlpha.500' />
                  <Text isTruncated>https://fb.com</Text>
                  <Spacer />
                  <IconButton aria-label='copy' size='sm' variant='ghost' rounded='full' icon={<Icon as={HiOutlineExternalLink} />} />
                </HStack>
              </VStack> */}
              {/* <VStack alignItems='stretch' spacing='1'>
                <Text ml='1'>Instagram</Text>
                <HStack spacing='4' bgColor='primary.50' px='4' py='2' rounded='lg'>
                  <Icon as={BsInstagram} color='blackAlpha.500' />
                  <Text isTruncated>https://instagram.com</Text>
                  <Spacer />
                  <IconButton aria-label='copy' size='sm' variant='ghost' rounded='full' icon={<Icon as={HiOutlineExternalLink} />} />
                </HStack>
              </VStack> */}
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ContactKennelModal;
