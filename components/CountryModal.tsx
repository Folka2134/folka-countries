import React from "react";
import Image from "next/image";
import { BsArrowLeft } from "react-icons/bs";

const CountryModal = ({ country, onClose }: any) => {
  return (
    <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center p-20">
      <div className="max-w-84 z-40 rounded-lg bg-black bg-opacity-80 p-5">
        <button
          onClick={onClose}
          className="my-2 mb-6 flex h-8 w-20 items-center justify-center gap-2 text-sm shadow-xl md:mb-2"
        >
          <BsArrowLeft />
          Back
        </button>
        <div className="z-40 flex flex-col items-center gap-5 lg:flex-row lg:gap-12">
          <Image
            src={country.flags.png}
            alt={`Flag of ${country.name.common}`}
            width={250}
            height={250}
          />
          <article className="flex flex-col gap-4">
            <h2 className="text-xl font-bold">{country.name.common}</h2>
            <ul>
              <li>Population: {country.population}</li>
              <li>Region: {country.region}</li>
              <li>Sub Region: {country.subregion}</li>
              <li>Capital: {country.capital}</li>
              <li>
                Languages:
                {Object.values(country.languages).map(
                  (languages, index, array) => (
                    <span key={index}>
                      {` ${languages}`}
                      {index < array.length - 1 ? ", " : ""}
                    </span>
                  ),
                )}
              </li>
            </ul>
          </article>
        </div>
      </div>
      <div
        className="overlay absolute z-30 h-full w-full bg-black bg-opacity-70"
        onClick={onClose}
      />
    </div>
  );
};

export default CountryModal;
