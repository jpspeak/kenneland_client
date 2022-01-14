import ChatDrawerContext from "../../../state/context/chat-drawer-context";
import { useContext, useEffect } from "react";
import { SocketContext } from "../../../state/context/socket-context";
import useUnseenConversationsCount from "../../../hooks/swr/use-unseen-conversations-count";
import PopBadge from "../PopBadge";
import { IconButton } from "@chakra-ui/button";
import { HiOutlineChatAlt2 } from "react-icons/hi";
import Icon from "@chakra-ui/icon";
import ChatDrawer from "../ChatDrawer/ChatDrawer";

const HeaderChatButton = () => {
  const { openConversations } = useContext(ChatDrawerContext);
  const { socket } = useContext(SocketContext);

  const { unseenConversationsCount, mutateUnseenConversationsCount } = useUnseenConversationsCount();

  const handleReceivedMessage = () => {
    mutateUnseenConversationsCount();
  };

  useEffect(() => {
    socket?.on("receivedMessage", handleReceivedMessage);
    return () => {
      socket?.off("receivedMessage", handleReceivedMessage);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket, openConversations]);

  return (
    <>
      <PopBadge text={unseenConversationsCount || ""} isHidden={!unseenConversationsCount || unseenConversationsCount == 0 ? true : false}>
        <IconButton
          data-testid='chat-btn'
          onClick={openConversations}
          mx='2'
          aria-label='Chat'
          variant='ghost'
          size='sm'
          lineHeight=''
          icon={<Icon as={HiOutlineChatAlt2} h={5} w={5} color='blackAlpha.700' />}
        ></IconButton>
      </PopBadge>
      <ChatDrawer />
    </>
  );
};

export default HeaderChatButton;
