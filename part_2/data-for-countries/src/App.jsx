import { useState, useEffect } from "react";
import countriesDataServices from "./services/countriesData";

const App = () => {
  const [countryNames, setCountryNames] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [countriesFound, setCountriesFound] = useState([]);
  const [countryFound, setCountryFound] = useState(null);
  const [countryInfo, setCountryInfo] = useState(null);

  useEffect(() => {
    countriesDataServices.getAllNames().then((countriesData) => {
      setCountryNames(
        countriesData.map((countryData) => countryData.name.common)
      );
    });
  }, []);

  useEffect(() => {
    if (countryFound) {
      console.log("effect is running");
      countriesDataServices.getCountryInfo(countryFound).then((countryData) => {
        setCountryInfo(countryData);
      });
    }
  }, [countryFound]);

  const searchTextOnChange = (event) => {
    const text = event.target.value;
    const lowerCaseText = text.toLowerCase();
    setSearchText(text);

    if (countriesFound.length === 1) {
      if (countriesFound[0].toLowerCase().startsWith(lowerCaseText)) {
        setCountryFound(countriesFound[0]);
        return;
      }
    }

    findCountry(lowerCaseText);
  };

  const findCountry = (text) => {
    if (text === "") {
      return;
    }

    setCountriesFound(
      countryNames.filter((countryName) =>
        countryName.toLowerCase().includes(text)
      )
    );
  };

  return (
    <>
      <form>
        <label>Search for countries: </label>
        <input type="text" value={searchText} onChange={searchTextOnChange} />
      </form>
      <FoundCountriesList countries={countriesFound} />
      <CountryInfo country={countryInfo} />
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
  console.log(country);

  if (country) {
    const languagesSpoken = Object.values(country.languages);
    const flagStyle = {
      height: 200,
      width: "auto",
    };

    return (
      <>
        <h1>{country.name.common}</h1>
        <img
          src={country.flags.svg}
          alt={country.flags.alt}
          style={flagStyle}
        />
        <p>Capital: {country.capital}</p>
        <p>Area: {country.area}</p>
        <h2>Languages spoken</h2>
        <ul>
          {languagesSpoken.map((language) => (
            <li key={language}>{language}</li>
          ))}
        </ul>
      </>
    );
  }
  return null;
};

export default App;
