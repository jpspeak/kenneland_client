import FilterWrapper from "../../shared/FilterWrapper";
import StudsFilterDrawer from "./StudsFilterDrawer";
import StudsFilterForm from "./StudsFilterFom";

const StudsFilter = () => {
  return (
    <>
      <FilterWrapper>
        <StudsFilterForm />
      </FilterWrapper>
      <StudsFilterDrawer />
    </>
  );
};

export default StudsFilter;
