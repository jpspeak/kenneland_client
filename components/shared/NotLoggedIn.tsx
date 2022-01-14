import { Heading, Text, VStack } from "@chakra-ui/layout";

const NotLoggedIn = () => {
  return (
    <>
      <VStack p='4' m='4' bgColor='white' rounded='xl'>
        <Heading size='md' color='teal'>
          You are not logged in
        </Heading>
        <Text color='gray.600' textAlign='center'>
          Need to login first or register to create account
        </Text>
      </VStack>
    </>
  );
};

export default NotLoggedIn;
