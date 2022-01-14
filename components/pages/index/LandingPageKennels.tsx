import { Avatar } from "@chakra-ui/avatar";
import { Box, Center, Container, Grid, Heading, Link, Text, Flex } from "@chakra-ui/layout";
import useSWR from "swr";
import kennelAPI from "../../../api-routes/kennel.api";
import { IKennel } from "../../../types";
import Image from "next/image";
import NextLink from "next/link";

const KennelsItem = ({ kennel }: { kennel: IKennel }) => {
  return (
    <NextLink href={`/kennels/${kennel._id}`}>
      <Box cursor='pointer' width='full' bgColor='white' rounded='lg' shadow='xs' _hover={{ shadow: "lg" }} overflow='hidden' position='relative'>
        <Box width='full' paddingBottom='50%' bgColor='gray' position='relative'>
          <Flex position='absolute'>
            <Image src={kennel.banner || "/banner-default.png"} alt='Kennel banner' objectFit='cover' height={400} width={800} />
          </Flex>
        </Box>
        <Center transform='auto' position='absolute' width='full' translateY='-50%'>
          <Avatar size='2xl' src={kennel.displayPicture} showBorder />
        </Center>
        <Text mt='20' pb='4' textAlign='center' fontWeight='semibold' fontSize='lg'>
          {kennel.name}
        </Text>
      </Box>
    </NextLink>
  );
};

const LandingPageKennels = () => {
  const { data: randomKennels } = useSWR("/kennels/random", () => kennelAPI.getRandom().then(res => res.data), { revalidateOnFocus: false });

  return (
    <>
      <Container maxWidth='container.lg' px={{ base: 4, md: 4 }}>
        <Heading as='h3' textAlign='center' py='10' fontSize={{ base: "lg", md: "2xl" }} color='blackAlpha.700'>
          Kennels You Might Like
        </Heading>
        <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }} gap={2}>
          {randomKennels?.map(kennel => (
            <KennelsItem key={kennel._id} kennel={kennel} />
          ))}
        </Grid>
        <Center pt='10' pb='32'>
          <Link fontSize={{ md: "2xl" }} textDecoration='underline' href='/kennels'>
            View more
          </Link>
        </Center>
      </Container>
    </>
  );
};

export default LandingPageKennels;
