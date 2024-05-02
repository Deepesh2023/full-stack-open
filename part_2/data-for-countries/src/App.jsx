import { useState, useEffect } from "react";
import countriesDataServices from "./services/countriesData";

const App = () => {
  const [searchText, setSearchText] = useState("");
  const [countriesFound, setCountriesFound] = useState([]);
  const [countryNames, setCountryNames] = useState(null);
  const [countryFound, setCountryFound] = useState(null);

  useEffect(() => {
    countriesDataServices.getAllNames().then((countriesData) => {
      setCountryNames(
        countriesData.map((countryData) => countryData.name.common)
      );
    });
  }, []);

  const searchTextOnChange = (event) => {
    const text = event.target.value;
    setSearchText(text);

    if (countriesFound.length === 1) {
      if (countriesFound[0].startsWith(text)) {
        return;
      }
    }

    findCountry(text.toLowerCase());
  };

  const findCountry = (text) => {
    console.log("hi");

    if (text === "") {
      return;
    }

    setCountriesFound(
      countryNames.filter((countryName) =>
        countryName.toLowerCase().includes(text)
      )
    );
  };

  const getCountryInfo = () => {
    setCountryFound(countriesFound[0]);
  };

  return (
    <>
      <form>
        <label>Search for countries: </label>
        <input type="text" value={searchText} onChange={searchTextOnChange} />
      </form>
      <FoundCountriesList countries={countriesFound} />
    </>
  );
};

const FoundCountriesList = ({ countries }) => {
  if (countries) {
    if (countries.length > 10) {
      return <p>Too many matches, specify another filter</p>;
    }
    return (
      <ul>
        {countries.map((country) => (
          <li key={country}>{country}</li>
        ))}
      </ul>
    );
  }
  return null;
};

const CountryInfo = ({ country }) => {
  if (country) {
    const flagImage = country.flags.svg;
    return (
      <>
        <h1>{country.name.common}</h1>
        <img src={flagImage} alt="official flag" />
        <p>{country.capital}</p>
      </>
    );
  }
  return null;
};

export default App;
