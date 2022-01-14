import { Avatar } from "@chakra-ui/avatar";
import Icon from "@chakra-ui/icon";
import { Box, Center, Flex, HStack, StackDivider, Text, VStack } from "@chakra-ui/layout";
import Image from "next/image";
import { HiOutlineHeart, HiOutlineLocationMarker } from "react-icons/hi";
import { IForSalePet } from "../../../../../types";
import getMonthsByDate from "../../../../../utils/get-months-by-date";
import Link from "next/link";

import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import ReactTimeAgo from "react-time-ago";

import shortNumber from "short-number";

import { useEffect } from "react";

const ForSalePetItem = ({ href, forSalePet }: { href: string; forSalePet: IForSalePet }) => {
  useEffect(() => {
    TimeAgo.addDefaultLocale(en);
  }, []);
  return (
    <Box bgColor='white' rounded={{ md: "lg" }} overflow='hidden' shadow='xs' _hover={{ md: { shadow: "lg" } }}>
      <HStack p='2' spacing={{ base: "1", md: "2" }}>
        <Link href={`/kennels/${forSalePet.kennel._id}`} passHref>
          <Avatar size='sm' src={forSalePet.kennel.displayPicture} cursor='pointer' />
        </Link>
        <VStack alignItems='normal' spacing='0'>
          <Link href={`/kennels/${forSalePet.kennel._id}`} passHref>
            <Text fontSize={{ base: "xs", md: "sm" }} lineHeight='short' noOfLines={1} cursor='pointer' _hover={{ textDecoration: "underline" }}>
              {forSalePet.kennel.name}
            </Text>
          </Link>
          <HStack color='blackAlpha.700' spacing='0' lineHeight='shorter' fontSize={{ base: "x-small", md: "xs" }}>
            <Icon as={HiOutlineLocationMarker} />
            <Text noOfLines={1}>{forSalePet.location}</Text>
          </HStack>
        </VStack>
      </HStack>

      <Link href={href} passHref>
        <Box cursor='pointer'>
          <Flex overflow='hidden' position='relative'>
            {forSalePet.sold && (
              <Center width='full' height='full' position='absolute' zIndex={1} bg='rgba(0,0,0,.5)'>
                <Image src='/sold.png' alt='sold' height={150} width={150} objectFit='contain' />
              </Center>
            )}
            <Image src={forSalePet.images?.[0] || "/logo.png"} alt='Dog image' height={500} width={500} objectFit='cover' className='bg-gray-200' />
          </Flex>
          <Box p='2'>
            <HStack fontSize={{ base: "xs", md: "xs" }} spacing='1'>
              <Text fontWeight='semibold' noOfLines={1}>
                {forSalePet.breed}
              </Text>
            </HStack>
            <HStack fontSize={{ base: "xs", md: "xs" }} spacing='1' divider={<StackDivider borderColor='gray.200' />}>
              <Text>{forSalePet.sex}</Text>
              <Text>{getMonthsByDate(forSalePet.dateOfBirth)}</Text>
            </HStack>
            <Text fontSize={{ base: "xs", md: "xs" }} noOfLines={1}>
              {new Intl.NumberFormat("tl-PH", { style: "currency", currency: "PHP", minimumFractionDigits: 0 }).format(forSalePet.price)}
            </Text>
            <HStack justifyContent='space-between' mt='2'>
              <Text fontSize={{ base: "x-small", md: "xs" }} noOfLines={1} color='blackAlpha.600' textAlign='end'>
                <ReactTimeAgo date={new Date(forSalePet.createdAt)} locale='en-US' timeStyle='round-minute' />
              </Text>
              <HStack spacing={0} fontSize={{ base: "x-small", md: "xs" }} color='blackAlpha.600' justifyContent='end' alignItems='center'>
                <Icon as={HiOutlineHeart} color='blackAlpha.500' h='3' w='3' />
                <Text lineHeight='shorter'>{forSalePet.likesCount > 0 ? shortNumber(forSalePet.likesCount) : "0"}</Text>
              </HStack>
            </HStack>
          </Box>
        </Box>
      </Link>
    </Box>
  );
};

export default ForSalePetItem;
