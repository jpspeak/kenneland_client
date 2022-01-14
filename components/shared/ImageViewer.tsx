/* eslint-disable @next/next/no-img-element */
import { IconButton } from "@chakra-ui/button";
import { Modal, ModalContent, ModalOverlay } from "@chakra-ui/modal";
import Image from "next/image";
import { useRouter } from "next/router";
import { HiOutlineX } from "react-icons/hi";

const ImageViewer = ({ src }: { src: string }) => {
  const router = useRouter();
  const onClose = () => {
    router.back();
  };
  return (
    <>
      <Modal isOpen={true} onClose={onClose} size='full' isCentered>
        <ModalOverlay />
        <ModalContent shadow='none' rounded='none' position='relative' background='rgba(0, 0, 0, .9)'>
          <IconButton onClick={onClose} aria-label='close' position='absolute' rounded='full' m='2' zIndex={1} background='rgba(0, 0, 0, .3)'>
            <HiOutlineX color='white' />
          </IconButton>
          {src && <Image src={src} alt='Kennel logo' objectFit='contain' layout='fill' />}
        </ModalContent>
      </Modal>
    </>
  );
};
export default ImageViewer;
