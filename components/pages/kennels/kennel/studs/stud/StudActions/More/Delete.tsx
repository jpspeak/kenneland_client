import { Button } from "@chakra-ui/button";
import { MenuItem } from "@chakra-ui/menu";
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay } from "@chakra-ui/modal";
import { useToast } from "@chakra-ui/toast";
import { useRouter } from "next/router";
import { useState, useRef } from "react";
import { HiOutlineTrash } from "react-icons/hi";
import { useRecoilState } from "recoil";
import studAPI from "../../../../../../../../api/stud.api";
import useStud from "../../../../../../../../hooks/swr/use-stud";
import globalLoadingOverlayAtom from "../../../../../../../../state/atoms/global-loading-overlay.atom";

const StudMenuItemDelete = ({ studId }: { studId: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef(null);
  const toast = useToast();
  const [isLoading, setIsLoading] = useRecoilState(globalLoadingOverlayAtom);

  const router = useRouter();
  const kennelId = router.query.kennel as string;
  const { mutateStud } = useStud(studId);

  const deleteStud = async () => {
    setIsLoading(true);
    await studAPI.destroy(studId);
    mutateStud(null, false);
    toast({
      title: "Stud deleted",
      duration: 3000,
      status: "success",
      position: "top",
      variant: "left-accent",
      isClosable: true
    });
    router.replace(`/kennels/${kennelId}/studs`);
    setIsLoading(false);
  };

  return (
    <>
      <MenuItem icon={<HiOutlineTrash />} onClick={() => setIsOpen(true)}>
        Delete
      </MenuItem>

      <AlertDialog isCentered isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent mx='4'>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Delete Stud
            </AlertDialogHeader>
            <AlertDialogBody>Are you sure? You can not undo this action afterwards.</AlertDialogBody>

            <AlertDialogFooter>
              <Button variant='ghost' rounded='full' ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button rounded='full' colorScheme='red' variant='solid' onClick={deleteStud} ml={3} isLoading={isLoading}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default StudMenuItemDelete;
