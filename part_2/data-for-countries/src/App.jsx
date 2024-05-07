import { useState, useEffect } from "react";
import FoundCountriesList from "./components/FoundCountriesList";
import CountryInfoDisplay from "./components/CountryInfoDisplay";
import countriesDataServices from "./services/countriesData";
import WeatherInfoDisplay from "./components/WeatherInfoDisplay";
import ErrorMessageDisplay from "./components/ErrorMessageDisplay";

const App = () => {
  const [countryNames, setCountryNames] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [countriesFound, setCountriesFound] = useState([]);
  const [countryFound, setCountryFound] = useState(null);
  const [countryInfo, setCountryInfo] = useState(null);
  const [countryWeatherInfo, setCountryWeatherInfo] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  // load the country name so to help with search
  useEffect(() => { 
    countriesDataServices
      .getAllNames()
      .then((countriesData) => {
        setCountryNames(
          countriesData.map((countryData) => countryData.name.common)
        );
      })
      .catch((error) => {
        setErrorMessage("Trouble loading country names");
      });
  }, []);

  // looking for the specified country details
  useEffect(() => {
    if (countryFound) {
      countriesDataServices
        .getCountryInfo(countryFound)
        .then((countryData) => {
          setCountryInfo(countryData);
        })
        .catch((error) => {
          setErrorMessage("Trouble finding the country looking for");
        });
    }
  }, [countryFound]);

  // get the weather info
  useEffect(() => {
    if (countryInfo) {
      countriesDataServices
        .getWeatherInfo(...countryInfo.capitalInfo.latlng)
        .then((weatherData) => {
          setCountryWeatherInfo(weatherData);
        })
        .catch((error) => {
          setErrorMessage("Trouble getting weather");
        });
    }
  }, [countryInfo]);

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
      <ErrorMessageDisplay errorMessage={errorMessage} />
      <FoundCountriesList
        countries={countriesFound}
        showInfoButtonAction={showCountryInfoButtonAction}
      />
      <CountryInfoDisplay countryInfo={countryInfo} />
      <WeatherInfoDisplay weatherData={countryWeatherInfo} />
    </>
  );
};

export default App;
