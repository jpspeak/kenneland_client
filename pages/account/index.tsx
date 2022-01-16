import { Box, Center, Container, Flex, Grid, Heading, HStack, Text, VStack } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import AccountInfo from "../../components/pages/account/AccountInfo";
import ChangePasswordModal from "../../components/pages/account/ChangePasswordModal";
import DeleteAccountAlertDialog from "../../components/pages/account/DeleteAccountAlertDialog";
import YouAreNotLoggedIn from "../../components/pages/feed/YouAreNotLoggedIn";
import useUser from "../../hooks/swr/use-user";

const Account = () => {
  const { isLoggedIn, isLoadingUser } = useUser();
  if (isLoadingUser) return <Spinner size='sm' m='2' />;
  if (!isLoggedIn) return <YouAreNotLoggedIn />;
  return (
    <Box height='full'>
      <Container maxWidth='container.xl' mt='1'>
        <Box height='full' maxWidth='lg' marginLeft='auto' marginRight='auto'>
          <Heading size='md' fontWeight='semibold' mb='8' pt={{ base: "4", md: "8" }}>
            Account
          </Heading>
          <VStack alignItems='stretch'>
            <AccountInfo />
            <ChangePasswordModal />
            <DeleteAccountAlertDialog />
          </VStack>
        </Box>
      </Container>
    </Box>
  );
};

export default Account;
