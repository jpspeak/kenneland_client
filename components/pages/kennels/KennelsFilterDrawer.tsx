import { useDisclosure } from "@chakra-ui/hooks";
import { useRecoilValue } from "recoil";
import kennelFilterAtom from "../../../state/atoms/kennel-filter.atom";
import KennelsFilterForm from "./KennelsFilterFom";
import { useState, useEffect } from "react";
import FilterDrawerWrapper from "../../shared/FilterDrawerWrapper";
import FilterButton from "../../shared/FilterButton";

const KennelFilterDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const kennelFilter = useRecoilValue(kennelFilterAtom);
  const [filterCount, setFilterCount] = useState(0);
  useEffect(() => {
    let count = 0;
    if (kennelFilter.kennelName) {
      count++;
    }
    if (kennelFilter.breeds.length) {
      count = count + kennelFilter.breeds.length;
    }
    if (kennelFilter.location) {
      count++;
    }
    setFilterCount(count);
  }, [kennelFilter]);

  return (
    <>
      <FilterButton onClick={onOpen} filterCount={filterCount} />
      <FilterDrawerWrapper isOpen={isOpen} onClose={onClose}>
        <KennelsFilterForm onDone={onClose} />
      </FilterDrawerWrapper>
    </>
  );
};

export default KennelFilterDrawer;
