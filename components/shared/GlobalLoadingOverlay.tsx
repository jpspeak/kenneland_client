import { Modal, ModalOverlay } from "@chakra-ui/modal";
import { useRecoilValue } from "recoil";
import globalLoadingOverlayAtom from "../../state/atoms/global-loading-overlay.atom";

const GlobalLoadingOverlay = () => {
  const isLoading = useRecoilValue(globalLoadingOverlayAtom);
  return (
    <>
      <Modal closeOnOverlayClick={false} isOpen={isLoading} onClose={() => {}} isCentered>
        <ModalOverlay bgColor='transparent' className='z-50' />
      </Modal>
    </>
  );
};

export default GlobalLoadingOverlay;
