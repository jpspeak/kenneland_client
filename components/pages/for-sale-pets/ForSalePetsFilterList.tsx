import { Alert, AlertDescription } from "@chakra-ui/alert";
import { Button, Text, HStack } from "@chakra-ui/react";
import { CloseButton } from "@chakra-ui/close-button";
import { Flex } from "@chakra-ui/layout";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { useState, useEffect } from "react";
import Icon from "@chakra-ui/icon";
import { HiOutlineLocationMarker } from "react-icons/hi";
import forSalePetsFilterAtom from "../../../state/atoms/for-sale-pets-filter.atom";

interface ForSalePetsFilterList {
  key: string;
  value: string;
}

const ForSalePetsFilterList = () => {
  const router = useRouter();
  const [forSalePetsFilter, setForSalePetsFilter] = useRecoilState(forSalePetsFilterAtom);
  const [forSalePetsFilterList, setForSalePetsFilterList] = useState<ForSalePetsFilterList[]>([]);

  useEffect(() => {
    let list: ForSalePetsFilterList[] = [];
    forSalePetsFilter.location && list.push({ key: "location", value: forSalePetsFilter.location });
    forSalePetsFilter.sex && list.push({ key: "sex", value: forSalePetsFilter.sex });
    forSalePetsFilter.minPrice && list.push({ key: "minPrice", value: forSalePetsFilter.minPrice });
    forSalePetsFilter.maxPrice && list.push({ key: "maxPrice", value: forSalePetsFilter.maxPrice });
    forSalePetsFilter.breeds.length > 0 && forSalePetsFilter.breeds.forEach(breed => list.push({ key: "breed", value: breed }));

    setForSalePetsFilterList(list);
  }, [forSalePetsFilter]);

  const clearAll = () => {
    router.push(router.pathname);
    setForSalePetsFilter({ breeds: [], location: "", minPrice: "", maxPrice: "", sex: "" });
  };

  const clear = (key: string, value: string) => {
    const query = { ...router.query };
    if (typeof query[key] === "object") {
      query[key] = (query[key] as string[]).filter(element => element !== value);
    } else {
      delete query[key];
    }
    router.push({
      pathname: router.pathname,
      query
    });
  };

  const formatPrice = (price: string) => {
    const priceAsNumber = parseInt(price);
    return new Intl.NumberFormat("tl-PH", { style: "currency", currency: "PHP", minimumFractionDigits: 0 }).format(priceAsNumber);
  };
  return (
    <>
      {forSalePetsFilterList.length > 0 && (
        <Flex wrap='wrap' alignItems='center'>
          {forSalePetsFilterList.map(item => (
            <Alert key={item.value} m='1' bgColor='secondary.50' border='1px' borderColor='secondary.500' size='xs' rounded='lg' fontSize='sm' p='2' width='max-content' pr='10'>
              <AlertDescription whiteSpace='nowrap'>
                {(item.key === "breed" || item.key === "sex") && <Text> {item.value}</Text>}
                {item.key === "location" && (
                  <HStack alignItems='center'>
                    <Icon as={HiOutlineLocationMarker} />
                    <Text> {item.value}</Text>
                  </HStack>
                )}
                {item.key === "minPrice" && <Text>{`Price: > ${formatPrice(item.value)}`}</Text>}
                {item.key === "maxPrice" && <Text>{`Price: < ${formatPrice(item.value)}`}</Text>}
              </AlertDescription>
              <CloseButton onClick={() => clear(item.key, item.value)} position='absolute' right='8px' top='8px' size='sm' />
            </Alert>
          ))}

          <Button onClick={clearAll} variant='ghost' colorScheme='secondary'>
            Clear all
          </Button>
        </Flex>
      )}
    </>
  );
};

export default ForSalePetsFilterList;
