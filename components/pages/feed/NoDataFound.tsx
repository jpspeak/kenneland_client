import { Center, Text } from "@chakra-ui/react";

const NoDataFound = ({ text = "No data found" }: { text?: string }) => {
  return (
    <>
      <Center height='400px'>
        <Text color='blackAlpha.600'>{text}</Text>
      </Center>
    </>
  );
};

export default NoDataFound;
