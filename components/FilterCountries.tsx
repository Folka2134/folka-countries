import React from "react";
import DropdownFilter from "./DropdownFilter";
import Searchbar from "./Searchbar";

const FilterCountries = ({
  uniqueRegions,
  selectedRegion,
  setSelectedRegion,
  setSearchedCountries,
}: any) => {
  return (
    <div className="mb-5 flex w-full flex-col gap-2 md:flex-row md:justify-between">
      <Searchbar
        setSearchedCountries={setSearchedCountries}
        className="items-end"
      />
      <DropdownFilter
        uniqueRegions={uniqueRegions}
        selectedRegion={selectedRegion}
        setSelectedRegion={setSelectedRegion}
      />
    </div>
  );
};

export default FilterCountries;
