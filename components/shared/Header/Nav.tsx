import Icon from "@chakra-ui/icon";
import { Box, HStack, VStack, Text } from "@chakra-ui/layout";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import Feed from "../../icons/Feed";
import Kennel from "../../icons/Kennel";
import Market from "../../icons/Market";
import Stud from "../../icons/Stud";

const NavLink = ({ href, text, icon, isActive }: { href: string; text: string; icon: (props: any) => JSX.Element; isActive?: boolean }) => (
  <Link href={href} passHref>
    <Box cursor='pointer' position='relative' rounded='xl' my='4' px='4'>
      <VStack spacing='1'>
        <Box>
          <Icon as={icon} h={{ base: "5", md: "5" }} w={{ base: "5", md: "5" }} color={isActive ? "primary.500" : "blackAlpha.600"} />
        </Box>
        <Text whiteSpace='nowrap' fontSize={{ base: "x-small", md: "x-small" }} color={isActive ? "primary.700" : ""}>
          {text}
        </Text>
      </VStack>
    </Box>
  </Link>
);

const Nav = () => {
  const router = useRouter();
  return (
    <>
      <HStack mt={{ base: "2", md: "0" }} fontFamily='Montserrat' justifyContent='space-between' fontWeight='semibold' color='blackAlpha.700' spacing={{ md: 10 }}>
        <NavLink href='/kennels' text='KENNELS' icon={Kennel} isActive={router.pathname === "/kennels"} />
        <NavLink href='/studs' text='STUDS' icon={Stud} isActive={router.pathname === "/studs"} />
        <NavLink href='/for-sale-pets' text='FOR SALE' icon={Market} isActive={router.pathname === "/for-sale-pets"} />
        <NavLink href='/feed/posts' text='Feed' icon={Feed} isActive={router.pathname === "/feed/posts" || router.pathname === "/feed/studs" || router.pathname === "/feed/for-sale-pets"} />
      </HStack>
    </>
  );
};

export default Nav;
