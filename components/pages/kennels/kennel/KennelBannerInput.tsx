import { IconButton } from "@chakra-ui/button";
import Icon from "@chakra-ui/icon";
import { Flex, HStack } from "@chakra-ui/layout";
import Image from "next/image";
import { HiCamera, HiOutlineTrash } from "react-icons/hi";
import { useState, useRef } from "react";
import { ChangeEventHandler } from "react-transition-group/node_modules/@types/react";

const KennelBannerInput = ({ imageUrl, onChange, onDelete }: { imageUrl?: string; onChange: (file: File) => void; onDelete: () => void }) => {
  const [_imageUrl, _setImageUrl] = useState(imageUrl);
  const inputEl = useRef<HTMLInputElement | null>(null);

  const handleOnClickUpload = () => {
    inputEl.current?.click();
  };
  const handleOnClickDelete = () => {
    _setImageUrl(undefined);
    onDelete();
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
      <HStack justifyContent='right' position='absolute' zIndex={1} width='100%' p='2'>
        <IconButton onClick={handleOnClickUpload} aria-label='Upload banner' background='rgba(0, 0, 0, .3)' rounded='full'>
          <Icon as={HiCamera} color='white' />
        </IconButton>

        {_imageUrl && (
          <IconButton onClick={handleOnClickDelete} aria-label='Delete banner' background='rgba(0, 0, 0, .3)' rounded='full'>
            <Icon as={HiOutlineTrash} color='white' />
          </IconButton>
        )}
      </HStack>
      <Flex>
        <Image objectFit='cover' src={`${_imageUrl || "/banner-default.png"}`} height='300' width='900' alt='Kennel banner' className='bg-gray-200' />
      </Flex>
      <input ref={inputEl} type='file' accept='image/jpeg, image/jpg, image/png' hidden onChange={handleOnChange} />
    </>
  );
};

export default KennelBannerInput;
