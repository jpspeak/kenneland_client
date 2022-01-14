import { Button } from "@chakra-ui/button";
import { Center } from "@chakra-ui/layout";

const FilterButton = ({ filterCount, onClick }: { filterCount: number; onClick: () => void }) => {
  return (
    <>
      <Button
        rightIcon={
          filterCount ? (
            <Center fontSize='xs' color='secondary.500' bgColor='white' h='4' w='4' rounded='full'>
              {filterCount}
            </Center>
          ) : (
            undefined
          )
        }
        onClick={onClick}
        display={{ md: "none" }}
        px='8'
        rounded='full'
        colorScheme='secondary'
        size='sm'
        position='fixed'
        bottom='4'
        left='50%'
        transform='auto'
        translateX='-50%'
        zIndex={2}
      >
        Filter
      </Button>
    </>
  );
};

export default FilterButton;
