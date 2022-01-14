import { Button, IconButton } from "@chakra-ui/button";
import { useBoolean } from "@chakra-ui/hooks";
import Icon from "@chakra-ui/icon";
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay } from "@chakra-ui/modal";
import { useState, useRef } from "react";
import { HiOutlineTrash } from "react-icons/hi";
import { MouseEventHandler } from "react-transition-group/node_modules/@types/react";
import { useRecoilState } from "recoil";
import conversationAPI from "../../../api-routes/conversation.api";
import useUser from "../../../hooks/swr/use-user";
import conversationsAtom from "../../../state/atoms/conversations.atom";

const ConversationDeleteButton = ({ conversationId, memberId }: { conversationId: string; memberId: string }) => {
  const { user } = useUser();
  const [conversations, setConversations] = useRecoilState(conversationsAtom);
  const [isLoading, setIsLoading] = useBoolean();
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef(null);

  const alertUser: MouseEventHandler<HTMLButtonElement> = e => {
    e.stopPropagation();
    setIsOpen(true);
  };

  const deleteConversation = async () => {
    setIsLoading.on();
    try {
      await conversationAPI.destroy(conversationId, memberId);
      const newConversations = [...conversations].filter(conversation => conversation._id !== conversationId);
      setConversations(newConversations);
      setIsLoading.off();
    } catch (error) {
      console.log(error);
      setIsLoading.off();
    }
  };

  return (
    <>
      <IconButton
        aria-label='Delete conversation'
        size='xs'
        alignSelf='end'
        variant='ghost'
        rounded='full'
        onClick={alertUser}
        icon={<Icon as={HiOutlineTrash} color='blackAlpha.500' h='5' w='5' alignSelf='end' />}
      />

      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose} isCentered>
        <AlertDialogOverlay>
          <AlertDialogContent mx='2'>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Delete Conversation
            </AlertDialogHeader>

            <AlertDialogBody>Are you sure? You can not undo this action afterwards.</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose} rounded='full'>
                Cancel
              </Button>
              <Button isLoading={isLoading} colorScheme='red' onClick={deleteConversation} ml={3} rounded='full'>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default ConversationDeleteButton;
