import { Box, Container, Grid, VStack } from "@chakra-ui/layout";
import { GetServerSideProps } from "next";
import kennelAPI from "../../api-routes/kennel.api";
import KennelsItem from "../../components/pages/kennels/KennelsItem";
import KennelsFilter from "../../components/pages/kennels/KennelsFilter";
import KennelsFilterList from "../../components/pages/kennels/KennelsFilterList";
import { useRouter } from "next/router";
import { AxiosError } from "axios";
import FailedToLoad from "../../components/shared/FailedToLoad";
import LoadingSpinner from "../../components/shared/LoadingSpinner";
import { ICursorPagination, IKennel } from "../../types";
import useKennels from "../../hooks/swr/use-kennels";
import { useBottomScrollListener } from "react-bottom-scroll-listener";
import NoDataFound from "../../components/pages/feed/NoDataFound";

const Kennels = ({ initialKennels }: { initialKennels: ICursorPagination<IKennel[]> }) => {
  const router = useRouter();

  const { kennelsData, kennelsSize, kennelSetSize, kennelsError: error } = useKennels(router.query, initialKennels);

  //Loads more when at the bottom
  useBottomScrollListener(
    () => {
      kennelsData && kennelsData[kennelsData.length - 1]?.hasNext && kennelSetSize(kennelsSize + 1);
    },
    { offset: 300, debounce: 1000 }
  );

  return (
    <>
      <Box>
        <Container maxWidth='container.lg' mt='2' px={{ base: "2", md: "4" }}>
          <Grid templateColumns={{ base: "100%", md: "30% 70%" }} gap='2'>
            <KennelsFilter />
            <VStack alignItems='normal'>
              <KennelsFilterList />
              <Grid templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(4, 1fr)", lg: "repeat(5, 1fr)" }} gap='2' h='max-content' alignItems='stretch'>
                {kennelsData?.map(kennels =>
                  kennels?.results.map(kennel => <KennelsItem key={kennel._id} _id={kennel._id} name={kennel.name} displayPicture={kennel.displayPicture} location={kennel.location} />)
                )}

                {!kennelsData && <LoadingSpinner />}
                {error && <FailedToLoad />}
              </Grid>
              {kennelsData?.[0]?.results.length === 0 && <NoDataFound text='No kennels found' />}
            </VStack>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Kennels;

export const getServerSideProps: GetServerSideProps = async context => {
  const query = context.query;
  try {
    const res = await kennelAPI.getAll(query);
    return {
      props: { initialKennels: res.data || null }
    };
  } catch (error) {
    const err = error as AxiosError;
    return {
      props: { errorCode: err.response?.status }
    };
  }
};
