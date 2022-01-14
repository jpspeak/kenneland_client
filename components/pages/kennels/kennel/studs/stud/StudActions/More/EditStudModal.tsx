import { Modal, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from "@chakra-ui/modal";

import { useRouter } from "next/router";
import { useBreakpointValue } from "@chakra-ui/media-query";
import { useRecoilState } from "recoil";

import { useToast } from "@chakra-ui/react";
import { IStud } from "../../../../../../../../types";
import globalLoadingOverlayAtom from "../../../../../../../../state/atoms/global-loading-overlay.atom";
import useStud from "../../../../../../../../hooks/swr/use-stud";
import studAPI from "../../../../../../../../api/stud.api";
import StudForm from "../../../StudForm";

const EditStudModal = ({ closeModal, stud }: { closeModal: () => void; stud: IStud }) => {
  const [isLoading, setIsLoading] = useRecoilState(globalLoadingOverlayAtom);
  const router = useRouter();
  const modalSize = useBreakpointValue({ base: "full", md: "xl" });
  const { mutateStud } = useStud(stud._id);
  const toast = useToast();

  const inititalValues = {
    name: stud.name || "",
    breed: stud.breed || "",
    studFee: stud.studFee || "",
    description: stud.description || "",
    location: stud.location || ""
  };

  const onSave = (formData: FormData) => {
    setIsLoading(true);
    const studId = router.query.stud as string;
    studAPI
      .update(studId, formData)
      .then(() => {
        setIsLoading(false);
        closeModal();
        mutateStud();
        toast({
          title: "Stud updated",
          duration: 3000,
          status: "success",
          position: "top",
          variant: "left-accent",
          isClosable: true
        });
      })
      .catch(error => {
        console.log(error);
        setIsLoading(false);
      });
  };

  return (
    <>
      <Modal isOpen={true} onClose={closeModal} size={modalSize}>
        <ModalOverlay />
        <ModalContent rounded={{ md: "lg" }}>
          <ModalHeader fontSize='base'>EDIT STUD</ModalHeader>
          <ModalCloseButton />
          <StudForm initialValues={inititalValues} onSave={onSave} isLoading={isLoading} studImages={stud.images} />
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditStudModal;
