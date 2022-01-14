import { Center } from "@chakra-ui/layout";
import { HiArrowLeft } from "react-icons/hi";
import useBack from "../../hooks/use-back";

const BackButton = () => {
  const back = useBack();
  return (
    <Center as='button' h='30px' w='30px' aria-label='back' onClick={back} rounded='full' color='white' bg='rgba(0,0,0,0.3)'>
      <HiArrowLeft />
    </Center>
  );
};

export default BackButton;
