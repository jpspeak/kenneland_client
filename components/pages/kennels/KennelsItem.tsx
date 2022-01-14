import { Box, Flex, HStack, Text } from "@chakra-ui/layout";
import Link from "next/link";
import Image from "next/image";
import Icon from "@chakra-ui/icon";
import { HiOutlineLocationMarker } from "react-icons/hi";

interface KennelItemProps {
  _id: string;
  name: string;
  displayPicture: string;
  location: string;
}

const KennelItem = ({ _id, name, displayPicture, location }: KennelItemProps) => {
  return (
    <Link href={`/kennels/${_id}`} passHref>
      <Box cursor='pointer' width='100%' bgColor='white' shadow='xs' rounded='lg' py='4' px='4' _hover={{ md: { shadow: "lg" } }}>
        <Box borderRadius='full' pb='100%' bgColor='blackAlpha.100' shadow='xs' className='relative'>
          <Box className='absolute m-1'>
            <Image src={displayPicture || "/kennel-display-picture-default.png"} alt='Kennel displayPicture' objectFit='cover' height={500} width={500} className='rounded-full absolute' />
          </Box>
        </Box>
        <Text textAlign='center' noOfLines={1} fontWeight='semibold' fontSize={{ base: "xs", sm: "sm" }} mt='3'>
          {name} sdf sdfsdf sdf
        </Text>
        <HStack justifyContent='center' color='blackAlpha.700' spacing='0' lineHeight='short' fontSize={{ base: "x-small", md: "xs" }}>
          <Icon as={HiOutlineLocationMarker} />
          <Text noOfLines={1}>{location}</Text>
        </HStack>
      </Box>
    </Link>
  );
};

export default KennelItem;
