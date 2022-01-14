import Icon from "@chakra-ui/icon";
import { Box, HStack, Text } from "@chakra-ui/layout";
import { HiOutlineFilter } from "react-icons/hi";
import ForSalePetsFilterDrawer from "./ForSalePetsFilterDrawer";
import ForSalePetsFilterForm from "./ForSalePetsFilterFom";

const ForSalePetsFilter = () => {
  return (
    <>
      <Box shadow='xs' width='100%' p='4' rounded='lg' bgColor='white' display={{ base: "none", md: "block" }}>
        <HStack mb='4'>
          <Icon as={HiOutlineFilter} />
          <Text>Filter </Text>
        </HStack>
        <ForSalePetsFilterForm />
      </Box>
      <ForSalePetsFilterDrawer />
    </>
  );
};

export default ForSalePetsFilter;
