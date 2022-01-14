import { useDisclosure } from "@chakra-ui/hooks";
import { useRecoilValue } from "recoil";
import ForSalePetsFilterForm from "./ForSalePetsFilterFom";
import { useState, useEffect } from "react";
import FilterDrawerWrapper from "../../shared/FilterDrawerWrapper";
import FilterButton from "../../shared/FilterButton";
import forSalePetsFilterAtom from "../../../state/atoms/for-sale-pets-filter.atom";

const ForSalePetsFilterDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const forSalePetsFilter = useRecoilValue(forSalePetsFilterAtom);
  const [filterCount, setFilterCount] = useState(0);
  useEffect(() => {
    let count = 0;
    if (forSalePetsFilter.breeds.length) {
      count = count + forSalePetsFilter.breeds.length;
    }
    if (forSalePetsFilter.location) {
      count++;
    }
    setFilterCount(count);
  }, [forSalePetsFilter]);

  return (
    <>
      <FilterButton onClick={onOpen} filterCount={filterCount} />
      <FilterDrawerWrapper isOpen={isOpen} onClose={onClose}>
        <ForSalePetsFilterForm onDone={onClose} />
      </FilterDrawerWrapper>
    </>
  );
};

export default ForSalePetsFilterDrawer;
