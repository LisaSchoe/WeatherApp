


//calculate the time
function formatDate(timestamp){
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes ();
  if (minutes < 10) {
    minutes= `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days [date.getDay()];
return `${day} ${hours}:${minutes}`;
}

function searchEngine(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");

  let h2 = document.querySelector("h2");
  h2.innerHTML = `${cityInputElement.value}`;
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchEngine);

function showCurrentWeather(response) {
  console.log (response.data);
  let temperature = Math.round(response.data.main.temp);
  let newTemperature = document.querySelector("#actual-temperature");
  newTemperature.innerHTML = `${temperature}°C`;
  let city = response.data.name;
  let h2 = document.querySelector("h2");
  h2.innerHTML = city;
  let description = response.data.weather[0].description;
  let actualWeather = document.querySelector("#actual-weather");
  actualWeather.innerHTML = description;
  let humidityElement= document.querySelector("#humidity");
  humidityElement.innerHTML=response.data.main.humidity;
  let windElement=document.querySelector("#wind");
  windElement.innerHTML=Math.round(response.data.wind.speed);
  let dateElement = document.querySelector("#date");
  dateElement.innerHTML=formatDate(response.data.dt * 1000);
  let iconElement= document.querySelector("#icon");
  iconElement.setAttribute ("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
}

function searchCity(city) {
  let apiKey = "9dcac54d8c9cb2536e0192a2590e2dc6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCurrentWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  
  let forecastHTML= `<div class="row w-100">`;
  let days = ["Thu","Fri","Sat"];
  days.forEach(function(day){
  forecastHTML = forecastHTML + `
        <div class="col-2">
      <div class="weather-forecast-date">Monday</div>
      <img src="☀"
      alt=""
      width=""/>
      <div class="weather-forecast-temperatures">
        <span class="weather-forecast-temperature-max"> 18° </span>
        <span class="weather-forecast-temperature-min"> 15° </span>
      </div>
    </div>
  </div>`;
  })

  forecastHTML=forecastHTML + `</div>`;
  forecastElement.innerHTML=forecastHTML;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

searchCity("Quito");
displayForecast();

