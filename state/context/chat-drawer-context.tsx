import { FC, createContext, useState } from "react";
import useHashBasedModal from "../../hooks/use-hash-based-modal";

const chatDrawerInitialState = {
  isDrawerOpen: false,
  isConversationsOpen: false,
  isConversationOpen: false,
  currentConversation: { selfMemberId: "", memberId: "", memberUserId: "", memberName: "", memberDisplayPicture: "" },
  openConversations: () => {},
  closeConversations: () => {},
  openConversation: (selfMemberId: string, memberId: string, memberUserId: string, meberName: string, memberDisplayPicture: string) => {},
  backToConversations: () => {}
};

const ChatDrawerContext = createContext(chatDrawerInitialState);
export default ChatDrawerContext;

export const ChatDrawerProvider: FC = ({ children }) => {
  // const { isOpen, openModal, closeModal } = useHashBasedModal("#chat-bar");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isConversationsOpen, setIsConversationsOpen] = useState(false);
  const [isConversationOpen, setIsConversationOpen] = useState(false);
  const [currentConversation, setCurrentConversation] = useState({ selfMemberId: "", memberId: "", memberUserId: "", memberName: "", memberDisplayPicture: "" });

  const openConversations = () => {
    setIsDrawerOpen(true);
    setIsConversationsOpen(true);
  };
  const closeConversations = () => {
    setIsDrawerOpen(false);
    setIsConversationsOpen(false);
  };

  const openConversation = (selfMemberId: string, memberId: string, memberUserId: string, memberName: string, memberDisplayPicture: string) => {
    setIsDrawerOpen(true);
    setIsConversationOpen(true);
    setCurrentConversation({ selfMemberId, memberId, memberUserId, memberName, memberDisplayPicture });
  };

  const backToConversations = () => {
    setIsConversationsOpen(true);
    setIsConversationOpen(false);
  };

  return (
    <ChatDrawerContext.Provider
      value={{
        isDrawerOpen,
        isConversationsOpen,
        isConversationOpen,
        currentConversation,
        openConversations,
        closeConversations,
        openConversation,
        backToConversations
      }}
    >
      {children}
    </ChatDrawerContext.Provider>
  );
};
