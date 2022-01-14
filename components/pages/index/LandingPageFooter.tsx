import { Box, Container } from "@chakra-ui/layout";

const LandingPageFooter = () => {
  return (
    <>
      <Box bgColor='primary.500'>
        <Container maxWidth='container.lg' mt='20'>
          <Box as='footer' py='4' textAlign='center' color='white'>
            © {new Date().getFullYear()} Kenneland. All Rights Reserved.
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default LandingPageFooter;
