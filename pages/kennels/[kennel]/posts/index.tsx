import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import apiServerClient from "../../../../api-routes/api-server-client";
import kennelAPI from "../../../../api-routes/kennel.api";
import KennelHeader from "../../../../components/pages/kennels/kennel/KennelHeader";
import { IKennel } from "../../../../types";
import Error from "next/error";
import { AxiosError } from "axios";
import { Box, Center, Container, Grid } from "@chakra-ui/layout";
import EmptyData from "../../../../components/shared/EmptyData";
import KennelsYouMightLike from "../../../../components/pages/kennels/kennel/KennelsYouMightLike";
import { useBreakpointValue } from "@chakra-ui/media-query";
import Head from "next/head";

const Posts = ({ kennel }: { kennel: IKennel }) => {
  const isMd = useBreakpointValue({ base: false, md: true });
  return (
    <>
      <Head>
        <title>{kennel.name}</title>
        <meta name='description' content={`${kennel.name} Posts`} />
      </Head>
      <Container maxWidth='container.lg' p='0'>
        <Grid templateColumns={{ base: "100%", md: "70% 30%" }} alignItems='start'>
          <Box>
            <KennelHeader kennel={kennel} />

            <Box px={{ base: "0", md: "4" }} width='100%' maxW='container.md'>
              {/* {kennel._id === user?.kennel?._id && (
              <Flex justifyContent='end' px={{ md: "0" }} pb={{ base: "2", md: "4" }}>
                <Button p='4' bgColor='white' color='blackAlpha.800' leftIcon={<Icon as={HiOutlinePlus} />} variant='outline' rounded='full' size='sm' fontSize='xs' onClick={openModal}>
                  Sell pet
                </Button>
              </Flex>
            )}
            {forSalePetsByKennel && forSalePetsByKennel.length > 0 && (
              <Grid templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(3, 1fr)" }} gap='2'>
                {forSalePetsByKennel?.map(forSalePet => (
                  <ForSalePetItem key={forSalePet._id} href={`/kennels/${kennel._id}/for-sale-pets/${forSalePet._id}`} forSalePet={forSalePet} />
                ))}
              </Grid>
            )} */}
              {/* <Center my='20'>
              {!forSalePetsByKennel && <Spinner size='sm' />}
              {errorForSalePetsByKennel && <Text>Failed to load</Text>}
              {forSalePetsByKennel && forSalePetsByKennel.length === 0 && <EmptyData />}
            </Center> */}
              <Center my='20'>
                <EmptyData />
              </Center>
            </Box>
          </Box>
          {isMd && (
            <Box pr='4'>
              <KennelsYouMightLike kennel={kennel} />
            </Box>
          )}
        </Grid>
      </Container>
    </>
  );
};

export default Posts;

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const kennelId = context.query?.kennel;

  try {
    const res = await kennelAPI.getSingle(kennelId as string);
    return {
      props: { kennel: res.data }
    };
  } catch (error) {
    const err = error as AxiosError;
    return {
      props: { errorCode: err.response?.status }
    };
  }
};
