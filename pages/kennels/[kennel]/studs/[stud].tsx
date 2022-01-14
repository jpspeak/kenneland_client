import { Box, Container, Grid, Spacer, Text, Flex, Icon, HStack } from "@chakra-ui/react";
import { GetServerSidePropsContext } from "next";
import studAPI from "../../../../api/stud.api";
import { IStud } from "../../../../types";
import { useBreakpointValue } from "@chakra-ui/media-query";
import BackButton from "../../../../components/shared/BackButton";
import { AxiosError } from "axios";
import useStud from "../../../../hooks/swr/use-stud";
import GalleryFullView from "../../../../components/shared/GalleryFullView";
import useHashBasedModal from "../../../../hooks/use-hash-based-modal";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import "swiper/css/bundle";
import Image from "next/image";
import { useState } from "react";
import KennelCardViewContact from "../../../../components/shared/KennelCardViewContact";
import { HiOutlineLocationMarker } from "react-icons/hi";
import StudActions from "../../../../components/pages/kennels/kennel/studs/stud/StudActions/StudActions";

const StudDetails = ({ stud }: { stud: IStud }) => (
  <>
    <Text mt='4' noOfLines={1} lineHeight='short' fontSize='xl' fontWeight='bold' color='blackAlpha.800'>
      {stud.name}
    </Text>
    <Text mt='4' fontWeight='bold' color='blackAlpha.700'>
      Stud Fee
    </Text>
    <Text color='blackAlpha.700'>{stud.studFee ? new Intl.NumberFormat("tl-PH", { style: "currency", currency: "PHP", minimumFractionDigits: 0 }).format(stud.studFee) : "-"}</Text>
    <Text mt='4' fontWeight='bold' color='blackAlpha.700'>
      Breed
    </Text>
    <Text color='blackAlpha.800'>{stud.breed}</Text>
    <Text mt='4' fontWeight='bold' color='blackAlpha.700'>
      Description
    </Text>
    <Text color='blackAlpha.800'>{stud.description || "-"}</Text>
    <Text mt='4' fontWeight='bold' color='blackAlpha.700'>
      Current location
    </Text>
    <HStack spacing={0} alignItems='center' mb='10' color='blackAlpha.800'>
      <Icon as={HiOutlineLocationMarker} />
      <Text>{stud.location}</Text>
    </HStack>
  </>
);

const StudGalleryCard = ({ mediaUrls }: { mediaUrls: string[] }) => {
  const { isOpen, openModal, closeModal } = useHashBasedModal("#stud-images");
  const [objectFit, setObjectFit] = useState<any>("cover");
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
              <>
                <SwiperSlide onClick={openModal} className='h-full w-full'>
                  <Flex bgColor='white' cursor='pointer'>
                    <Image objectFit={isMd ? "contain" : objectFit} src={mediaUrl} alt='Kennel logo' height={800} width={800} />
                  </Flex>
                </SwiperSlide>
              </>
            );
          })}
        </Swiper>
      </Box>
      <GalleryFullView initialSlide={currentSlide} mediaUrls={mediaUrls} isOpen={isOpen} onClose={closeModal} />
    </>
  );
};

const Stud = ({ initialStud }: { initialStud: IStud }) => {
  const { stud } = useStud(initialStud._id, initialStud);

  const isMd = useBreakpointValue({ base: false, md: true });

  // if (error) return <Text>Failed to load</Text>;
  // if (!stud) return <Spinner size='sm' />;

  return (
    <>
      {!isMd && (
        <Box position='absolute' zIndex={2} p='2'>
          <BackButton />
        </Box>
      )}
      {stud && (
        <Container maxWidth='container.lg' px='0'>
          <Grid templateColumns={{ base: "100%", md: "40% 60%" }} pb='2'>
            <StudGalleryCard mediaUrls={stud.images} />
            <Box mx='4'>
              <Flex mt='4'>
                <Text justifySelf='start' fontWeight='bold' fontSize='x-large' color='orange.600'>
                  Stud Service
                </Text>
                <Spacer />
                <StudActions stud={stud} />
              </Flex>
              <StudDetails stud={stud} />
              <KennelCardViewContact showContact={true} kennel={stud.kennel} />
            </Box>
          </Grid>
        </Container>
      )}
    </>
  );
};
// Stud.getLayout = (page: any) => <SubLayout>{page}</SubLayout>;
export default Stud;

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const studId = context.query.stud;
  try {
    const res = await studAPI.getSingle(studId as string);
    return {
      props: { initialStud: res.data }
    };
  } catch (error) {
    const err = error as AxiosError;
    return {
      props: { errorCode: err.response?.status }
    };
  }
};
