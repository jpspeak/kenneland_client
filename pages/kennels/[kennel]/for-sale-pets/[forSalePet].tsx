import { Box, Container, Grid, Spacer, Text, Flex } from "@chakra-ui/react";
import { GetServerSidePropsContext } from "next";
import { IForSalePet } from "../../../../types";
import { useBreakpointValue } from "@chakra-ui/media-query";
import { AxiosError } from "axios";
import "swiper/css/bundle";
import useForSalePet from "../../../../hooks/swr/use-for-sale-pet";
import forSalePetAPI from "../../../../api/for-sale-pet.api";
import ForSalePetActions from "../../../../components/pages/kennels/kennel/for-sale/for-sale-pet/ForSalePetActions/ForSalePetActions";
import KennelCardViewContact from "../../../../components/shared/KennelCardViewContact";
import BackButton from "../../../../components/shared/BackButton";
import FailedToLoad from "../../../../components/shared/FailedToLoad";
import LoadingSpinner from "../../../../components/shared/LoadingSpinner";
import ForSalePetGalleryCard from "../../../../components/pages/kennels/kennel/for-sale/for-sale-pet/ForSalePetGalleryCard";
import ForSalePetDetails from "../../../../components/pages/kennels/kennel/for-sale/for-sale-pet/ForSalePetDetails";

const ForSalePet = ({ initialForSalePet }: { initialForSalePet: IForSalePet }) => {
  const { forSalePet, errorForSalePet } = useForSalePet(initialForSalePet._id, initialForSalePet);

  const isMd = useBreakpointValue({ base: false, md: true });

  if (errorForSalePet) return <FailedToLoad />;
  if (!forSalePet) return <LoadingSpinner />;

  return (
    <>
      {!isMd && (
        <Box position='absolute' zIndex={2} p='2'>
          <BackButton />
        </Box>
      )}
      {forSalePet && (
        <Container maxWidth='container.lg' px='0'>
          <Grid templateColumns={{ base: "100%", md: "40% 60%" }} pb='2'>
            <ForSalePetGalleryCard mediaUrls={forSalePet.images} showSold={forSalePet.sold} />
            <Box mx='4'>
              <Flex mt='4'>
                <Text justifySelf='start' fontWeight='bold' fontSize='x-large' color={forSalePet.sold ? "blackAlpha.600" : "red.600"}>
                  {forSalePet.sold ? "Sold" : "For Sale"}
                </Text>
                <Spacer />
                <ForSalePetActions forSalePet={forSalePet} />
              </Flex>
              <ForSalePetDetails forSalePet={forSalePet} />
              <KennelCardViewContact showContact={!forSalePet.sold} kennel={forSalePet.kennel} />
            </Box>
          </Grid>
        </Container>
      )}
    </>
  );
};

export default ForSalePet;

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const forSalePetId = context.query.forSalePet;

  try {
    const res = await forSalePetAPI.getSingle(forSalePetId as string);

    return {
      props: { initialForSalePet: res.data }
    };
  } catch (error) {
    const err = error as AxiosError;
    return {
      props: { errorCode: err.response?.status }
    };
  }
};
