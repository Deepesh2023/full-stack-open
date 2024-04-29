import { useState } from "react";

const App = () => {
  const [searchText, setSearchText] = useState("");
  const [countriesFound, setCountriesFound] = useState([]);

  const searchTextOnChange = (event) => {
    setSearchText(event.target.value);
  };

  return (
    <>
      <form>
        <label>Search for countries: </label>
        <input type="text" value={searchText} onChange={searchTextOnChange} />
      </form>
    </>
  );
};

export default App;
