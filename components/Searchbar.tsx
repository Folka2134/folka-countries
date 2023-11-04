import React from "react";
import { Input } from "./ui/input";

const Searchbar = ({ setSearchedCountries }: any) => {
  const handleSearchChange = (event: any) => {
    setSearchedCountries(event.target.value?.toLowerCase());
  };
  return (
    <div>
      <Input
        type="search"
        placeholder="Search for a country"
        className="w-96 p-6"
        onChange={handleSearchChange}
      />
    </div>
  );
};

export default Searchbar;
