import { Avatar } from "@chakra-ui/avatar";
import { Button } from "@chakra-ui/button";
import { Box, HStack, Text, VStack } from "@chakra-ui/layout";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { Icon } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { IKennel } from "../../types";

const KennelCard = ({ kennel }: { kennel: IKennel }) => {
  const router = useRouter();

  const viewKennel = () => {
    router.push(`/kennels/${kennel._id}`);
  };
  return (
    <>
      <Box px='4' py='3' w='full' maxWidth='md' bgColor='white' shadow='xs' rounded='lg' mt='12' color='blackAlpha.700'>
        <HStack alignItems='start' spacing={4} width='full'>
          <Avatar src={kennel.displayPicture} />
          <VStack alignItems='start' spacing='0' width='full'>
            <Text fontWeight='bold' fontSize='md' noOfLines={1}>
              {kennel.name}
            </Text>
            <HStack fontSize={{ base: "sm", md: "sm" }} spacing='1'>
              <Icon as={HiOutlineLocationMarker} />
              <Text noOfLines={1}>{kennel.location}</Text>
            </HStack>
          </VStack>

          <Button colorScheme='primary' flexShrink={0} m='0' px='6' size='sm' alignSelf='center' rounded='full' onClick={viewKennel}>
            View
          </Button>
          {/* <IconButton aria-label='View kennel' alignSelf='center' variant='solid' icon={<Icon as={HiOutlineArrowRight} />} /> */}
        </HStack>
      </Box>
    </>
  );
};

export default KennelCard;
