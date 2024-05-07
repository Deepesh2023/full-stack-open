import axios from "axios";

const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api";
const weatherApiKey = `${import.meta.env.VITE_SOME_KEY}`;

const getAllNames = () => {
  const request = axios.get(`${baseUrl}/all`);
  return request.then((response) => response.data);
};

const getCountryInfo = (countryName) => {
  const request = axios.get(`${baseUrl}/name/${countryName}`);
  return request.then((response) => response.data);
};

const getWeatherInfo = (lat, lon) => {
  const request = axios.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${weatherApiKey}`
  );
  return request.then((response) => response.data);
};

export default {
  getAllNames,
  getCountryInfo,
  getWeatherInfo,
};
