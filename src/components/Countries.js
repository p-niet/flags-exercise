import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Filter, { doesNameContainString } from "./Filter";
import Pagination from "./Pagination";

const url = "https://restcountries.com/v2/all";

const Countries = () => {
  const [countries, setCountries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage] = useState(20);

  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const filterDefaultValue = searchParams.get("search") || "";

  const fetchCountryData = async () => {
    const response = await fetch(url);
    const countries = await response.json();
    setCountries(
      countries.map((c) => ({
        ...c,
        isHidden: !doesNameContainString(c, filterDefaultValue),
      }))
    );
  };

  useEffect(() => {
    fetchCountryData();
  }, []);

  const unhiddenCountries = countries.filter((c) => !c.isHidden);
  const numberOfPages = Math.ceil(unhiddenCountries.length / countriesPerPage);

  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  const currentCountries = unhiddenCountries.slice(
    indexOfFirstCountry,
    indexOfLastCountry
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Filter
        countries={countries}
        setCountries={setCountries}
        defaultValue={filterDefaultValue}
      />

      <section className="grid">
        {currentCountries.map((country) => {
          const {
            name,
            population,
            region,
            capital,
            flag,
            numericCode,
            isHidden,
          } = country;

          return (
            <article
              className="country-box"
              key={numericCode}
              style={{ display: isHidden ? "none" : undefined }}
            >
              <Link to={`/countries/${name}`}>
                <div className="singlebox" id="singlebox">
                  <img className="flag-img" src={flag} alt={name} />
                  <div className="grid details">
                    <h3 className="country-name">{name}</h3>
                    <h4>
                      Population: <span>{population}</span>
                    </h4>
                    <h4>
                      Region: <span className="country-region">{region}</span>
                    </h4>
                    <h4>
                      Capital: <span>{capital}</span>
                    </h4>
                  </div>
                </div>
              </Link>
            </article>
          );
        })}
      </section>
      <Pagination
        countriesPerPage={countriesPerPage}
        totalCountries={unhiddenCountries.length}
        paginate={paginate}
      />
    </>
  );
};

export default Countries;
