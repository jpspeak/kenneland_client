import { Button } from "@chakra-ui/button";
import { MouseEventHandler } from "react";

const DrawerButtonBase = ({ onClick, text, icon }: { onClick: MouseEventHandler<HTMLButtonElement>; text: string; icon: JSX.Element }) => {
  return (
    <Button iconSpacing='4' color='blackAlpha.700' fontWeight='bold' variant='ghost' w='full' onClick={onClick} justifyContent='left' leftIcon={icon}>
      {text}
    </Button>
  );
};

export default DrawerButtonBase;
