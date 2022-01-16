import { Button } from "@chakra-ui/button";
import { Icon } from "@chakra-ui/react";
import { MouseEventHandler } from "react";
import { IconType } from "react-icons";

const DrawerItemButtonWrapper = ({ onClick, text, icon }: { onClick: MouseEventHandler<HTMLButtonElement>; text: string; icon: IconType }) => {
  return (
    <Button
      iconSpacing='4'
      color='blackAlpha.700'
      fontWeight='semibold'
      fontSize='sm'
      variant='ghost'
      w='full'
      onClick={onClick}
      justifyContent='left'
      leftIcon={<Icon as={icon} h={5} w={5} color='blackAlpha.500' />}
    >
      {text}
    </Button>
  );
};

export default DrawerItemButtonWrapper;
