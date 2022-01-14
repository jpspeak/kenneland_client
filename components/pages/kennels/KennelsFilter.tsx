import FilterWrapper from "../../shared/FilterWrapper";
import KennelsFilterDrawer from "./KennelsFilterDrawer";
import KennelFilterForm from "./KennelsFilterFom";

const KennelsFilter = () => {
  return (
    <>
      <FilterWrapper>
        <KennelFilterForm />
      </FilterWrapper>
      <KennelsFilterDrawer />
    </>
  );
};

export default KennelsFilter;
