import { useDisclosure } from "@chakra-ui/hooks";
import { useRecoilValue } from "recoil";
import StudsFilterForm from "./StudsFilterFom";
import { useState, useEffect } from "react";
import FilterDrawerWrapper from "../../shared/FilterDrawerWrapper";
import FilterButton from "../../shared/FilterButton";
import studsFilterAtom from "../../../state/atoms/studs-filter.atom";

const StudsFilterDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const studsFilter = useRecoilValue(studsFilterAtom);
  const [filterCount, setFilterCount] = useState(0);
  useEffect(() => {
    let count = 0;
    if (studsFilter.studName) {
      count++;
    }
    if (studsFilter.breeds.length) {
      count = count + studsFilter.breeds.length;
    }
    if (studsFilter.location) {
      count++;
    }
    setFilterCount(count);
  }, [studsFilter]);

  return (
    <>
      <FilterButton onClick={onOpen} filterCount={filterCount} />
      <FilterDrawerWrapper onClose={onClose} isOpen={isOpen}>
        <StudsFilterForm onDone={onClose} />
      </FilterDrawerWrapper>
    </>
  );
};

export default StudsFilterDrawer;
