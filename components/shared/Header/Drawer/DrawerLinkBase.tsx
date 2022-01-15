import { Button } from "@chakra-ui/button";
import { Text } from "@chakra-ui/layout";
import Link from "next/link";
import { useContext } from "react";
import { DrawerContext } from "./Drawer";

const DrawerLinkBase = ({ href, text, icon }: { href: string; text: string; icon: JSX.Element }) => {
  const { closeDrawer } = useContext(DrawerContext);

  return (
    <Link href={href}>
      <a style={{ width: "100%" }}>
        <Button onClick={closeDrawer} iconSpacing='4' color='blackAlpha.700' fontWeight='bold' w='full' justifyContent='start' variant='ghost' leftIcon={icon}>
          <Text isTruncated>{text}</Text>
        </Button>
      </a>
    </Link>
  );
};

export default DrawerLinkBase;
