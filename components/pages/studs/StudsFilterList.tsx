import { Alert, AlertDescription } from "@chakra-ui/alert";
import { Button } from "@chakra-ui/button";
import { CloseButton } from "@chakra-ui/close-button";
import { Flex } from "@chakra-ui/layout";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { useState, useEffect } from "react";
import Icon from "@chakra-ui/icon";
import { HiOutlineLocationMarker } from "react-icons/hi";
import studsFilterAtom from "../../../state/atoms/studs-filter.atom";

interface StudsFilterList {
  key: string;
  value: string;
}

const StudsFilterList = () => {
  const router = useRouter();
  const [studsFilter, setStudsFilter] = useRecoilState(studsFilterAtom);
  const [studsFilterList, setStudsFilterList] = useState<StudsFilterList[]>([]);

  useEffect(() => {
    let list: StudsFilterList[] = [];
    studsFilter.studName && list.push({ key: "studName", value: studsFilter.studName });
    studsFilter.location && list.push({ key: "location", value: studsFilter.location });
    studsFilter.breeds.length > 0 && studsFilter.breeds.forEach(breed => list.push({ key: "breed", value: breed }));

    setStudsFilterList(list);
  }, [studsFilter]);

  const clearAll = () => {
    router.push(router.pathname);
    setStudsFilter({ studName: "", breeds: [], location: "" });
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
      {studsFilterList.length > 0 && (
        <Flex wrap='wrap' alignItems='center'>
          {studsFilterList.map(item => (
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

export default StudsFilterList;
