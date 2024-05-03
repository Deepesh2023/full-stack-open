import { useState, useEffect } from "react";
import FoundCountriesList from "./components/FoundCountriesList";
import CountryInfoDisplay from "./components/CountryInfoDisplay";
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

  const showCountryInfoButtonAction = (country) => {
    return () => {
      setCountryFound(country);
    };
  };

  return (
    <>
      <form>
        <label>Search for countries: </label>
        <input type="text" value={searchText} onChange={searchTextOnChange} />
      </form>
      <FoundCountriesList
        countries={countriesFound}
        showInfoButtonAction={showCountryInfoButtonAction}
      />
      <CountryInfoDisplay countryInfo={countryInfo} />
    </>
  );
};

export default App;
