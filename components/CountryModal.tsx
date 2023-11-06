import React from "react";
import Image from "next/image";

const CountryModal = ({ country, onClose }: any) => {
  return (
    <div className="fixed left-0 top-0 z-40 flex h-full w-full justify-center bg-pink-500 bg-opacity-70 p-20">
      <div className="flex h-full w-full flex-col justify-center rounded-lg bg-purple-300 p-5">
        <button onClick={onClose}>Close</button>
        <div className="flex items-center justify-center gap-52">
          <Image
            src={country.flags.png}
            alt={`Flag of ${country.name.common}`}
            width={500}
            height={500}
          />
          <article>
            <h2>{country.name.common}</h2>
            <ul>
              <li>Native Name: {country.name.nativeName.common}</li>
              <li>Population: {country.population}</li>
              <li>Region: {country.region}</li>
              <li>Sub Region: {country.subregion}</li>
              <li>Capital: {country.capital}</li>
              {/* <li>Currencies: {country}</li> */}
              <li>
                Languages:
                {Object.values(country.languages).map(
                  (languages, index, array) => (
                    <span key={country.name}>
                      {` ${languages}`}
                      {index < array.length - 1 ? ", " : ""}
                    </span>
                  ),
                )}
              </li>
            </ul>
            <p className="flex">
              <h2>Border Countries: </h2>
              {country.borders ? (
                <div>
                  {Object.values(country.borders).map(
                    (borders, index, array) => (
                      <span key={country.name}>
                        {` ${borders}`}
                        {index < array.length - 1 ? ", " : ""}
                      </span>
                    ),
                  )}
                </div>
              ) : (
                <p>None</p>
              )}
            </p>
          </article>
        </div>
      </div>
    </div>
  );
};

export default CountryModal;
