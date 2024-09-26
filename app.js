import { getWeekDay } from "./utils/customDate.js";
import getWeatherData from "./utils/httpReq.js";
import { showModal, removeModal } from "./utils/modal.js";

// Selectors
const searchInput = document.querySelector("input");
const searchButton = document.querySelector("button");
const weatherContainer = document.getElementById("weather");
const locationIcon = document.getElementById("location");
const forecastContainer = document.getElementById("forecast");
const modalButton = document.getElementById("modal-button");

// Function to render current weather data
const renderCurrentWeather = (data) => {
  if (!data) {
    return;
  }
  const weatherJSX = `
    <h1>${data.name}, ${data.sys.country}</h1>
    <div id="main">
        <img alt="weather icon" src="http://openweathermap.org/img/w/${
          data.weather[0].icon
        }.png" />
        <span>${data.weather[0].main}</span>
        <p>${Math.round(data.main.temp)} °C</p>
    </div>
    <div id="info">
        <p>Humidity: <span>${data.main.humidity} %</span></p>
        <p>Wind Speed: <span>${data.wind.speed} m/s</span></p>
    </div>
  `;
  weatherContainer.innerHTML = weatherJSX;
};

// Function to render 5-day forecast data in the weather service
const renderForecastWeather = (data) => {
  if (!data) {
    return;
  }
  forecastContainer.innerHTML = "";
  data = data.list.filter((obj) => obj.dt_txt.endsWith("12:00:00"));
  data.forEach((item) => {
    const forecastJSX = `
        <div>
            <img alt="weather icon" src="http://openweathermap.org/img/w/${
              item.weather[0].icon
            }.png" />
            <h3>${getWeekDay(item.dt)}</h3>
            <p>${Math.round(item.main.temp)} °C</p>
            <span>${item.weather[0].main}</span>
        </div>
    `;
    forecastContainer.innerHTML += forecastJSX;
  });
};

// Function to handle search and location events
const searchHandler = async () => {
  const cityName = searchInput.value;
  if (!cityName) {
    showModal("Please enter a city name.");
    return;
  }
  const currentData = await getWeatherData("current", cityName);
  renderCurrentWeather(currentData);
  const forecastData = await getWeatherData("forecast", cityName);
  renderForecastWeather(forecastData);
};

// Function to get user's current location and fetch weather data
const positionCallback = async (position) => {
  const { latitude, longitude } = position.coords;
  const currentData = await getWeatherData("current", position.coords);
  renderCurrentWeather(currentData);
  const forecastData = await getWeatherData("forecast", position.coords);
  renderForecastWeather(forecastData);
};

// Function to handle errors when getting user's current location
const errorCallback = (error) => {
  showModal(error.message);
};

// Function to handle user's click on the location button
const locationHandler = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(positionCallback, errorCallback);
  } else {
    showModal("Geolocation is not supported by this browser.");
  }
};

// Initial weather data fetching and rendering for Karaj, Kuwait
const initHandler = async () => {
  const currentData = await getWeatherData("current", "Karaj");
  renderCurrentWeather(currentData);
  const forecastData = await getWeatherData("forecast", "Karaj");
  renderForecastWeather(forecastData);
};

// Event listeners
searchButton.addEventListener("click", searchHandler);
locationIcon.addEventListener("click", locationHandler);
modalButton.addEventListener("click", removeModal);
document.addEventListener("DOMContentLoaded", initHandler);
