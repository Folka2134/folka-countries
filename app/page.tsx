"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import React from "react";
import { useEffect, useState } from "react";

interface Country {
  flags: {
    png: string;
  };
  name: {
    common: string;
    nativeName: {
      [key: string]: {
        common: string;
      };
    };
  };
  population: number;
  region: string;
  capital: string;
  subregion: string;
  currencies: {
    [key: string]: {
      name: string;
    };
  };
  languages: {
    [key: string]: string;
  };
  borders: [];
}

export default function Home() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [uniqueRegions, setUniqueRegions] = useState<string[]>([]);
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [searchedCountries, setSearchedCountries] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const handleSearchChange = (event: any) => {
    setSearchedCountries(event.target.value?.toLowerCase());
  };

  const filteredCountries = countries.filter((country) => {
    const isRegionMatch =
      selectedRegion === "all" || country.region === selectedRegion;

    const isNameMatch = country.name.common
      .toLowerCase()
      .includes(searchedCountries);

    return isRegionMatch && isNameMatch;
  });

  // API call for countries data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://restcountries.com/v3.1/independent?status=true",
        );

        if (!response.ok) {
          throw new Error("Unable to fetch data:" + response.statusText);
        }
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error("Error fetching countries:", error);
        setError(
          error instanceof Error
            ? error
            : new Error("An unexpected error occured"),
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Grab unique regions from countries
  useEffect(() => {
    const regionsSet = new Set(countries.map((country) => country.region));
    const regionsArray = Array.from(regionsSet);
    setUniqueRegions(regionsArray);
  }, [countries]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading countries: {error.message}</p>;

  // console.log(selectedRegion);
  console.log(searchedCountries);

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="mb-5 text-xl font-bold">Folka-Countries</h1>
      <div>
        {/* DROPDOWN */}
        <div className="mb-5 flex w-full justify-between">
          {/* SEARCH BOX */}
          <Input
            type="search"
            placeholder="Search for a country"
            className="w-96 p-6"
            onChange={handleSearchChange}
          />
          <div className="">
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="w-44">
                <Button variant="outline" className="p-6">
                  {selectedRegion === "all"
                    ? "Filter by Region"
                    : selectedRegion}
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
                  {uniqueRegions.map((region) => (
                    <DropdownMenuRadioItem key={region} value={region}>
                      {region}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        {/* DISPLAY COUNTRIES */}
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {filteredCountries.map((country) => (
            <Card
              key={country.name.common}
              className="flex h-72 flex-col items-center justify-center"
            >
              <CardHeader className="flex flex-col items-center">
                <Image
                  src={country.flags.png}
                  alt={`Flag of ${country.name.common}`}
                  width={180}
                  height={200}
                />
              </CardHeader>
              <CardTitle>{country.name.common}</CardTitle>
              <CardContent>
                <p>Population: {country.population}</p>
                <p>Region: {country.region}</p>
                <p>Capital: {country.capital}</p>
                {/* <p>
                languages:
                {Object.values(country.languages).map(
                  (language, index, array) => (
                    <span key={language}>
                      {` ${language}`}
                      {index < array.length - 1 ? ", " : ""}
                    </span>
                  ),
                )}
              </p> */}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
