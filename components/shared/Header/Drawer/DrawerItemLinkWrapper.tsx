import { Button } from "@chakra-ui/button";
import { Text } from "@chakra-ui/layout";
import { Icon } from "@chakra-ui/react";
import Link from "next/link";
import { useContext } from "react";
import { IconType } from "react-icons";
import { DrawerContext } from "./Drawer";

const DrawerItemLinkWrapper = ({ href, text, icon }: { href: string; text: string; icon: IconType }) => {
  const { closeDrawer } = useContext(DrawerContext);

  return (
    <Link href={href} passHref>
      <Button
        onClick={closeDrawer}
        iconSpacing='4'
        color='blackAlpha.700'
        fontWeight='semibold'
        fontSize='sm'
        w='full'
        justifyContent='start'
        variant='ghost'
        leftIcon={<Icon as={icon} h={5} w={5} color='blackAlpha.500' />}
      >
        <Text isTruncated>{text}</Text>
      </Button>
    </Link>
  );
};

export default DrawerItemLinkWrapper;
