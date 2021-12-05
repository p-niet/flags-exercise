import React, { useEffect } from "react";

export const doesNameContainString = (country, str) =>
  country.name.toLowerCase().includes(str.toLowerCase());

const Filter = ({ countries, setCountries, defaultValue }) => {
  const selectRegion = (e) => {
    const regionName = e.target.value;

    const targetRegion = countries.map((region) => {
      const newRegion = { ...region };
      newRegion.isHidden = !region.region
        .toLowerCase()
        .includes(regionName.toLowerCase());
      return newRegion;
    });

    setCountries(targetRegion);
  };

  return (
    <section className="filter">
      <form className="form-control">
        <input
          className="input"
          type="search"
          name="search"
          id="search"
          placeholder="Search for a country..."
          defaultValue={defaultValue}
          onChange={(e) => {
            const { value } = e.target;

            const newCountries = countries.map((country) => {
              const newCountry = { ...country };
              newCountry.isHidden = !doesNameContainString(country, value);
              return newCountry;
            });

            setCountries(newCountries);
          }}
        />
      </form>

      <div className="region-filter">
        <select
          name="select"
          id="select"
          className="select"
          onChange={selectRegion}
        >
          <option value="Filter by region" selected="true" disabled="disabled">
            Filter by region
          </option>
          <option value="Africa">Africa</option>
          <option value="America">America</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
      </div>
    </section>
  );
};

export default Filter;
