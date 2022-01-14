import Icon from "@chakra-ui/icon";
import { Center } from "@chakra-ui/layout";
import { ImFileEmpty } from "react-icons/im";

const EmptyData = () => {
  return (
    <>
      <Center>
        <Icon as={ImFileEmpty} h='8' w='8' color='blackAlpha.300' />
      </Center>
    </>
  );
};

export default EmptyData;
