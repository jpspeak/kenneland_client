import { Box, Flex, HStack, Text } from "@chakra-ui/layout";
import { useState } from "react";
import Image from "next/image";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { useBreakpointValue } from "@chakra-ui/media-query";
import { BsFillImageFill } from "react-icons/bs";
import { Modal, ModalBody, ModalContent, ModalOverlay } from "@chakra-ui/modal";
import { IconButton } from "@chakra-ui/button";
import { HiOutlineX } from "react-icons/hi";
import useHashBasedModal from "../../hooks/use-hash-based-modal";
import { useEffect } from "react";

const Status = ({ currentSlide, totalSlides }: { currentSlide: number; totalSlides: number }) => (
  <Box px='2' py='1' rounded='full' position='absolute' right='4%' transform='auto' top='6%' bg='rgba(0,0,0,0.3)' zIndex={1}>
    <HStack>
      <BsFillImageFill color='white' />
      <Text fontSize='xs' color='white'>
        {currentSlide}/{totalSlides}
      </Text>
    </HStack>
  </Box>
);

const FullViewSlider = ({ images, status, onChange, isOpen, onClose }: { images: string[]; status: IStatus; onChange: (index: number) => void; isOpen: boolean; onClose: () => void }) => (
  <Modal isOpen={isOpen} onClose={onClose} size='full' isCentered>
    <ModalOverlay />
    <ModalContent shadow='none' rounded='none' position='relative' bg='black'>
      <IconButton onClick={onClose} aria-label='close' position='absolute' rounded='full' left='4%' top='6%' zIndex={2} background='rgba(0, 0, 0, .3)'>
        <HiOutlineX color='white' />
      </IconButton>
      <ModalBody p='0' position='relative'>
        <Carousel onChange={onChange} showArrows={true} showIndicators={false} showThumbs={false} showStatus={false} emulateTouch selectedItem={status.currentSlide - 1}>
          {images.map((image, index) => (
            <Box key={index} className='h-screen w-full'>
              <Image src={image} alt='Stud image' objectFit='contain' layout='fill' />;
            </Box>
          ))}
        </Carousel>
      </ModalBody>
      <Status currentSlide={status.currentSlide} totalSlides={status.totalSlides} />
    </ModalContent>
  </Modal>
);
interface IStatus {
  currentSlide: number;
  totalSlides: number;
}
const ImageSlider = ({ images }: { images: string[] }) => {
  const [status, setStatus] = useState({ currentSlide: 1, totalSlides: images.length });
  const { isOpen, openModal, closeModal } = useHashBasedModal("#image-full-view");
  const [objectFit, setObjectFit] = useState<any>("cover");
  const isMd = useBreakpointValue({ md: true });

  const onChange = (index: number) => {
    setStatus(prevState => {
      return { ...prevState, currentSlide: index + 1 };
    });
  };

  useEffect(() => {
    setStatus(prevState => ({ ...prevState, totalSlides: images.length }));
  }, [images]);

  return (
    <Box position='relative' overflow='hidden'>
      <Carousel
        onChange={onChange}
        onClickItem={openModal}
        showArrows={false}
        showIndicators={false}
        showThumbs={false}
        showStatus={false}
        emulateTouch
        stopOnHover
        autoPlay={isOpen ? false : true}
        infiniteLoop
        selectedItem={status.currentSlide - 1}
      >
        {images.map((image, index) => {
          return (
            <Flex key={index} bgColor='black' cursor='pointer'>
              <Image objectFit={isMd ? "contain" : objectFit} src={image} alt='Kennel logo' height={800} width={800} />
            </Flex>
          );
        })}
      </Carousel>
      <Status currentSlide={status.currentSlide} totalSlides={status.totalSlides} />
      <FullViewSlider images={images} status={status} onChange={onChange} isOpen={isOpen} onClose={closeModal} />
    </Box>
  );
};

export default ImageSlider;
