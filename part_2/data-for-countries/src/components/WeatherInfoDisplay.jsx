const WeatherInfoDisplay = ({ weatherData }) => {
  if (weatherData) {
    const [weather] = [...weatherData.weather];

    return (
      <>
        <h1>Weather in {weatherData.name}</h1>
        <img
          src={`https://openweathermap.org/img/wn/${weather.icon}.png`}
          alt={weather.description}
        />
        <p>Temperature: {weatherData.main.temp} Celsius</p>
        <p>Wind: {weatherData.wind.speed} m/s</p>
      </>
    );
  }

  return null;
};

export default WeatherInfoDisplay;
