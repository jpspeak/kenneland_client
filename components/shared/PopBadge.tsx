import { Box, Center } from "@chakra-ui/layout";

const PopBadge: React.FC<{ text: string | number; isHidden: boolean }> = ({ children, text, isHidden }) => {
  return (
    <Box position='relative' width='max-content'>
      <Center
        display={isHidden ? "none" : "flex"}
        bgColor='primary.400'
        color='white'
        fontSize='xx-small'
        rounded='full'
        lineHeight='none'
        position='absolute'
        zIndex={1}
        h='4'
        minW='4'
        px='1'
        top='0'
        right='1'
      >
        {text}
      </Center>
      {children}
    </Box>
  );
};

export default PopBadge;
