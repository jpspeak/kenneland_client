import { Avatar } from "@chakra-ui/avatar";
import { Button } from "@chakra-ui/button";
import Icon from "@chakra-ui/icon";
import { HStack, Spacer, Text, VStack } from "@chakra-ui/layout";
import { useBreakpointValue } from "@chakra-ui/media-query";
import { HiOutlineLocationMarker } from "react-icons/hi";
import Link from "next/link";
import { Link as _Link } from "@chakra-ui/react";
import router from "next/router";
import ContactKennelModal from "./ContactKennelModal";
import { IKennel } from "../../types";

const KennelCardViewContact = ({ kennel, showContact = false }: { kennel: IKennel; showContact?: boolean }) => {
  const buttonSize = useBreakpointValue({ base: "xs", md: "sm" });
  return (
    <>
      <HStack
        width='full'
        shadow='xs'
        rounded='lg'
        p={{ base: "4", md: "6" }}
        backgroundImage={`linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.8)), url('${kennel.banner}')`}
        backgroundPosition='center'
        backgroundRepeat='no-repeat'
        backgroundBlendMode='darken'
      >
        <Avatar src={kennel.displayPicture} size='lg' />
        <VStack alignItems='start' spacing='0' color='white'>
          <Link href={`/kennels/${kennel._id}`} passHref>
            <_Link fontWeight='semibold' fontSize={{ md: "lg" }}>
              {kennel.name}
            </_Link>
          </Link>
          <HStack fontSize={{ base: "xs", md: "sm" }} alignItems='center' spacing='0'>
            <Icon as={HiOutlineLocationMarker} />
            <Text noOfLines={1}>{kennel.location}</Text>
          </HStack>
        </VStack>
        <Spacer />
        <VStack>
          {showContact && <ContactKennelModal kennel={kennel} />}
          <Button
            onClick={() => {
              router.push(`/kennels/${kennel._id}`);
            }}
            width='full'
            variant='solid'
            px='8'
            py='4'
            size={buttonSize}
            rounded='full'
            flexShrink={0}
          >
            View
          </Button>
        </VStack>
      </HStack>
    </>
  );
};

export default KennelCardViewContact;
