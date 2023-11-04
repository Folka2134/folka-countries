"use client";

import CountryCard from "@/components/CountryCard";
import FilterCountries from "@/components/FilterCountries";
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
import { Country } from "@/lib/types";
import Image from "next/image";
import React from "react";
import { useEffect, useState } from "react";

export default function Home() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [uniqueRegions, setUniqueRegions] = useState<string[]>([]);
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [searchedCountries, setSearchedCountries] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

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
  console.log(countries);

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="mb-5 text-xl font-bold">Folka-Countries</h1>
      <div>
        <FilterCountries
          uniqueRegions={uniqueRegions}
          selectedRegion={selectedRegion}
          setSelectedRegion={setSelectedRegion}
          setSearchedCountries={setSearchedCountries}
        />
        <CountryCard filteredCountries={filteredCountries} />
      </div>
    </main>
  );
}
