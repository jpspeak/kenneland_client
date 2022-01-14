import { Box, Center, Container, Flex, Heading, Link } from '@chakra-ui/layout'
import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import FailedToLoad from '../components/shared/FailedToLoad'
import Image from "next/image"
import { Button } from '@chakra-ui/button'
import LandingPageKennels from '../components/pages/index/LandingPageKennels'
import LandingPageStuds from '../components/pages/index/LandingPageStuds'
import LandingPageForSalePets from '../components/pages/index/LandingPageForSalePets'
import LandingPageFooter from '../components/pages/index/LandingPageFooter'
import NextLink from "next/link"
import {useEffect} from "react"
import useUser from '../hooks/swr/use-user'
import { useRouter } from 'next/router'
import { useRecoilValue } from 'recoil'
import globalLoadingOverlayAtom from '../state/atoms/global-loading-overlay.atom'
import LoadingSpinner from '../components/shared/LoadingSpinner'

const Home: NextPage = () => {
  const { isLoggedIn, isLoadingUser} = useUser()
  const router = useRouter()

  useEffect(() => {
    if(isLoggedIn){
      router.replace("/feed")
    }
  }, [isLoggedIn, router])

  if(isLoadingUser || (isLoggedIn)) return <LoadingSpinner />
  return (
    <>
      <Head>
        <title>Kenneland</title>
        <meta name="description" content="Kennels, breeders, stud and for sale dogs" />
      </Head>
     
      <Box w="full" >
        {/* <Box height="500px" bg="linear-gradient(to right, black, #805AD5)">
          <Container maxWidth="container.lg" height="full">
            <Flex alignItems="center" height="full">
              <Box width={{base: "100%", md: "50%"}}>
                <Heading width="full" textAlign={{base: "center", md: "left"}} fontFamily="Montserrat" color="white" fontSize={{base:"4xl", md: "5xl"}} lineHeight="normal" >A place <br /> for  Dog Lovers</Heading>
                <Heading textAlign={{base: "center", md: "left" }} mt="6" as="h2" fontSize={{base:"lg", md: "2xl"}} color="white" lineHeight="tall" fontWeight="light">Where you can promote your kennel,<br /> follow breeders, find studs and <br /> sell your lovely dogs</Heading>
              </Box>
              <Box display={{base: 'none', md:'block'}} width="50%">
                <Flex width="full" pb="70%" rounded="lg" position="relative">
                  <Image priority={true} src="/blackbully.jpg" alt="home banner" objectFit="cover" objectPosition="90% 70%" layout="fill" className="mix-blend-soft-light"/>
                </Flex>
              </Box>
            </Flex>
          </Container>
        </Box> */}
        <Flex position="relative" width="full" height="500px"  > 
        
          <Image priority={true} src="/blackbully.jpg" alt="home banner" objectFit="cover" objectPosition="90% 50%" layout="fill" className="filter brightness-50"/>
         
          <Container maxWidth="container.lg" position="relative" width="full">
            <Flex flexDirection="column" justifyContent="center" alignItems="center" height="full" >
              <Heading width="full" textAlign="center"  color="white" letterSpacing="wide" fontSize={{base:"4xl", md: "6xl"}} lineHeight="normal" >A place <br /> for  Dog Lovers</Heading>
              <Heading textAlign="center" mt="6" as="h2" fontSize={{base:"lg", md: "2xl"}} letterSpacing="wide" color="white" lineHeight="tall" fontWeight="light">Where you can promote your kennel,<br /> follow breeders, find studs and <br /> sell your lovely dogs</Heading>
              <Flex mt="20" justifyContent="center">
                <NextLink href='/kennels' >
                  <Button  size="lg"  rounded="none" colorScheme="primary" width="300px" >Explore</Button>
                </NextLink>
              </Flex>
            </Flex>
          </Container>
        </Flex>
 
        <LandingPageKennels/>
        <LandingPageStuds />
        <LandingPageForSalePets  />
        <LandingPageFooter />
      </Box>
    </>
  )
}

export default Home

// export const getServerSideProps: GetServerSideProps = async context => {
//   const query = context.query;
//   try {
//     const res = await kennelAPI.getAll(query);
//     return {
//       props: { initialKennels: res.data || null }
//     };
//   } catch (error) {
//     const err = error as AxiosError;
//     return {
//       props: { errorCode: err.response?.status }
//     };
//   }
// };