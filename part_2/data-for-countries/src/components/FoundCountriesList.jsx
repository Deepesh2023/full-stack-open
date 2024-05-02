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

export default FoundCountriesList;
