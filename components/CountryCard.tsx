import React from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Country } from "@/lib/types";

interface CountryCardProps {
  filteredCountries: Country[];
}

const CountryCard: React.FC<CountryCardProps> = ({ filteredCountries }) => {
  return (
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
              height={60}
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
  );
};

export default CountryCard;
