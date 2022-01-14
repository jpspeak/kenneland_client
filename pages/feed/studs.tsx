import { Box, Container, Flex, Grid } from "@chakra-ui/layout";
import { useRouter } from "next/router";
import { useBottomScrollListener } from "react-bottom-scroll-listener";
import FeedNav from "../../components/pages/feed/FeedNav";
import NoDataFound from "../../components/pages/feed/NoDataFound";
import StudItem from "../../components/pages/kennels/kennel/studs/StudItem";
import FailedToLoad from "../../components/shared/FailedToLoad";
import LoadingSpinner from "../../components/shared/LoadingSpinner";
import useStudsFollowed from "../../hooks/swr/use-studs-followed";
import useUser from "../../hooks/swr/use-user";

const Studs = () => {
  const router = useRouter();
  const { user } = useUser();
  const { studsFollowedData, studsFollowedSize, studsFollowedSetSize, studsFollowedError } = useStudsFollowed(user?._id!, router.query);

  //Loads more when at the bottom
  useBottomScrollListener(
    () => {
      studsFollowedData && studsFollowedData[studsFollowedData.length - 1]?.hasNext && studsFollowedSetSize(studsFollowedSize + 1);
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
        {studsFollowedData && studsFollowedData?.[0]?.results?.length ? (
          <Grid mt={{ base: "2", md: "4" }} templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(3, 1fr)", lg: "repeat(4, 1fr)" }} gap='2' h='max-content' alignItems='stretch'>
            {studsFollowedData?.map(studsFollowed => studsFollowed?.results.map(stud => <StudItem key={stud._id} href={`/kennels/${stud.kennel._id}/studs/${stud._id}`} stud={stud} />))}
            {!studsFollowedData && <LoadingSpinner />}
            {studsFollowedError && <FailedToLoad />}
          </Grid>
        ) : (
          <NoDataFound text='No studs to show' />
        )}
      </Container>
      <Box display={{ base: "block", md: "none" }} position='fixed' bottom='0' width='full'>
        <FeedNav />
      </Box>
    </>
  );
};

export default Studs;
