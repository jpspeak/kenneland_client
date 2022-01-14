import { Box, Icon, IconButton, Flex } from "@chakra-ui/react";
import Image from "next/image";
import { HiCamera } from "react-icons/hi";
import { useState, useRef } from "react";
import { ChangeEventHandler } from "react-transition-group/node_modules/@types/react";

const KennelLogoInput = ({ imageUrl, onChange }: { imageUrl?: string; onChange: (file: File) => void }) => {
  const [_imageUrl, _setImageUrl] = useState(imageUrl);
  const inputEl = useRef<HTMLInputElement | null>(null);

  const handleOnClick = () => {
    inputEl.current?.click();
  };

  const handleOnChange: ChangeEventHandler<HTMLInputElement> = e => {
    const file = e.target.files?.[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    _setImageUrl(imageUrl);
    onChange(file);
  };
  return (
    <>
      <Box width='25%' position='absolute' top='100%' transform='auto' translateY='-50%' left='4'>
        <Box pb='100%' borderRadius='full' bgColor='white' position='relative' shadow='base'>
          <Flex position='absolute' m={{ base: "2px", md: "4px" }} border='1px' borderColor='gray.200' rounded='full'>
            <IconButton
              onClick={handleOnClick}
              aria-label='Upload display picture'
              background='rgba(0, 0, 0, .3)'
              position='absolute'
              top='50%'
              transform='auto'
              translateY='-50%'
              left='50%'
              translateX='-50%'
              rounded='full'
              zIndex={2}
            >
              <Icon as={HiCamera} color='white' />
            </IconButton>
            <Image src={_imageUrl || "/kennel-display-picture-default.png"} alt='Kennel display picture' height={500} width={500} objectFit='cover' className='rounded-full absolute bg-gray-200' />
          </Flex>
        </Box>
      </Box>
      <input ref={inputEl} type='file' accept='image/jpeg, image/jpg, image/png' hidden onChange={handleOnChange} />
    </>
  );
};

export default KennelLogoInput;
