const CountryInfoDisplay = ({ countryInfo }) => {
  if (countryInfo) {
    const languagesSpoken = Object.values(countryInfo.languages);

    const flagStyle = {
      height: 200,
      width: "auto",
    };

    return (
      <>
        <h1>{countryInfo.name.common}</h1>
        <img
          src={countryInfo.flags.svg}
          alt={countryInfo.flags.alt}
          style={flagStyle}
        />
        <p>
          Capital(s): {countryInfo.capital.map((capital) => `${capital}, `)}
        </p>
        <p>Area: {countryInfo.area}</p>
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

export default CountryInfoDisplay;
