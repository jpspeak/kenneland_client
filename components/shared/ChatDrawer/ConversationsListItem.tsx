import { useContext } from "react";

import { Avatar } from "@chakra-ui/avatar";
import { Box, HStack, Spacer, Text, VStack } from "@chakra-ui/layout";

import useUser from "../../../hooks/swr/use-user";

import ChatDrawerContext from "../../../state/context/chat-drawer-context";

import { IConversation } from "../../../types";

import formatChatConversationTime from "../../../utils/format-chat-conversation-time";

import { useRouter } from "next/router";

import ConversationDeleteButton from "./ConversationDelete";

const ConversationsItem = ({ conversation }: { conversation: IConversation }) => {
  const { user } = useUser();
  const { openConversation, closeConversations } = useContext(ChatDrawerContext);
  const router = useRouter();

  const selfMember = conversation.members.find(m => m.data._id === user?._id || m.data._id === user?.kennel?._id);
  const member = conversation.members.find(m => m.data._id !== user?._id);

  const ownerOfLatestMessage = conversation.latestMessage.senderId === user?._id || conversation.latestMessage.senderId === user?.kennel?._id;

  const selfMemberId = selfMember?.data._id!;

  const memberId = member?.data._id!;
  const memberType = member?.type;

  const profileLink = member?.type === "Kennel" ? `/kennels/${memberId}` : `/users/${memberId}`;

  let memberName = "";
  let memberDisplayPicture = "";
  let memberUserId = "";
  if (memberType === "Kennel") {
    memberName = member?.data.name;
    memberDisplayPicture = member?.data.displayPicture || "/kennel-logo-default.png";
    memberUserId = member?.data.user;
  }

  if (memberType === "User") {
    memberName = member?.data.name;
    memberDisplayPicture = member?.data.displayPicture;
    memberUserId = member?.data._id;
  }

  const visitProfile = (e: any, link: string) => {
    e.stopPropagation();
    closeConversations();
    router.push(link);
  };

  if (!user) return <></>;

  return (
    <>
      <HStack
        key={conversation._id}
        onClick={() => openConversation(selfMemberId, memberId, memberUserId, memberName, memberDisplayPicture)}
        spacing='2'
        alignItems='center'
        textAlign='start'
        cursor='pointer'
        _hover={{ bgColor: "blackAlpha.50" }}
        px='2'
        py='2'
      >
        <Box
          onClick={e => visitProfile(e, profileLink)}
          position='relative'
          _hover={{ _before: { content: "''", bg: "rgba(0,0,0,0.3)", width: "full", height: "full", rounded: "full", position: "absolute", zIndex: 3 } }}
        >
          <Avatar zIndex={2} size='md' as='button' src={memberDisplayPicture} boxSizing='border-box' />
        </Box>
        <VStack alignItems='normal' spacing='1' width='full'>
          <Text fontWeight='semibold' fontSize='sm' lineHeight='none' width='full' noOfLines={1}>
            {memberName}
          </Text>
          <Text fontSize='xs' color='blackAlpha.600' noOfLines={1} wordBreak='break-word'>
            {ownerOfLatestMessage && "You: "} {conversation.latestMessage.messageBody}
          </Text>
        </VStack>
        {!(conversation.membersSeen.includes(user._id) || conversation.membersSeen.includes(user.kennel?._id!)) && (
          <Text lineHeight='none' color='primary.500' fontSize='xs' alignSelf='start'>
            ⬤
          </Text>
        )}
        <VStack alignSelf='stretch'>
          <Text fontSize='x-small' fontWeight='semibold' color='blackAlpha.600' lineHeight='shorter' whiteSpace='nowrap'>
            {formatChatConversationTime(conversation.updatedAt)}
          </Text>
          <Spacer />
          <ConversationDeleteButton conversationId={conversation._id} memberId={selfMemberId} />
        </VStack>
      </HStack>
    </>
  );
};

export default ConversationsItem;
