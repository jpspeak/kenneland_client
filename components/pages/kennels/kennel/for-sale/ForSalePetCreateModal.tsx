import { Modal, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from "@chakra-ui/modal";
import forSalePetAPI from "../../../../../api-routes/for-sale-pet.api";
import { useRouter } from "next/router";
import { useBreakpointValue } from "@chakra-ui/media-query";
import globalLoadingOverlayAtom from "../../../../../state/atoms/global-loading-overlay.atom";
import { useRecoilState } from "recoil";
import ForSaleForm from "./ForSalePetForm";
import useForSalePetsByKennel from "../../../../../hooks/swr/use-for-sale-pets-by-kennel";
import { useToast } from "@chakra-ui/toast";
import useUser from "../../../../../hooks/swr/use-user";

const ForSaleCreateModal = ({ closeModal }: { closeModal: () => void }) => {
  const { user } = useUser();
  const [isLoading, setIsLoading] = useRecoilState(globalLoadingOverlayAtom);
  const router = useRouter();
  const modalSize = useBreakpointValue({ base: "full", md: "xl" });
  const { mutateForSalePetsByKennel } = useForSalePetsByKennel(router.query.kennel as string);
  const toast = useToast();

  const inititalValues = {
    breed: "",
    sex: "Male",
    dateOfBirth: "",
    price: "",
    location: user?.kennel?.location,
    description: ""
  };

  const onSave = (formData: FormData) => {
    setIsLoading(true);
    const kennelId = router.query.kennel as string;
    forSalePetAPI
      .create(kennelId, formData)
      .then(() => {
        setIsLoading(false);
        closeModal();
        mutateForSalePetsByKennel();
        toast({
          title: "For sale pet added",
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
          <ModalHeader fontSize='base'>SELL PET</ModalHeader>
          <ModalCloseButton />
          <ForSaleForm initialValues={inititalValues} onSave={onSave} isLoading={isLoading} />
        </ModalContent>
      </Modal>
    </>
  );
};

export default ForSaleCreateModal;
