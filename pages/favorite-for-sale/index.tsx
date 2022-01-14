import { Box, Center, Container, Flex, Text, Heading, Grid } from "@chakra-ui/layout";
import useUser from "../../hooks/swr/use-user";
import Link from "next/link";
import { Link as _Link } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import useFavoriteForSale from "../../hooks/swr/use-favorite-for-sale";

const Nav = () => {
  const router = useRouter();
  return (
    <Flex justifyContent={{ md: "center" }}>
      <Link href='/favorite-studs' passHref>
        <_Link
          _hover={{ textDecoration: "none" }}
          textDecoration='none'
          p='2'
          mx={{ md: "4" }}
          textAlign='center'
          width={{ base: "full", md: "max-content" }}
          borderBottom={router.asPath === "/favorite-studs" ? "2px" : "none"}
          borderColor='brand.500'
        >
          Studs (0)
        </_Link>
      </Link>
      <Link href='/favorite-studs' passHref>
        <_Link
          _hover={{ textDecoration: "none" }}
          textDecoration='none'
          p='2'
          mx={{ md: "4" }}
          textAlign='center'
          width={{ base: "full", md: "max-content" }}
          borderBottom={router.asPath === "/favorite-for-sale" ? "2px" : "none"}
          borderColor='brand.500'
        >
          For Sale (0)
        </_Link>
      </Link>
    </Flex>
  );
};
const Favorites = () => {
  const { favoriteForSale } = useFavoriteForSale();

  return (
    <>
      <Box>
        <Container maxWidth='container.xl' mt='1'>
          <Box>
            <Heading size='md' fontWeight='semibold' mb={{ base: "4", md: "8" }} pt='4'>
              Favorites
            </Heading>
            <Nav />
          </Box>
        </Container>
      </Box>
      <Container maxWidth='container.xl' mt='4'>
        {favoriteForSale?.length ? (
          <Grid templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }} gap='2'>
            {favoriteForSale?.map(singleForSale => (
              <></>
              // <StudItem key={singleForSale._id} href={`/kennels/${singleForSale.kennel}/studs/${singleForSale._id}`} forSale={stud} />
            ))}
          </Grid>
        ) : (
          <Center mt='20' flexDirection='column'>
            <Image src='/no-data.svg' width='100' height='100' objectFit='contain' alt='no-data' />
            <Text mt='4' ml='2' textAlign='center' color='blackAlpha.700'>
              No Favorites
            </Text>
          </Center>
        )}
      </Container>
    </>
  );
};
export default Favorites;
