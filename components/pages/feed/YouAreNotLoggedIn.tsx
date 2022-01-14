import { Box, Center, Text } from "@chakra-ui/react";
import { useSetRecoilState } from "recoil";
import authModalAtom from "../../../state/atoms/auth-modal.atom";

const YouAreNotLoggedIn = () => {
  const setAuthModal = useSetRecoilState(authModalAtom);
  return (
    <>
      <Center width='full' height='400px'>
        <Text color='blackAlpha.600' textAlign='center'>
          You are not logged in.{" "}
          <Box as='span' color='secondary.500' cursor='pointer' onClick={() => setAuthModal({ isOpen: true })}>
            Log in
          </Box>
        </Text>
      </Center>
    </>
  );
};

export default YouAreNotLoggedIn;
