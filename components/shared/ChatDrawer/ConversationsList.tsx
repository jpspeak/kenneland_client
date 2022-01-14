/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useState, useEffect } from "react";

import { StackDivider, VStack } from "@chakra-ui/layout";
import { Center, IconButton, Icon } from "@chakra-ui/react";
import { HiOutlineArrowCircleDown } from "react-icons/hi";

import useUser from "../../../hooks/swr/use-user";
import useIsOnline from "../../../hooks/use-is-online";
import { useRecoilState } from "recoil";
import { useBoolean } from "@chakra-ui/hooks";

import conversationAPI from "../../../api-routes/conversation.api";

import { IConversation, IMessage } from "../../../types";

import { SocketContext } from "../../../state/context/socket-context";

import ScrollToBottom from "react-scroll-to-bottom";

import conversationsAtom from "../../../state/atoms/conversations.atom";

import ConversationsListItem from "./ConversationsListItem";
import LoadingSpinner from "../LoadingSpinner";
import FailedToLoad from "../FailedToLoad";

const ConversationsList = () => {
  const { socket } = useContext(SocketContext);
  const { user } = useUser();
  const [conversations, setConversations] = useRecoilState(conversationsAtom);
  const [isLoading, setLoading] = useBoolean();
  const [isError, setIsError] = useBoolean();
  const [next, setNext] = useState("");
  const isOnline = useIsOnline();

  const loadMore = async () => {
    setLoading.on();
    try {
      const res = await conversationAPI.getConversationByUser(user?._id!, next).then(res => res.data);
      setConversations(prevConversations => [...prevConversations, ...res.conversations]);
      setNext(res.next);
      setIsError.off();
      setLoading.off();
    } catch (error) {
      setIsError.on();
      setLoading.off();
    }
  };

  const updateConversationsFromSocket = (conversation: IConversation) => {
    let updatedConversation = conversations.filter(_conversation => _conversation._id !== conversation._id);

    updatedConversation.unshift(conversation);
    setConversations(updatedConversation);
  };

  const loadConversations = async () => {
    setLoading.on();
    try {
      const res = await conversationAPI.getConversationByUser(user?._id!, "").then(res => res.data);
      setConversations(res.conversations);
      setNext(res.next);
      setIsError.off();
      setLoading.off();
    } catch (error) {
      setIsError.on();
      setLoading.off();
    }
  };
  const handleReceivedMessage = (message: IMessage) => {
    updateConversationsFromSocket(message.conversation);
  };

  useEffect(() => {
    socket?.on("receivedMessage", handleReceivedMessage);
    return () => {
      socket?.off("receivedMessage", handleReceivedMessage);
    };
  }, [socket, conversations]);

  useEffect(() => {
    isOnline && loadConversations();
  }, [isOnline]);

  if (!user) return <></>;

  return (
    <ScrollToBottom className='h-full w-full ' mode='bottom'>
      <VStack alignItems='normal' spacing='0' divider={<StackDivider borderColor='gray.200' />}>
        {conversations?.map(conversation => (
          <ConversationsListItem key={conversation._id} conversation={conversation} />
        ))}
        <Center h='30px'>
          {isLoading && <LoadingSpinner />}
          {isError && <FailedToLoad />}
          {!isLoading && next && (
            <IconButton aria-label='Load more' size='xs' variant='ghost' onClick={loadMore} rounded='full' icon={<Icon as={HiOutlineArrowCircleDown} h='5' w='5' color='blackAlpha.600' />} />
          )}
        </Center>
      </VStack>
    </ScrollToBottom>
  );
};

export default ConversationsList;
