import { Box, Center, Text, HStack, VStack } from "@chakra-ui/layout";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";

const NavLink = ({ href, text, isActive, count }: { href: string; text: string; isActive?: boolean; count?: number }) => (
  <Link href={href} passHref>
    <Box cursor='pointer' position='relative'>
      <VStack _after={isActive ? { content: '""', bgColor: "primary.500", width: "100%", height: "4px", roundedTop: "full", position: "absolute", bottom: "0" } : {}}>
        <HStack px='2'>
          <Text fontFamily='Montserrat' py='4' fontSize='xs' color={isActive ? "primary.600" : ""}>
            {text}
          </Text>
          {count && count > 0 && (
            <Center fontSize='x-small' fontWeight='bold' h='4' w='4' bgColor={isActive ? "primary.500" : "blackAlpha.600"} color='white' rounded='sm'>
              {count}
            </Center>
          )}
        </HStack>
      </VStack>
    </Box>
  </Link>
);

const FeedNav = () => {
  const { pathname } = useRouter();
  return (
    <>
      <HStack justifyContent='space-evenly' fontWeight='semibold' color='blackAlpha.700' mt='4' shadow='xs' rounded={{ md: "lg" }} bgColor='white'>
        <NavLink href={`/feed/posts`} text='POSTS' isActive={pathname === "/feed/posts" ? true : false} />
        <NavLink href={`/feed/studs`} text='STUDS' isActive={pathname === "/feed/studs" ? true : false} count={0} />
        <NavLink href={`/feed/for-sale-pets`} text='FOR SALE' isActive={pathname === "/feed/for-sale-pets" ? true : false} count={0} />
      </HStack>
    </>
  );
};

export default FeedNav;
