import { Alert, AlertDescription } from "@chakra-ui/alert";
import { Button } from "@chakra-ui/button";
import { CloseButton } from "@chakra-ui/close-button";
import { Flex } from "@chakra-ui/layout";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import kennelFilterAtom from "../../../state/atoms/kennel-filter.atom";
import { useState, useEffect } from "react";
import Icon from "@chakra-ui/icon";
import { HiOutlineLocationMarker } from "react-icons/hi";

interface KennelFilterList {
  key: string;
  value: string;
}

const KennelFilterList = () => {
  const router = useRouter();
  const [kennelFilter, setKennelFilter] = useRecoilState(kennelFilterAtom);
  const [kennelFilterList, setKennelFilterList] = useState<KennelFilterList[]>([]);

  useEffect(() => {
    let list: KennelFilterList[] = [];
    kennelFilter.kennelName && list.push({ key: "kennelName", value: kennelFilter.kennelName });
    kennelFilter.location && list.push({ key: "location", value: kennelFilter.location });
    kennelFilter.breeds.length > 0 && kennelFilter.breeds.forEach(breed => list.push({ key: "breed", value: breed }));

    setKennelFilterList(list);
  }, [kennelFilter]);

  const clearAll = () => {
    router.push(router.pathname);
    setKennelFilter({ kennelName: "", breeds: [], location: "" });
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
  return (
    <>
      {kennelFilterList.length > 0 && (
        <Flex wrap='wrap' alignItems='center'>
          {kennelFilterList.map(item => (
            <Alert key={item.value} m='1' bgColor='secondary.50' border='1px' borderColor='secondary.500' size='xs' rounded='lg' fontSize='sm' p='2' width='max-content' pr='10'>
              {item.key === "location" && <Icon as={HiOutlineLocationMarker} />}
              <AlertDescription whiteSpace='nowrap'>{item.value}</AlertDescription>
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

export default KennelFilterList;
