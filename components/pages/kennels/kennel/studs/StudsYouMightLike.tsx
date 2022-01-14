import { Box, Flex, Grid, Text } from "@chakra-ui/layout";
import Image from "next/image";

const StudsYouMightLike = () => {
  return (
    <Box rounded='lg' p='4' shadow='xs' bgColor='white'>
      <Text fontSize='large' fontWeight='bold'>
        Studs you might like
      </Text>
      <Grid templateColumns='repeat(3, 1fr)' mt='4' gap='2'>
        <Box shadow='xs' rounded='lg' overflow='hidden'>
          <Flex>
            <Image src='/snowdog.jpg' alt='Dog image' height='400' width='400' objectFit='cover' />
          </Flex>
        </Box>
        <Box shadow='xs' rounded='lg' overflow='hidden'>
          <Flex>
            <Image src='/snowdog.jpg' alt='Dog image' height='400' width='400' objectFit='cover' />
          </Flex>
        </Box>
      </Grid>
    </Box>
  );
};

export default StudsYouMightLike;
