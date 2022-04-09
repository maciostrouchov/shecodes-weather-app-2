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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<span class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
          <div class="col">
            <div class="forecast-date">${formatDay(forecastDay.dt)}</div>
              <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt="" />
              <div class="forecast-temps">
               <span class="forecast-temp-max">${Math.round(forecastDay.temp.max)}°</span>
               <span class="forecast-temp-min">${Math.round(forecastDay.temp.min)}°</span>
              </div>
           </div>
          </div>
        `;
    }
  });

  forecastHTML = forecastHTML + `</span>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
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
  handleDisplay(response.data.weather[0].description.toLowerCase());
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

function handleDisplay(currentCondition) {
  let rainyPlaylistElement = document.querySelector("#rainy-playlist");
  if (
    currentCondition.includes("rain") ||
    currentCondition.includes("thunderstorm") ||
    currentCondition.includes("drizzle")
  ) {
    rainyPlaylistElement.style.display = "block";
  } else {
    rainyPlaylistElement.style.display = "none";
  }

  let sunnyPlaylistElement = document.querySelector("#sunny-playlist");
  if (currentCondition.includes("clear")) {
    sunnyPlaylistElement.style.display = "block";
  } else {
    sunnyPlaylistElement.style.display = "none";
  }

  let cloudyPlaylistElement = document.querySelector("#cloudy-playlist");
  if (currentCondition.includes("cloud")) {
    cloudyPlaylistElement.style.display = "block";
  } else {
    cloudyPlaylistElement.style.display = "none";
  }

  let snowyPlaylistElement = document.querySelector("#snowy-playlist");
  if (
    currentCondition.includes("snow") ||
    currentCondition.includes("sleet") ||
    currentCondition.includes("freezing rain") ||
    currentCondition.includes("light rain and snow") ||
    currentCondition.includes("rain and snow")
  ) {
    snowyPlaylistElement.style.display = "block";
  } else {
    snowyPlaylistElement.style.display = "none";
  }

  let atmospherePlaylistElement = document.querySelector("#atmosphere-playlist");
  if (
    currentCondition.includes("mist") ||
    currentCondition.includes("tornado") ||
    currentCondition.includes("squalls") ||
    currentCondition.includes("volcanic") ||
    currentCondition.includes("dust") ||
    currentCondition.includes("sand") ||
    currentCondition.includes("fog") ||
    currentCondition.includes("haze") ||
    currentCondition.includes("smoke")
  ) {
    atmospherePlaylistElement.style.display = "block";
  } else {
    atmospherePlaylistElement.style.display = "none";
  }
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

search("New York");
