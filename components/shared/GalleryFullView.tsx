import { Modal, ModalCloseButton, ModalContent, ModalOverlay } from "@chakra-ui/modal";
import { Box } from "@chakra-ui/layout";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import "swiper/css/bundle";

import Image from "next/image";

const GalleryFullView = ({ initialSlide, mediaUrls, isOpen, onClose }: { initialSlide?: number; mediaUrls: string[]; isOpen: boolean; onClose: () => void }) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size='full' allowPinchZoom>
        <ModalOverlay />
        <ModalContent rounded='0' bgColor='black' minWidth='320px' height='full'>
          <ModalCloseButton zIndex={2} size='lg' color='white' />
          <Box height='full'>
            <Swiper
              className='w-full h-full'
              modules={[Navigation, Pagination]}
              pagination={{ clickable: true, hideOnClick: true }}
              navigation={{ hideOnClick: true }}
              centeredSlides
              spaceBetween={50}
              slidesPerView={1}
              initialSlide={initialSlide || 0}
            >
              {mediaUrls.map((mediaUrl, i) => {
                return (
                  <SwiperSlide key={mediaUrl}>
                    <Image src={mediaUrl} alt='' layout='fill' objectFit='contain' />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </Box>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GalleryFullView;
