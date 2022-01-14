import { Box, Grid, GridItem } from "@chakra-ui/layout";

interface DogProps {}

const Dog = () => {
  return (
    <>
      <Box p='2'>
        <Grid templateColumns='repeat(3,1fr)'>
          <GridItem colStart={2}>
            <Box width='100%' paddingBottom='100%' bgColor='green.200' borderRadius='full'></Box>
          </GridItem>
        </Grid>
        <Grid templateColumns='repeat(3,1fr)' gap='2' mt='2'>
          <Box width='100%' paddingBottom='100%' bgColor='green.200' borderRadius='lg'></Box>
          <Box width='100%' paddingBottom='100%' bgColor='green.200' borderRadius='lg'></Box>
          <Box width='100%' paddingBottom='100%' bgColor='green.200' borderRadius='lg'></Box>
          <Box width='100%' paddingBottom='100%' bgColor='green.200' borderRadius='lg'></Box>
          <Box width='100%' paddingBottom='100%' bgColor='green.200' borderRadius='lg'></Box>
          <Box width='100%' paddingBottom='100%' bgColor='green.200' borderRadius='lg'></Box>
          <Box width='100%' paddingBottom='100%' bgColor='green.200' borderRadius='lg'></Box>
          <Box width='100%' paddingBottom='100%' bgColor='green.200' borderRadius='lg'></Box>
          <Box width='100%' paddingBottom='100%' bgColor='green.200' borderRadius='lg'></Box>
          <Box width='100%' paddingBottom='100%' bgColor='green.200' borderRadius='lg'></Box>
          <Box width='100%' paddingBottom='100%' bgColor='green.200' borderRadius='lg'></Box>
        </Grid>
      </Box>
    </>
  );
};

export default Dog;
