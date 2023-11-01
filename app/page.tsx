"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading countries: {error.message}</p>;

  console.log(countries);

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="mb-5 text-xl font-bold">Folka-Countries</h1>
      <div className="grid grid-cols-5 gap-3">
        {countries.map((country) => (
          <Card key={country.name.common} className="">
            <CardHeader>
              <Image
                src={country.flags.png}
                alt={`Flag of ${country.name.common}`}
                width={180}
                height={150}
              />
              <CardTitle>{country.name.common}</CardTitle>
            </CardHeader>
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
    </main>
  );
}
