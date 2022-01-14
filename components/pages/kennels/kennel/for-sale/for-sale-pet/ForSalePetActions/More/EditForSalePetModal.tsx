import { Modal, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from "@chakra-ui/modal";
import { useRouter } from "next/router";
import { useBreakpointValue } from "@chakra-ui/media-query";
import { useRecoilState } from "recoil";
import { useToast } from "@chakra-ui/toast";
import { IForSalePet } from "../../../../../../../../types";
import globalLoadingOverlayAtom from "../../../../../../../../state/atoms/global-loading-overlay.atom";
import useForSalePet from "../../../../../../../../hooks/swr/use-for-sale-pet";
import forSalePetAPI from "../../../../../../../../api/for-sale-pet.api";
import ForSalePetForm from "../../../ForSalePetForm";

const EditForSalePetModal = ({ closeModal, forSalePet }: { closeModal: () => void; forSalePet: IForSalePet }) => {
  const [isLoading, setIsLoading] = useRecoilState(globalLoadingOverlayAtom);
  const router = useRouter();
  const modalSize = useBreakpointValue({ base: "full", md: "xl" });
  const { mutateForSalePet } = useForSalePet(forSalePet._id);
  const toast = useToast();

  const inititalValues = {
    sex: forSalePet.sex || "Male",
    dateOfBirth: new Date(forSalePet.dateOfBirth).toISOString().substring(0, 10) || "",
    breed: forSalePet.breed || "",
    price: forSalePet.price || "",
    location: forSalePet.location || "",
    description: forSalePet.description || ""
  };

  const onSave = (formData: FormData) => {
    setIsLoading(true);
    const forSalePetId = router.query.forSalePet as string;
    forSalePetAPI
      .update(forSalePetId, formData)
      .then(() => {
        setIsLoading(false);
        closeModal();
        mutateForSalePet();
        toast({
          title: "For sale pet updated",
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
          <ModalHeader fontSize='base'>EDIT PET</ModalHeader>
          <ModalCloseButton />
          <ForSalePetForm initialValues={inititalValues} onSave={onSave} isLoading={isLoading} forSalePetImages={forSalePet.images} />
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditForSalePetModal;
