/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useContext } from "react";
import { Avatar } from "@chakra-ui/avatar";
import { IconButton } from "@chakra-ui/button";
import Icon from "@chakra-ui/icon";
import { Box, Center, Flex, Stack, Text, VStack } from "@chakra-ui/layout";
import { HiOutlineArrowCircleUp } from "react-icons/hi";

import messageAPI from "../../../api-routes/message.api";
import conversationAPI from "../../../api-routes/conversation.api";

import { IMessage } from "../../../types";

import useIsOnline from "../../../hooks/use-is-online";
import useUser from "../../../hooks/swr/use-user";
import useUnseenConversationsCount from "../../../hooks/swr/use-unseen-conversations-count";
import { useRecoilState } from "recoil";

import ChatDrawerContext from "../../../state/context/chat-drawer-context";
import { SocketContext } from "../../../state/context/socket-context";
import messagesAtom from "../../../state/atoms/messages.atoms";

import ScrollToBottom from "react-scroll-to-bottom";

import ChatInput from "./ChatInput";

import formatChatMessageTime from "../../../utils/format-chat-message-time";
import { useBoolean } from "@chakra-ui/hooks";
import LoadingSpinner from "../LoadingSpinner";

const Conversation = () => {
  const { user } = useUser();
  const { socket } = useContext(SocketContext);
  const [messages, setMessages] = useRecoilState(messagesAtom);
  const [isLoading, setLoading] = useBoolean();
  const { mutateUnseenConversationsCount } = useUnseenConversationsCount();
  const [next, setNext] = useState("");
  const isOnline = useIsOnline();

  const { currentConversation } = useContext(ChatDrawerContext);

  const addMessage = (message: IMessage) => {
    setMessages(prevMessages => [message, ...prevMessages] as IMessage[]);
  };
  const addMessages = (messages: IMessage[]) => {
    setMessages(prevMessages => [...prevMessages, ...messages]);
  };

  const loadMore = async () => {
    setLoading.on();
    try {
      const res = await messageAPI.getMessagesByMembers(currentConversation.selfMemberId, currentConversation.memberId, next).then(res => res.data);
      addMessages(res.messages);
      setNext(res.next);
      setLoading.off();
    } catch (error) {
      setLoading.off();
    }
  };

  const loadMessages = async () => {
    setLoading.on();
    try {
      const res = await messageAPI.getMessagesByMembers(currentConversation.selfMemberId, currentConversation.memberId, next).then(res => res.data);
      setMessages(res.messages);
      setNext(res.next);
      setLoading.off();
    } catch (error) {
      setLoading.off();
    }
  };

  const handleReceivedMessage = (message: IMessage) => {
    addMessage(message);
  };

  const seeConversation = async (conversationId: string, memberId: string) => {
    try {
      await conversationAPI.seeConversation(conversationId, memberId).then(res => res.data);
      mutateUnseenConversationsCount();
    } catch (error) {}
  };

  useEffect(() => {
    isOnline && loadMessages();
  }, [isOnline]);

  useEffect(() => {
    socket?.on("receivedMessage", handleReceivedMessage);
    return () => {
      socket?.off("receivedMessage", handleReceivedMessage);
      setMessages([]);
    };
  }, [socket]);

  useEffect(() => {
    const latestMessage = messages?.[0];
    if (latestMessage) {
      if (!latestMessage.conversation.membersSeen.includes(user?._id!) || !latestMessage.conversation.membersSeen.includes(user?.kennel?._id!)) {
        seeConversation(latestMessage.conversation._id, currentConversation.selfMemberId);
      }
    }
  }, [messages, user]);

  if (!user) return <></>;

  return (
    <VStack alignItems='normal' height='full'>
      <ScrollToBottom className='h-full w-full overflow-hidden px-4' mode='bottom'>
        <Stack spacing={6} direction='column-reverse' minHeight='full'>
          {messages?.map((message, index) => {
            const isOwner = message.sender?._id === user._id || message.sender?._id === user.kennel?._id;

            return (
              <Box key={index} maxWidth='90%' alignSelf={isOwner ? "end" : "start"} flexDirection={isOwner ? "row-reverse" : "row"}>
                <Flex>
                  {!isOwner && <Avatar src={currentConversation.memberDisplayPicture} size='sm' />}
                  <VStack mx='2' alignItems={isOwner ? "end" : "start"}>
                    <Box
                      data-testid='message-container'
                      as='pre'
                      whiteSpace='pre-wrap'
                      wordBreak='break-word'
                      shadow='base'
                      fontSize='xs'
                      lineHeight='short'
                      py='2'
                      px='4'
                      borderTopRadius='xl'
                      borderBottomEndRadius={!isOwner ? "xl" : "unset"}
                      borderBottomStartRadius={isOwner ? "xl" : "unset"}
                      bgColor={isOwner ? "blackAlpha.100" : "blackAlpha.800"}
                      color={isOwner ? "blackAlpha.800" : "white"}
                    >
                      {message.messageBody}
                    </Box>
                    <Text fontSize='xx-small' px='2' color='blackAlpha.600' alignSelf={isOwner ? "end" : "start"} whiteSpace='nowrap'>
                      {formatChatMessageTime(message.createdAt)}
                    </Text>
                  </VStack>
                </Flex>
              </Box>
            );
          })}
          <Center h='30px'>
            {!isLoading && next && (
              <IconButton aria-label='Load more' size='xs' variant='ghost' onClick={loadMore} rounded='full' icon={<Icon as={HiOutlineArrowCircleUp} h='5' w='5' color='blackAlpha.600' />} />
            )}
            {isLoading && <LoadingSpinner />}
          </Center>
        </Stack>
      </ScrollToBottom>
      <ChatInput />
    </VStack>
  );
};

export default Conversation;
