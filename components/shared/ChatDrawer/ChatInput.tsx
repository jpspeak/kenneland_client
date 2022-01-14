import { useState, useContext } from "react";

import { IconButton } from "@chakra-ui/button";
import Icon from "@chakra-ui/icon";
import { HStack } from "@chakra-ui/layout";

import { HiPaperAirplane } from "react-icons/hi";

import useUser from "../../../hooks/swr/use-user";
import { useBoolean } from "@chakra-ui/hooks";

import messageAPI from "../../../api/message.api";

import ChatDrawerContext from "../../../state/context/chat-drawer-context";
import { SocketContext } from "../../../state/context/socket-context";

import TextareaAutoResize from "../TextareaAutoResize";

import { isBrowser } from "react-device-detect";
import { useToast } from "@chakra-ui/toast";

const ChatInput = () => {
  const { user } = useUser();
  const { socket } = useContext(SocketContext);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useBoolean();
  const { currentConversation } = useContext(ChatDrawerContext);
  const toast = useToast();

  const sendMessage = async (senderId: string, receiverId: string, receiverUserId: string) => {
    if (newMessage) {
      setIsLoading.on();
      try {
        const createdMessage = await messageAPI.create(senderId, receiverId, newMessage).then(res => res.data);

        setNewMessage("");
        socket?.emit("sendMessage", { createdMessage, receiverUserId });

        setIsLoading.off();
      } catch (error) {
        toast({
          title: "Failed to send",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top-right"
        });
        setIsLoading.off();
      }
    }
  };

  if (!user) return <></>;

  return (
    <>
      <HStack alignItems='end' width='full' px='4' pb='2' mt='0'>
        <TextareaAutoResize
          placeholder='Type here'
          size='sm'
          resize='none'
          focusBorderColor='none'
          onChange={e => {
            setNewMessage(e.target.value);
          }}
          rows={1}
          rounded='lg'
          value={newMessage}
          width='full'
          onKeyPress={e => {
            if (isBrowser && e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              sendMessage(currentConversation.selfMemberId, currentConversation.memberId, currentConversation.memberUserId);
            }
          }}
        />
        <IconButton
          data-testid='send-btn'
          aria-label='Send'
          onClick={() => {
            sendMessage(currentConversation.selfMemberId, currentConversation.memberId, currentConversation.memberUserId);
          }}
          isLoading={isLoading}
          isDisabled={newMessage === "" || isLoading}
          rounded='full'
          color='blackAlpha.800'
          variant='ghost'
          icon={<Icon as={HiPaperAirplane} h='6' w='6' transform='auto' rotate='90' translateX='2px' />}
        />
      </HStack>
    </>
  );
};

export default ChatInput;
