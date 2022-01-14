import { Flex } from "@chakra-ui/layout";
import Image from "next/image";
import useHashBasedModal from "../../../../hooks/use-hash-based-modal";
import GalleryFullView from "../../../shared/GalleryFullView";

const KennelBanner = ({ src }: { src?: string }) => {
  const { isOpen, openModal, closeModal } = useHashBasedModal("#banner");
  return (
    <>
      <Flex cursor='pointer' onClick={openModal} rounded={{ md: "lg" }} overflow='hidden'>
        <Image objectFit='cover' src={`${src || "/banner-default.png"}`} height='300' width='900' alt='Kennel banner' className='bg-gray-200' />
      </Flex>
      {src && <GalleryFullView isOpen={isOpen} onClose={closeModal} mediaUrls={[src]} />}
    </>
  );
};

export default KennelBanner;
