import Icon from "@chakra-ui/icon";
import { Box, HStack, Text } from "@chakra-ui/layout";
import { HiOutlineFilter } from "react-icons/hi";

const FilterWrapper: React.FC = ({ children }) => {
  return (
    <>
      <Box shadow='xs' width='100%' p='4' rounded='lg' bgColor='white' display={{ base: "none", md: "block" }}>
        <HStack mb='4' fontSize='large' fontWeight='semibold'>
          <Icon as={HiOutlineFilter} />
          <Text>Filter </Text>
        </HStack>
        {children}
      </Box>
    </>
  );
};

export default FilterWrapper;
