import { Box, Center, Container, Flex, Grid, Text } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import { GetServerSidePropsContext } from "next";
import KennelHeader from "../../../../components/pages/kennels/kennel/KennelHeader";
import ForSalePetItem from "../../../../components/pages/kennels/kennel/for-sale/ForSalePetItem";
import kennelAPI from "../../../../api-routes/kennel.api";
import { Button } from "@chakra-ui/button";
import useUser from "../../../../hooks/swr/use-user";
import ForSalePetCreateModal from "../../../../components/pages/kennels/kennel/for-sale/ForSalePetCreateModal";
import useHashBasedModal from "../../../../hooks/use-hash-based-modal";
import useForSalePetByKennel from "../../../../hooks/swr/use-for-sale-pets-by-kennel";
import { IKennel } from "../../../../types";
import Icon from "@chakra-ui/icon";
import { HiOutlinePlus } from "react-icons/hi";
import { useBreakpointValue } from "@chakra-ui/media-query";
import { AxiosError } from "axios";
import EmptyData from "../../../../components/shared/EmptyData";
import KennelsYouMightLike from "../../../../components/pages/kennels/kennel/KennelsYouMightLike";

const ForSale = ({ kennel }: { kennel: IKennel }) => {
  const { user } = useUser();
  const { forSalePetsByKennel, errorForSalePetsByKennel, mutateForSalePetsByKennel } = useForSalePetByKennel(kennel._id);
  const isMd = useBreakpointValue({ base: false, md: true });

  const { isOpen, openModal, closeModal } = useHashBasedModal("#create-for-sale");
  return (
    <Container maxWidth='container.lg' p='0'>
      <Grid templateColumns={{ base: "100%", md: "70% 30%" }} alignItems='start'>
        <Box>
          <KennelHeader kennel={kennel} />

          <Box px={{ base: "0", md: "4" }} width='100%' maxW='container.md'>
            {kennel._id === user?.kennel?._id && (
              <Flex justifyContent='end' bgColor='white' shadow='xs' my='2' rounded={{ base: "none", md: "lg" }} px={{ md: "0" }} p={{ base: "2", md: "4" }}>
                <Button color='blackAlpha.700' leftIcon={<Icon as={HiOutlinePlus} />} size='sm' onClick={openModal}>
                  Sell pet
                </Button>
              </Flex>
            )}
            {forSalePetsByKennel && forSalePetsByKennel.length > 0 && (
              <Grid templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(3, 1fr)" }} gap='2' mt={kennel._id === user?.kennel?._id ? "0" : "2"}>
                {forSalePetsByKennel?.map(forSalePet => (
                  <ForSalePetItem key={forSalePet._id} href={`/kennels/${kennel._id}/for-sale-pets/${forSalePet._id}`} forSalePet={forSalePet} />
                ))}
              </Grid>
            )}
            <Center my='20'>
              {!forSalePetsByKennel && <Spinner size='sm' />}
              {errorForSalePetsByKennel && <Text>Failed to load</Text>}
              {forSalePetsByKennel && forSalePetsByKennel.length === 0 && <EmptyData />}
            </Center>
          </Box>
        </Box>
        {isMd && (
          <Box pr='4'>
            <KennelsYouMightLike kennel={kennel} />
          </Box>
        )}
      </Grid>

      {isOpen && <ForSalePetCreateModal closeModal={closeModal} />}
    </Container>
  );
};
export default ForSale;

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
