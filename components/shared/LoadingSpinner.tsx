import { Center } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";

const LoadingSpinner = () => (
  <Center width='full' h='10'>
    <Spinner size='sm' color='blackAlpha.600' />
  </Center>
);

export default LoadingSpinner;
