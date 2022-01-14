import { Avatar } from "@chakra-ui/avatar";
import { Button } from "@chakra-ui/button";
import { Box, Center, Container, Grid, Heading, Link, Flex, Text } from "@chakra-ui/layout";
import useSWR from "swr";
import studAPI from "../../../api-routes/stud.api";
import { IKennel, IStud } from "../../../types";
import Image from "next/image";
import NextLink from "next/link";

const StudsItem = ({ stud }: { stud: IStud }) => {
  return (
    <>
      <NextLink href={`/kennels/${stud.kennel}/studs/${stud._id}`}>
        <Box cursor='pointer' width='full' bgColor='white' rounded='lg' shadow='xs' overflow='hidden' position='relative'>
          <Box zIndex={1} position='absolute' width='full' height='full' _hover={{ bgColor: "rgba(0,0,0,0.3)" }} />
          <Box width='full' paddingBottom='100%' bgColor='gray'>
            <Flex position='absolute'>
              <Image src={stud.images[0]} alt='Stud' objectFit='cover' height={800} width={800} />
            </Flex>
            <Box position='absolute' bottom='2' width='full' px='2'>
              <Text rounded='lg' bg='rgba(0,0,0,0.6)' color='white' zIndex={1} py='2' px='6' textAlign='center'>
                {stud.breed}
              </Text>
            </Box>
          </Box>
        </Box>
      </NextLink>
    </>
  );
};

const LandingPageStuds = () => {
  const { data: randomStuds } = useSWR("/studs/random", () => studAPI.getRandom().then(res => res.data), { revalidateOnFocus: false });

  return (
    <>
      <Box bgColor='blackAlpha.900'>
        <Container maxWidth='container.lg'>
          <Heading as='h3' textAlign='center' py='10' color='white' fontSize={{ base: "lg", md: "2xl" }}>
            Available Studs
          </Heading>
          <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }} gap={2}>
            {randomStuds?.map(stud => (
              <StudsItem key={stud._id} stud={stud} />
            ))}
          </Grid>
          <Center pt='10' pb='32'>
            <Link fontSize={{ md: "2xl" }} color='white' textDecoration='underline' href='/studs'>
              View more
            </Link>
          </Center>
        </Container>
      </Box>
    </>
  );
};

export default LandingPageStuds;
