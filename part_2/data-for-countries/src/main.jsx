import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import countriesDataServices from "./services/countriesData.js";

const countryNames = [];
countriesDataServices.getAllNames().then((countries) => {
  countries.forEach((country) => {
    countryNames.push(country.name.common);
  });
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App countryNames={countryNames} />
  </React.StrictMode>
);
