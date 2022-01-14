import { Box, Container, Flex, Grid } from "@chakra-ui/layout";
import { useRouter } from "next/router";
import { useBottomScrollListener } from "react-bottom-scroll-listener";
import FeedNav from "../../components/pages/feed/FeedNav";
import NoDataFound from "../../components/pages/feed/NoDataFound";
import ForSalePetItem from "../../components/pages/kennels/kennel/for-sale/ForSalePetItem";
import FailedToLoad from "../../components/shared/FailedToLoad";
import LoadingSpinner from "../../components/shared/LoadingSpinner";
import useForSalePetsFollowed from "../../hooks/swr/use-for-sale-pets-followed";
import useUser from "../../hooks/swr/use-user";

const ForSalePets = () => {
  const router = useRouter();
  const { user } = useUser();
  const { forSalePetsFollowedData, forSalePetsFollowedSize, forSalePetsFollowedSetSize, forSalePetsFollowedError } = useForSalePetsFollowed(user?._id!, router.query);

  //Loads more when at the bottom
  useBottomScrollListener(
    () => {
      forSalePetsFollowedData && forSalePetsFollowedData[forSalePetsFollowedData.length - 1]?.hasNext && forSalePetsFollowedSetSize(forSalePetsFollowedSize + 1);
    },
    { offset: 300, debounce: 1000 }
  );
  return (
    <>
      <Container pb='14' maxWidth='container.lg' px={{ base: "0", md: "4" }}>
        <Flex display={{ base: "none", md: "flex" }} justifyContent='center'>
          <Box width='full' maxWidth='sm'>
            <FeedNav />
          </Box>
        </Flex>
        {forSalePetsFollowedData && forSalePetsFollowedData?.[0]?.results?.length ? (
          <Grid mt={{ base: "2", md: "4" }} templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(3, 1fr)", lg: "repeat(4, 1fr)" }} gap='2' h='max-content' alignItems='stretch'>
            {forSalePetsFollowedData?.map(forSalePetsFollowed =>
              forSalePetsFollowed?.results.map(forSalePet => <ForSalePetItem key={forSalePet._id} href={`/kennels/${forSalePet.kennel._id}/for-sale-pets/${forSalePet._id}`} forSalePet={forSalePet} />)
            )}
            {!forSalePetsFollowedData && <LoadingSpinner />}
            {forSalePetsFollowedError && <FailedToLoad />}
          </Grid>
        ) : (
          <NoDataFound text='No pets to show' />
        )}
      </Container>
      <Box display={{ base: "block", md: "none" }} position='fixed' bottom='0' width='full'>
        <FeedNav />
      </Box>
    </>
  );
};

export default ForSalePets;
