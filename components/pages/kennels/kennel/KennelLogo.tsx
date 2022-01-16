import { Box, Flex } from "@chakra-ui/react";
import Image from "next/image";
import useHashBasedModal from "../../../../hooks/use-hash-based-modal";
import GalleryFullView from "../../../shared/GalleryFullView";

const KennelLogo = ({ src }: { src?: string; name: string }) => {
  const { isOpen, openModal, closeModal } = useHashBasedModal("#display-picture");
  return (
    <>
      <Box
        onClick={() => {
          src && openModal();
        }}
        cursor={src ? "pointer" : "unset"}
        type='button'
        width='25%'
        position='absolute'
        top='100%'
        transform='auto'
        translateY='-50%'
        left='4'
      >
        <Box pb='100%' borderRadius='full' bgColor='white' position='relative' shadow='base'>
          <Flex position='absolute' m={{ base: "2px", md: "4px" }} border='1px' borderColor='gray.200' rounded='full'>
            <Image src={src || "/kennel-display-picture-default.png"} alt='Kennel display picture' height={500} width={500} objectFit='cover' className='rounded-full absolute bg-gray-200' />
          </Flex>
        </Box>
      </Box>
      {src && <GalleryFullView isOpen={isOpen} onClose={closeModal} mediaUrls={[src]} />}
    </>
  );
};

export default KennelLogo;
