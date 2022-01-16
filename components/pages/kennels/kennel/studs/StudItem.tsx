import { Avatar } from "@chakra-ui/avatar";
import Icon from "@chakra-ui/icon";
import { Box, Flex, HStack, Text, VStack } from "@chakra-ui/layout";
import Image from "next/image";
import { HiOutlineHeart, HiOutlineLocationMarker } from "react-icons/hi";
import { IStud } from "../../../../../types";
import Link from "next/link";

import shortNumber from "short-number";

const StudItem = ({ href, stud }: { href: string; stud: IStud }) => {
  return (
    <Box bgColor='white' rounded={{ md: "lg" }} overflow='hidden' shadow='xs' cursor='pointer' _hover={{ md: { shadow: "lg" } }}>
      <HStack p='2' spacing={{ base: "1", md: "2" }}>
        <Link href={`/kennels/${stud.kennel._id}`} passHref>
          <Avatar size='sm' src={stud.kennel.displayPicture} cursor='pointer' />
        </Link>
        <VStack alignItems='normal' spacing='0'>
          <Link href={`/kennels/${stud.kennel._id}`} passHref>
            <Text fontSize={{ base: "xs", md: "sm" }} lineHeight='short' noOfLines={1} cursor='pointer' _hover={{ textDecoration: "underline" }}>
              {stud.kennel.name}
            </Text>
          </Link>
          <HStack color='blackAlpha.700' spacing='0' lineHeight='shorter' fontSize={{ base: "x-small", md: "xs" }}>
            <Icon as={HiOutlineLocationMarker} />
            <Text noOfLines={1}>{stud?.location}</Text>
          </HStack>
        </VStack>
      </HStack>
      <Link href={href} passHref>
        <Box cursor='pointer'>
          <Flex overflow='hidden'>
            <Image src={stud.images?.[0] || "/logo.png"} alt='Dog image' height={500} width={500} objectFit='cover' className='bg-gray-200' />
          </Flex>

          <Box p='2'>
            <Text fontWeight='semibold' fontSize={{ base: "xs", md: "xs" }} noOfLines={1}>
              {stud.name}
            </Text>
            <Text fontSize={{ base: "xs", md: "xs" }} noOfLines={1}>
              {stud.breed}
            </Text>
            <HStack mt='2' spacing={1} fontSize='x-small' color='blackAlpha.600' justifyContent='end' alignItems='center'>
              <Icon as={HiOutlineHeart} color='blackAlpha.500' h='3' w='3' />
              <Text lineHeight='none'>{stud.likesCount > 0 ? shortNumber(stud.likesCount) : "0"}</Text>
            </HStack>
          </Box>
        </Box>
      </Link>
    </Box>
  );
};
export default StudItem;
