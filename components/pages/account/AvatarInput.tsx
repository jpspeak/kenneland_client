import { Avatar } from "@chakra-ui/avatar";
import { IconButton } from "@chakra-ui/button";
import Icon from "@chakra-ui/icon";
import { Box } from "@chakra-ui/layout";
import { HiCamera } from "react-icons/hi";
import { useRef, useState } from "react";
import { ChangeEventHandler } from "react-transition-group/node_modules/@types/react";

const AvatarInput = ({ imageUrl, name, onChange }: { imageUrl?: string; name?: string; onChange: (file: File) => void }) => {
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
      <Box position='relative'>
        <Avatar size='2xl' src={_imageUrl} name={name} />
        <IconButton
          onClick={handleOnClick}
          aria-label='Upload avatar'
          background='rgba(0, 0, 0, .3)'
          position='absolute'
          top='50%'
          left='50%'
          translateX='-50%'
          transform='auto'
          translateY='-50%'
          rounded='full'
        >
          <Icon as={HiCamera} color='white' />
        </IconButton>
      </Box>

      <input ref={inputEl} onChange={handleOnChange} type='file' accept='image/jpeg, image/jpg, image/png' hidden />
    </>
  );
};

export default AvatarInput;
