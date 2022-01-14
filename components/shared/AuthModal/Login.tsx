import { Center, Text, HStack } from "@chakra-ui/react";
import FacebookLoginButton from "./FacebookLoginButton";
import GoogleLoginButton from "./GoogleLoginButton";
// import FacebookLoginButton from "../FacebookLoginButton";
// import GoogleLoginButton from "../GoogleLoginButton";
import LocalLoginForm from "./LocalLoginForm";
const Login = () => {
  return (
    <>
      <LocalLoginForm />
      {/* <Divider orientation='horizontal' my='8' /> */}
      <Text textAlign='center' color='gray.500' mt='8' mb='4'>
        Or Login With:
      </Text>
      <Center>
        <HStack spacing='2'>
          <GoogleLoginButton />
          <FacebookLoginButton />
        </HStack>
      </Center>
    </>
  );
};

export default Login;
