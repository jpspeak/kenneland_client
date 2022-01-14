import { Box, Center, Container, Flex, Grid, Text } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import { GetServerSidePropsContext } from "next";
import KennelHeader from "../../../../components/pages/kennels/kennel/KennelHeader";
import StudItem from "../../../../components/pages/kennels/kennel/studs/StudItem";
import kennelAPI from "../../../../api-routes/kennel.api";
import { Button } from "@chakra-ui/button";
import useUser from "../../../../hooks/swr/use-user";
import StudCreateModal from "../../../../components/pages/kennels/kennel/studs/StudCreateModal";
import useHashBasedModal from "../../../../hooks/use-hash-based-modal";
import useStudsByKennel from "../../../../hooks/swr/use-studs-by-kennel";
import { IKennel } from "../../../../types";
import { useBreakpointValue } from "@chakra-ui/media-query";
import Icon from "@chakra-ui/icon";
import { HiOutlinePlus } from "react-icons/hi";
import { AxiosError } from "axios";
import EmptyData from "../../../../components/shared/EmptyData";
import KennelsYouMightLike from "../../../../components/pages/kennels/kennel/KennelsYouMightLike";

const Studs = ({ kennel }: { kennel: IKennel }) => {
  const { user } = useUser();
  const { studs, errorStudsByKennel } = useStudsByKennel(kennel._id);
  console.log(studs);
  const isMd = useBreakpointValue({ base: false, md: true });

  const { isOpen, openModal, closeModal } = useHashBasedModal("#add-stud");

  return (
    <Container maxWidth='container.lg' p='0'>
      <Grid templateColumns={{ base: "100%", md: "70% 30%" }} alignItems='start'>
        <Box>
          <KennelHeader kennel={kennel} />
          <Box px={{ base: "0", md: "4" }} width='full' maxW='container.md'>
            {kennel._id === user?.kennel?._id && (
              <Flex justifyContent='end' bgColor='white' shadow='xs' my='2' rounded={{ base: "none", md: "lg" }} px={{ md: "0" }} p={{ base: "2", md: "4" }}>
                <Button color='blackAlpha.700' leftIcon={<Icon as={HiOutlinePlus} />} size='sm' onClick={openModal}>
                  Add stud
                </Button>
              </Flex>
            )}
            {studs && studs.length > 0 && (
              <Grid templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(3, 1fr)" }} gap='2' mt={kennel._id === user?.kennel?._id ? "0" : "2"}>
                {studs?.map(stud => (
                  <StudItem key={stud._id} href={`/kennels/${kennel._id}/studs/${stud._id}`} stud={stud} />
                ))}
              </Grid>
            )}
            <Center my='20'>
              {!studs && <Spinner size='sm' />}
              {errorStudsByKennel && <Text>Failed to load</Text>}
              {studs && studs.length === 0 && <EmptyData />}
            </Center>
          </Box>
        </Box>
        {isMd && (
          <Box pr='4'>
            <KennelsYouMightLike kennel={kennel} />
          </Box>
        )}
      </Grid>

      {isOpen && <StudCreateModal closeModal={closeModal} />}
    </Container>
  );
};
export default Studs;

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
