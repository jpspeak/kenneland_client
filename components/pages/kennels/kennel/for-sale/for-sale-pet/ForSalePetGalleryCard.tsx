import { Box, Center, Flex, useBreakpointValue } from "@chakra-ui/react";
import useHashBasedModal from "../../../../../../hooks/use-hash-based-modal";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import { useState } from "react";
import Image from "next/image";
import GalleryFullView from "../../../../../shared/GalleryFullView";

const ForSalePetGalleryCard = ({ mediaUrls, showSold = false }: { mediaUrls: string[]; showSold?: boolean }) => {
  const { isOpen, openModal, closeModal } = useHashBasedModal("#for-sale-pet-images");
  const isMd = useBreakpointValue({ md: true });
  const [currentSlide, setCurrentSlide] = useState(0);
  return (
    <>
      <Box rounded={{ md: "lg" }} overflow='hidden' height='fit-content' shadow='xs' mt={{ md: "4" }} mx={{ md: "4" }}>
        <Swiper
          onSlideChange={({ activeIndex }) => {
            setCurrentSlide(activeIndex);
          }}
          className='w-full h-full'
          modules={[Navigation, Pagination]}
          pagination={{ clickable: true }}
          navigation={isMd ? true : false}
          centeredSlides
          spaceBetween={50}
          slidesPerView={1}
        >
          {mediaUrls.map(mediaUrl => {
            return (
              <SwiperSlide key={mediaUrl} onClick={openModal} className='h-full w-full'>
                <Flex bgColor='white' cursor='pointer' position='relative'>
                  {showSold && (
                    <Center width='full' height='full' position='absolute' zIndex={2} bg='rgba(0,0,0,.5)'>
                      <Image src='/sold.png' alt='sold' height={200} width={200} objectFit='contain' />
                    </Center>
                  )}
                  <Image objectFit={isMd ? "contain" : "cover"} src={mediaUrl} alt='Kennel logo' height={800} width={800} />
                </Flex>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </Box>
      <GalleryFullView initialSlide={currentSlide} mediaUrls={mediaUrls} isOpen={isOpen} onClose={closeModal} />
    </>
  );
};

export default ForSalePetGalleryCard;
