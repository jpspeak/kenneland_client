import { Box, Container, Grid, Text, VStack } from "@chakra-ui/layout";
import { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import { Spinner } from "@chakra-ui/spinner";
import useSWR from "swr";
import kennelAPI from "../../api-routes/kennel.api";
import studAPI from "../../api-routes/stud.api";
import { ICursorPagination, IStud } from "../../types";
import apiServerClient from "../../api-routes/api-server-client";
import StudItem from "../../components/pages/kennels/kennel/studs/StudItem";
import { useRouter } from "next/router";
import useStuds from "../../hooks/swr/use-studs";
import { useBottomScrollListener } from "react-bottom-scroll-listener";
import LoadingSpinner from "../../components/shared/LoadingSpinner";
import FailedToLoad from "../../components/shared/FailedToLoad";
import StudsFilter from "../../components/pages/studs/StudsFilter";
import StudsFilterList from "../../components/pages/studs/StudsFilterList";
import NoDataFound from "../../components/pages/feed/NoDataFound";
import Head from "next/head";

const Studs = ({ initialStuds }: { initialStuds: ICursorPagination<IStud[]> }) => {
  const router = useRouter();

  const { studsData, studsSize, studsSetSize, studsError } = useStuds(router.query, initialStuds);

  //Loads more when at the bottom
  useBottomScrollListener(
    () => {
      studsData && studsData[studsData.length - 1]?.hasNext && studsSetSize(studsSize + 1);
    },
    { offset: 300, debounce: 1000 }
  );

  return (
    <>
      <Head>
        <title>Studs</title>
        <meta name='description' content='Dog Stud Service' />
      </Head>
      <Box>
        <Container maxWidth='container.lg' mt='2' px={{ base: "0", md: "4" }}>
          <Grid templateColumns={{ base: "100%", md: "30% 70%" }} gap='2'>
            <StudsFilter />
            <VStack alignItems='normal'>
              <StudsFilterList />
              <Grid templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(3, 1fr)", lg: "repeat(4, 1fr)" }} gap='2' h='max-content' alignItems='stretch'>
                {studsData?.map(studs => studs?.results.map(stud => <StudItem key={stud._id} href={`/kennels/${stud.kennel._id}/studs/${stud._id}`} stud={stud} />))}
                {!studsData && <LoadingSpinner />}
                {studsError && <FailedToLoad />}
              </Grid>
              {studsData?.[0]?.results.length === 0 && <NoDataFound text='No studs found' />}
            </VStack>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Studs;
