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
    <div className="mb-5 flex w-full justify-between">
      <Searchbar setSearchedCountries={setSearchedCountries} />
      <DropdownFilter
        uniqueRegions={uniqueRegions}
        selectedRegion={selectedRegion}
        setSelectedRegion={setSelectedRegion}
      />
    </div>
  );
};

export default FilterCountries;
