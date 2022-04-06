//need to update time to read as response of city input; currently reading local time?

function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function displayForecast(response) {
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecast");

  let days = ["Thu", "Fri", "Sat", "Sun", "Mon"];

  let forecastHTML = `<span class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
    <div class="col">
      <div class="forecast-date">${day}</div>
        <img src="" alt="" />
        <div class="forecast-temps">
          <span class="forecast-temp-min">18°</span>
          <span class="forecast-temp-max">22°</span>
        </div>
      </div>
    </div>
  `;
  });

  forecastHTML = forecastHTML + `</span>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "71e82cb7acd47b60b16fae0fd4740ffd";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&units=imperial&appid=${apiKey}`;
  axios.get(apiUrl).then(displayForecast);
}

function displayTemp(response) {
  let currentIconElement = document.querySelector("#current-icon");
  let tempElement = document.querySelector("#current-temp");
  let cityElement = document.querySelector("#current-city");
  let currentConditionElement = document.querySelector("#current-condition");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#day-time");

  currentIconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  currentIconElement.setAttribute("alt", response.data.weather[0].description);

  tempElement.innerHTML = Math.round(response.data.main.temp);
  fahrenheitTemperature = response.data.main.temp;
  cityElement.innerHTML = response.data.name;
  currentConditionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "71e82cb7acd47b60b16fae0fd4740ffd";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
  axios.get(apiUrl).then(displayTemp);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let celsiusTemperature = ((fahrenheitTemperature - 32) * 5) / 9;
  let temperatureElement = document.querySelector("#current-temp");
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  fahrenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");
  let temperatureElement = document.querySelector("#current-temp");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

let fahrenheitTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

search("New York");
