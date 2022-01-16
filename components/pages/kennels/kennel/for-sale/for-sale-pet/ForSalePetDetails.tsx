import { HStack, Icon, Text } from "@chakra-ui/react";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { IForSalePet } from "../../../../../../types";
import getMonthsByDate from "../../../../../../utils/get-months-by-date";

const ForSalePetDetails = ({ forSalePet }: { forSalePet: IForSalePet }) => (
  <>
    <Text mt='4' noOfLines={1} lineHeight='short' fontSize='xl' fontWeight='bold' color='blackAlpha.800'>
      {forSalePet.name}
    </Text>
    <Text mt='4' fontWeight='bold' color='blackAlpha.700'>
      Price
    </Text>
    <Text color='blackAlpha.700'>{forSalePet.price ? new Intl.NumberFormat("tl-PH", { style: "currency", currency: "PHP", minimumFractionDigits: 0 }).format(forSalePet.price) : "-"}</Text>
    <Text mt='4' fontWeight='bold' color='blackAlpha.700'>
      Breed
    </Text>
    <Text color='blackAlpha.800'>{forSalePet.breed}</Text>
    <Text mt='4' fontWeight='bold' color='blackAlpha.700'>
      Sex
    </Text>
    <Text color='blackAlpha.800'>{forSalePet.sex}</Text>
    <Text mt='4' fontWeight='bold' color='blackAlpha.700'>
      Age
    </Text>
    <Text color='blackAlpha.800'>{getMonthsByDate(forSalePet.dateOfBirth)}</Text>
    <Text mt='4' fontWeight='bold' color='blackAlpha.700'>
      Description
    </Text>
    <Text as='pre' whiteSpace='pre-wrap' fontFamily='inherit' color='blackAlpha.800'>
      {forSalePet.description || "-"}
    </Text>
    <Text mt='4' fontWeight='bold' color='blackAlpha.700'>
      Current location
    </Text>
    <HStack spacing={0} alignItems='center' mb='10' color='blackAlpha.800'>
      <Icon as={HiOutlineLocationMarker} />
      <Text>{forSalePet.location}</Text>
    </HStack>
  </>
);

export default ForSalePetDetails;
