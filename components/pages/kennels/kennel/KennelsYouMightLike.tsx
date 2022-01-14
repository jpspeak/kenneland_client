import { Avatar } from "@chakra-ui/avatar";
import { Button } from "@chakra-ui/button";
import Icon from "@chakra-ui/icon";
import { Box, HStack, Spacer, Text, VStack } from "@chakra-ui/layout";
import { HiOutlineLocationMarker } from "react-icons/hi";
import Link from "next/link";
import useKennelsYouMightLike from "../../../../hooks/swr/use-kennels-you-might-like";
import useUser from "../../../../hooks/swr/use-user";
import { IKennel } from "../../../../types";
import { useState, useEffect } from "react";

const KennelsYouMightLikeItem = ({ id, displayPicture, name, location }: { id: string; displayPicture: string; name: string; location: string }) => {
  return (
    <>
      <Box>
        <HStack alignItems='start'>
          <Avatar src={displayPicture || "/kennel-display-picture-default.png"} />
          <VStack spacing='0' alignItems='start' fontSize={{ md: "xs", lg: "sm" }}>
            <Text fontWeight='semibold' noOfLines={1}>
              {name}
            </Text>
            <HStack color='blackAlpha.700' spacing='0'>
              <Icon as={HiOutlineLocationMarker} />
              <Text lineHeight='short' noOfLines={1}>
                {location}
              </Text>
            </HStack>
          </VStack>
          <Spacer />
          <Link href={`/kennels/${id}`} passHref>
            <Button variant='outline' size='sm' rounded='full' alignSelf='center' px='6'>
              View
            </Button>
          </Link>
        </HStack>
      </Box>
    </>
  );
};

const KennelsYouMightLike = ({ kennel }: { kennel: IKennel }) => {
  const { user } = useUser();
  const [kennelsYouMightLike, setKennelsYouMightLike] = useState<IKennel[]>();
  let query: { [key: string]: any } = {};
  query.breed = kennel?.breeds;
  query.userId = user?._id;
  const { kennelsYouMightLikeData, kennelsYouMightLikeError } = useKennelsYouMightLike(query);

  useEffect(() => {
    const kennelsYouMightLikeDataExcludeCurrentKennel = kennelsYouMightLikeData?.filter(_kennel => kennel._id !== _kennel._id);
    setKennelsYouMightLike(kennelsYouMightLikeDataExcludeCurrentKennel);
  }, [kennel._id, kennelsYouMightLikeData]);

  if (!kennelsYouMightLike) return <></>;
  return (
    <>
      <Box rounded='lg' mt='2' shadow='xs' bgColor='white'>
        <Text fontSize='large' fontWeight='bold' p='4'>
          You might like
        </Text>
        <Box maxHeight='400px' overflowY='auto' px='4' pb='4'>
          <VStack alignItems='stretch' spacing='4'>
            {kennelsYouMightLike?.map(_kennel => (
              <KennelsYouMightLikeItem key={_kennel._id} id={_kennel._id} displayPicture={_kennel.displayPicture} name={_kennel.name} location={_kennel.location} />
            ))}
          </VStack>
        </Box>
      </Box>
    </>
  );
};

export default KennelsYouMightLike;
