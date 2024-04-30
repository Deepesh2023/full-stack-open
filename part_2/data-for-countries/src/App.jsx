import { useState } from "react";
import countriesDataServices from "./services/countriesData";

const App = ({ countryNames }) => {
  const [searchText, setSearchText] = useState("");
  const [countriesFound, setCountriesFound] = useState(null);

  console.log(countriesFound);

  const searchTextOnChange = (event) => {
    const text = event.target.value;
    setSearchText(text);
    findCountry(text.toLowerCase());
  };

  const findCountry = (text) => {
    console.log(text);
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
    </>
  );
};

const FoundCountriesList = ({ countries }) => {
  if (countries) {
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

export default App;
