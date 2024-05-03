const FoundCountriesList = ({ countries, showInfoButtonAction }) => {
  if (countries) {
    if (countries.length > 10) {
      return <p>Too many matches, specify another filter</p>;
    }

    return (
      <ul>
        {countries.map((country) => (
          <li key={country}>
            {country}
            <button onClick={showInfoButtonAction(country)}>Show</button>
          </li>
        ))}
      </ul>
    );
  }
  return null;
};

export default FoundCountriesList;
