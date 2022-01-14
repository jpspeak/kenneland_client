import { Button } from "@chakra-ui/button";
import { MenuItem } from "@chakra-ui/menu";
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay } from "@chakra-ui/modal";
import { useToast } from "@chakra-ui/toast";
import { useRouter } from "next/router";
import { useState, useRef } from "react";
import { HiOutlineTrash } from "react-icons/hi";
import { useRecoilState } from "recoil";
import forSalePetAPI from "../../../../../../../../api-routes/for-sale-pet.api";
import useForSalePet from "../../../../../../../../hooks/swr/use-for-sale-pet";
import globalLoadingOverlayAtom from "../../../../../../../../state/atoms/global-loading-overlay.atom";

const Delete = ({ forSalePetId }: { forSalePetId: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef(null);
  const toast = useToast();
  const [isLoading, setIsLoading] = useRecoilState(globalLoadingOverlayAtom);

  const router = useRouter();
  const kennelId = router.query.kennel as string;
  const { mutateForSalePet } = useForSalePet(forSalePetId);

  const deleteForSalePet = async () => {
    setIsLoading(true);
    await forSalePetAPI.destroy(forSalePetId);
    mutateForSalePet(null, false);
    toast({
      title: "For sale pet deleted",
      duration: 3000,
      status: "success",
      position: "top",
      variant: "left-accent",
      isClosable: true
    });
    router.replace(`/kennels/${kennelId}/for-sale-pet`);
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
              Delete For Sale Pet
            </AlertDialogHeader>
            <AlertDialogBody>Are you sure? You can not undo this action afterwards.</AlertDialogBody>

            <AlertDialogFooter>
              <Button variant='ghost' rounded='full' ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button rounded='full' colorScheme='red' variant='solid' onClick={deleteForSalePet} ml={3} isLoading={isLoading}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default Delete;
