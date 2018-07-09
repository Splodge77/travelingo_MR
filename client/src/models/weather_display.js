const openWeatherAPI = require("../resources/openweatherAPI");

const WeatherDisplay = function () {
};

WeatherDisplay.prototype.create = function (city) {
  let completeURL = openWeatherAPI.url + "q=" + city + "&APPID=" + openWeatherAPI.key;
  makeWeatherRequest(completeURL, sendAPIRequest);
};


const clearWeatherDisplay = function () {
  const weatherDiv = document.getElementById("weather");
  weatherDiv.innerHTML = "";
};

const makeWeatherRequest = function (url, callback) {
  const request = new XMLHttpRequest();
  request.open("GET", url);
  request.addEventListener("load", callback);
  request.send();
};

const sendAPIRequest = function () {
  if(this.status !== 200) {
    clearWeatherDisplay();
    return;
  }
  const jsonString = this.responseText;
  const weatherObject = JSON.parse(jsonString);
  buildWeatherHtml(weatherObject);
};



const buildWeatherHtml = function (weatherObject) {
  const weatherDiv = document.getElementById("weather");
  const nearestWeatherStation = weatherObject.name;
  const weatherDescription =  weatherObject.weather[0].description;
  const weatherIconSource = "http://openweathermap.org/themes/openweathermap/assets/vendor/owm/img/widgets/" + weatherObject.weather[0].icon + ".png";
  const currentTemperature = Math.round(weatherObject.main.temp-273);
  const htmlDegrees = "℃";

  weatherDiv.innerHTML = "";
  weatherDiv.hidden = false;

  // make html elements needed
  const weatherCard = document.createElement("div");
  weatherCard.id = "weather-card";
  const stationHeading = document.createElement("h3");
  stationHeading.innerText = "Weather in " + nearestWeatherStation;

  const icon = document.createElement("img");
  icon.src = weatherIconSource;
  icon.id = "weather-icon";

  const temp = document.createElement("p");
  temp.innerText = currentTemperature + htmlDegrees + ": " + weatherDescription;

  weatherCard.appendChild(stationHeading);
  weatherCard.appendChild(icon);
  weatherCard.appendChild(temp);

  weatherDiv.appendChild(weatherCard);

};

module.exports = WeatherDisplay;
