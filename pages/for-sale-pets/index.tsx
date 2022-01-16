import { Box, Container, Grid, VStack } from "@chakra-ui/layout";
import apiServerClient from "../../api-routes/api-server-client";
import ForSalePetItem from "../../components/pages/kennels/kennel/for-sale/ForSalePetItem";
import LoadingSpinner from "../../components/shared/LoadingSpinner";
import FailedToLoad from "../../components/shared/FailedToLoad";
import ForSalePetsFilter from "../../components/pages/for-sale-pets/ForSalePetsFilter";
import ForSalePetsFilterList from "../../components/pages/for-sale-pets/ForSalePetsFilterList";
import { useRouter } from "next/router";
import useForSalePets from "../../hooks/swr/use-for-sale-pets";
import { ICursorPagination, IForSalePet } from "../../types";
import { useBottomScrollListener } from "react-bottom-scroll-listener";
import NoDataFound from "../../components/pages/feed/NoDataFound";
import Head from "next/head";

const ForSalePet = ({ initialForSalePets }: { initialForSalePets: ICursorPagination<IForSalePet[]> }) => {
  const router = useRouter();

  const { forSalePetsData, forSalePetsSize, forSalePetsSetSize, forSalePetsError } = useForSalePets(router.query, initialForSalePets);

  //Loads more when at the bottom
  useBottomScrollListener(
    () => {
      forSalePetsData && forSalePetsData[forSalePetsData.length - 1]?.hasNext && forSalePetsSetSize(forSalePetsSize + 1);
    },
    { offset: 300, debounce: 1000 }
  );

  return (
    <>
      <Head>
        <title>For Sale Pets</title>
        <meta name='description' content='Dog For Sale' />
      </Head>
      <Box>
        <Container maxWidth='container.lg' mt='2' px={{ base: "0", md: "4" }} pb='16'>
          <Grid templateColumns={{ base: "100%", md: "30% 70%" }} gap='2'>
            <ForSalePetsFilter />
            <VStack alignItems='normal'>
              <ForSalePetsFilterList />
              <Grid templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(3, 1fr)", lg: "repeat(4, 1fr)" }} gap='2' h='max-content' alignItems='stretch'>
                {forSalePetsData?.map(forSalePets =>
                  forSalePets?.results.map(forSalePet => <ForSalePetItem key={forSalePet._id} href={`/kennels/${forSalePet.kennel._id}/for-sale-pets/${forSalePet._id}`} forSalePet={forSalePet} />)
                )}
                {!forSalePetsData && <LoadingSpinner />}
                {forSalePetsError && <FailedToLoad />}
              </Grid>
              {forSalePetsData?.[0]?.results.length === 0 && <NoDataFound text='No pets found' />}
            </VStack>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default ForSalePet;
