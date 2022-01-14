import { Box, Container, Flex } from "@chakra-ui/layout";
import FeedNav from "../../components/pages/feed/FeedNav";
import NoDataFound from "../../components/pages/feed/NoDataFound";
import YouAreNotLoggedIn from "../../components/pages/feed/YouAreNotLoggedIn";
import useUser from "../../hooks/swr/use-user";

const Posts = () => {
  const { isLoggedIn } = useUser();
  const posts: [] | undefined = [];

  if (!isLoggedIn) return <YouAreNotLoggedIn />;

  return (
    <>
      <Container pb='10' maxWidth='container.lg' px={{ base: "0", md: "4" }}>
        <Flex display={{ base: "none", md: "flex" }} justifyContent='center'>
          <Box width='full' maxWidth='sm'>
            <FeedNav />
          </Box>
        </Flex>
        {posts && posts.length > 0 ? <></> : <NoDataFound text='No posts to show' />}
      </Container>
      <Box display={{ base: "block", md: "none" }} position='fixed' bottom='0' width='full'>
        <FeedNav />
      </Box>
    </>
  );
};

export default Posts;
