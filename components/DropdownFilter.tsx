import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";

const DropdownFilter = ({
  uniqueRegions,
  selectedRegion,
  setSelectedRegion,
}: any) => {
  return (
    <div className="">
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="w-44">
          <Button variant="outline" className="p-6">
            {selectedRegion === "all" ? "Filter by Region" : selectedRegion}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-44">
          <DropdownMenuRadioGroup
            value={selectedRegion}
            onValueChange={setSelectedRegion}
          >
            <DropdownMenuRadioItem key="all" value="all">
              All Regions
            </DropdownMenuRadioItem>
            {uniqueRegions.map((region: any) => (
              <DropdownMenuRadioItem key={region} value={region}>
                {region}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default DropdownFilter;
