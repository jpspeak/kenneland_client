import { Box, Center, Text, HStack, VStack } from "@chakra-ui/layout";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import useForSalePetsByKennel from "../../../../hooks/swr/use-for-sale-pets-by-kennel";
import useStudsByKennel from "../../../../hooks/swr/use-studs-by-kennel";

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

const KennelNav = ({ kennelId }: { kennelId: string }) => {
  const { pathname } = useRouter();
  const { studs } = useStudsByKennel(kennelId);
  const { forSalePetsByKennel } = useForSalePetsByKennel(kennelId);
  const studsCount = studs?.length;
  const forSalePetsCount = forSalePetsByKennel?.filter(forSalePet => forSalePet.sold === false).length;
  return (
    <>
      <HStack justifyContent='space-evenly' bgColor='white' fontWeight='semibold' color='blackAlpha.700' mt='2' shadow='xs'>
        <NavLink href={`/kennels/${kennelId}/posts`} text='POSTS' isActive={pathname === "/kennels/[kennel]/posts" ? true : false} />
        <NavLink href={`/kennels/${kennelId}/studs`} text='STUD SERVICE' isActive={pathname === "/kennels/[kennel]/studs" ? true : false} count={studsCount} />
        <NavLink href={`/kennels/${kennelId}/for-sale-pets`} text='FOR SALE' isActive={pathname === "/kennels/[kennel]/for-sale-pets" ? true : false} count={forSalePetsCount} />
      </HStack>
    </>
  );
};

export default KennelNav;
