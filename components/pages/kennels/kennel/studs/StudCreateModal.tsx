import { Modal, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from "@chakra-ui/modal";
import studAPI from "../../../../../api/stud.api";
import { useRouter } from "next/router";
import { useBreakpointValue } from "@chakra-ui/media-query";
import globalLoadingOverlayAtom from "../../../../../state/atoms/global-loading-overlay.atom";
import { useRecoilState } from "recoil";
import StudForm from "./StudForm";
import useStudsByKennel from "../../../../../hooks/swr/use-studs-by-kennel";
import { useToast } from "@chakra-ui/react";
import useUser from "../../../../../hooks/swr/use-user";

const StudCreateModal = ({ closeModal }: { closeModal: () => void }) => {
  const { user } = useUser();
  const [isLoading, setIsLoading] = useRecoilState(globalLoadingOverlayAtom);
  const router = useRouter();
  const kennelId = router.query.kennel as string;
  const modalSize = useBreakpointValue({ base: "full", md: "xl" });
  const { mutateStudsByKennel } = useStudsByKennel(kennelId);

  const toast = useToast();

  const inititalValues = {
    name: "",
    breed: "",
    studFee: "",
    location: user?.kennel?.location,
    description: ""
  };

  const onSave = (formData: FormData) => {
    setIsLoading(true);
    studAPI
      .create(kennelId, formData)
      .then(() => {
        setIsLoading(false);
        closeModal();
        mutateStudsByKennel();
        toast({
          title: "Stud added",
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
          <ModalHeader fontSize='base'>ADD STUD</ModalHeader>
          <ModalCloseButton />
          <StudForm initialValues={inititalValues} onSave={onSave} isLoading={isLoading} />
        </ModalContent>
      </Modal>
    </>
  );
};

export default StudCreateModal;
