import { Avatar } from "@chakra-ui/avatar";
import { Button } from "@chakra-ui/button";
import { Box, Center, Container, Grid, Heading, Link, Flex, Text } from "@chakra-ui/layout";
import useSWR from "swr";
import forSalePetAPI from "../../../api-routes/for-sale-pet.api";
import { IForSalePet } from "../../../types";
import Image from "next/image";
import NextLink from "next/link";

const ForSalePetsItem = ({ forSalePet }: { forSalePet: IForSalePet }) => {
  return (
    <>
      <NextLink href={`/kennels/${forSalePet.kennel}/for-sale-pets/${forSalePet._id}`}>
        <Box cursor='pointer' width='full' bgColor='white' rounded='lg' boxShadow='xs' overflow='hidden' position='relative'>
          <Box zIndex={1} position='absolute' width='full' height='full' _hover={{ bgColor: "rgba(0,0,0,0.3)" }} />
          <Box width='full' paddingBottom='100%' bgColor='gray'>
            <Flex position='absolute'>
              <Image src={forSalePet.images[0]} alt='For sale pet' objectFit='cover' height={800} width={800} />
            </Flex>
            <Box position='absolute' bottom='2' width='full' px='2'>
              <Text rounded='lg' bg='rgba(0,0,0,0.6)' color='white' zIndex={1} py='2' px='6' textAlign='center'>
                {forSalePet.breed}
              </Text>
            </Box>
          </Box>
        </Box>
      </NextLink>
    </>
  );
};

const LandingPageForSalePets = () => {
  const { data: randomForSalePets } = useSWR("/for-sale-pets/random", () => forSalePetAPI.getRandom().then(res => res.data));
  return (
    <>
      <Box>
        <Container maxWidth='container.lg'>
          <Heading as='h3' textAlign='center' py='10' fontSize={{ base: "lg", md: "2xl" }} color='blackAlpha.700'>
            For Sale Pets
          </Heading>
          <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }} gap={2}>
            {randomForSalePets?.map(forSalePet => (
              <ForSalePetsItem key={forSalePet._id} forSalePet={forSalePet} />
            ))}
          </Grid>
          <Center pt='10' pb='32'>
            <Link fontSize={{ md: "2xl" }} textDecoration='underline' href='/for-sale-pets'>
              View more
            </Link>
          </Center>
        </Container>
      </Box>
    </>
  );
};

export default LandingPageForSalePets;
