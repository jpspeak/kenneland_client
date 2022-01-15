import { Center, Text, HStack } from "@chakra-ui/react";
import FacebookLoginButton from "./FacebookLoginButton";
import GoogleLoginButton from "./GoogleLoginButton";
import LocalLoginForm from "./LocalLoginForm";

const Login = () => {
  return (
    <>
      <GoogleLoginButton />
      <Text textAlign='center' color='gray.500' my='4'>
        OR
      </Text>
      <LocalLoginForm />
    </>
  );
};

export default Login;
