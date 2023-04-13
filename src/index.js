function formatTime(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[dayIndex];
  return `${day} ${hours}:${minutes}`;
}

let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatTime(currentTime);

//homework week 5

function searchEngine(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");

  let h2 = document.querySelector("h2");
  h2.innerHTML = `${cityInputElement.value}`;
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchEngine);

function showCurrentCity(response) {
  let temperature = Math.round(response.data.main.temp);
  let newTemperature = document.querySelector("#actual-temperature");
  newTemperature.innerHTML = `${temperature}°C`;
  let city = response.data.name;
  let h2 = document.querySelector("h2");
  h2.innerHTML = city;
  let description = response.data.weather[0].description;
  let actualWeather = document.querySelector("#actual-weather");
  actualWeather.innerHTML = description;
}

function searchCity(city) {
  let apiKey = "203fa770242fcd2b9555d832a88ea567";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCurrentCity);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "203fa770242fcd2b9555d832a88ea567";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCurrentCity);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let currentPositionButton = document.querySelector("#current-position");
currentPositionButton.addEventListener("click", getCurrentPosition);

searchCity("Vienna");
