import { Box, Container, Grid, GridItem, Flex, Text, HStack } from "@chakra-ui/layout";
import Nav from "./Nav";
import Image from "next/image";
import { Button } from "@chakra-ui/button";
import { useSetRecoilState } from "recoil";
import authModalAtom from "../../../state/atoms/auth-modal.atom";
import useUser from "../../../hooks/swr/use-user";
import AppDrawer from "./Drawer/Drawer";
import HeaderChatButton from "./HeaderChatButton";
import Link from "next/link";
import Head from "next/head";

const Logo = () => {
  return (
    <>
      <Link href='/' passHref>
        <Flex alignItems='center' cursor='pointer'>
          <Flex flexShrink={0} position='relative'>
            {/* <Image src='/logo.svg' alt='logo' height='18' width='144' objectFit='contain' /> */}
            <Image src='/logo.svg' alt='logo' height='24' width='164' objectFit='contain' />
          </Flex>
          <Text fontFamily='Montserrat' fontWeight='bold' fontSize='xl' ml='2' color='blackAlpha.800'></Text>
        </Flex>
      </Link>
    </>
  );
};

const AuthButton = () => {
  const setAuthModal = useSetRecoilState(authModalAtom);
  return (
    <Button variant='solid' rounded='full' colorScheme='primary' size='sm' onClick={() => setAuthModal({ isOpen: true })}>
      Login / Register
    </Button>
  );
};

const Header: React.FC = () => {
  const { isLoggedIn, isLoadingUser } = useUser();

  return (
    <>
      <Head>
        <title>Kenneland</title>
        <link rel='shortcut icon' href='/fav.ico' />
      </Head>
      <Box shadow='xs' bg='white'>
        <Container maxWidth='container.lg' pt={{ base: "4", md: "0" }}>
          <Grid templateColumns='repeat(3, 1fr)' templateRows='repeat(2, auto)'>
            <GridItem alignSelf='center' justifySelf='self-start'>
              <Logo />
            </GridItem>
            <GridItem alignSelf='center' rowStart={{ base: 2, md: 1 }} colStart={{ base: 1, md: 2 }} colEnd={{ base: 4, md: 3 }}>
              <Nav />
            </GridItem>
            <GridItem alignSelf='center' justifySelf='end' colStart={3} colEnd={4}>
              {!isLoadingUser && (
                <>
                  {isLoggedIn ? (
                    <HStack>
                      <HeaderChatButton />

                      <AppDrawer />
                    </HStack>
                  ) : (
                    <AuthButton />
                  )}
                </>
              )}
            </GridItem>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Header;
