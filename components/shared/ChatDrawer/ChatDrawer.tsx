import { useEffect, useContext, useRef } from "react";

import { IconButton } from "@chakra-ui/button";
import { HStack, Text } from "@chakra-ui/layout";
import { Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay } from "@chakra-ui/modal";
import { Link as _Link } from "@chakra-ui/react";
import Icon from "@chakra-ui/icon";

import { HiOutlineArrowSmLeft, HiOutlineChatAlt2 } from "react-icons/hi";

import useUser from "../../../hooks/swr/use-user";

import { io } from "socket.io-client";

import ChatDrawerContext from "../../../state/context/chat-drawer-context";
import { SocketContext } from "../../../state/context/socket-context";

import Conversation from "./Conversation";
import ConversationsList from "./ConversationsList";
import LoadingSpinner from "../LoadingSpinner";

import { isMobile } from "react-device-detect";

const ChatDrawer = () => {
  const btnRef = useRef(null);
  const { user, isLoadingUser, isLoggedIn } = useUser();
  const { socket, setSocket } = useContext(SocketContext);
  const { isDrawerOpen, isConversationOpen, closeConversations, backToConversations, currentConversation } = useContext(ChatDrawerContext);

  useEffect(() => {
    const _socket = io(process.env.NEXT_PUBLIC_API_SERVER_URL || "http://localhost:5000", { auth: { userId: user?._id } });
    setSocket(_socket);
  }, [setSocket, user]);

  useEffect(() => {
    // user && socket?.emit("userOnline", user._id);
  }, [socket, user]);

  return (
    <>
      <Drawer isOpen={isDrawerOpen} placement={isMobile ? "left" : "right"} onClose={closeConversations} finalFocusRef={btnRef} size='xs'>
        <DrawerOverlay />
        <DrawerContent height='full' maxWidth={isMobile ? "70%" : undefined}>
          <DrawerCloseButton color={isConversationOpen ? "blackAlpha.800" : "white"} />
          {isConversationOpen ? (
            <DrawerHeader color='blackAlpha.800' shadow='xs' px='2' py='2'>
              <HStack>
                <IconButton rounded='full' variant='ghost' size='sm' aria-label='Back' icon={<Icon as={HiOutlineArrowSmLeft} h='5' w='5' />} onClick={backToConversations} />
                <Text isTruncated pr='10'>
                  {currentConversation.memberName}
                </Text>
              </HStack>
            </DrawerHeader>
          ) : (
            <DrawerHeader color='white' bgColor='blackAlpha.800' shadow='xs' px='3' py='2'>
              <Icon as={HiOutlineChatAlt2} h='5' w='5' mr='2' />
              Mini-Chat
            </DrawerHeader>
          )}

          <DrawerBody overflowY='hidden' height='full' p='0'>
            {isLoadingUser && <LoadingSpinner />}
            {!isLoadingUser && !isLoggedIn && (
              <DrawerBody>
                <Text textAlign='center'>You are not logged in.</Text>
              </DrawerBody>
            )}
            {user && isConversationOpen ? <Conversation /> : <ConversationsList />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default ChatDrawer;
