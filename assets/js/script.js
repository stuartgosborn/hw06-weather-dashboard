console.log("connected");
let userFormEl = document.getElementById("user-form");
console.log(userFormEl);
let searchInput = document.getElementById("destination");
let searchButton = document.getElementById("getForecast");
let historyContainer = document.getElementById("searchHistory");
let currentContainer = document.getElementById("currentWeather");
let cityWeatherSearch = document.getElementById("search-term");
let fivedayContainer = document.getElementById("forecastedWeather");

var formSubmitHandler = function (event) {
  event.preventDefault();

  let search = searchInput.value.trim();
  
  if (search) {
    getWeather(search);
    storeSearch(search);
    currentContainer.textContent = "";
    fivedayContainer.textContent = "";
    searchInput.value = "";
  } else if (event.target.textContent) {
    getWeather(event.target.textContent);
    currentContainer.textContent = "";
    fivedayContainer.textContent = "";
    searchInput.value = "";
  } else {
    alert("Please enter a city/location.");
  }
};

function storeSearch(search) {
  localStorage.setItem("city", search);

  let searchHistBtn = document.createElement("button");
  searchHistBtn.textContent = search;
  searchHistBtn.style.backgroundColor = "gray";
  historyContainer.appendChild(searchHistBtn);
}

var getWeather = function (city) {
  let apiKey = "825dda9ae5ba6a08a48bbade32e85c41";
  let weatherApi = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apiKey}`;
  console.log(city);

  fetch(weatherApi)
    .then(function (response) {
      if (response.ok) {
        console.log(response);
        response.json().then(function (data) {
          console.log(data);

          displayCurrentWeather(data, city);
          let { lat, lon } = data.coord;
          getForecast(lat, lon);
        });
      } else {
        alert("Error:" + response.statusText);
      }
    })
    .catch(function (error) {
      alert("Unable to get weather.");
    });
};
let displayCurrentWeather = function (data, city) {
  console.log(city);
  date = new Date();
  console.log(date);
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let year = date.getFullYear();
  let cityDate = data.name + ` (${month}/${day}/${year})`;
  let temp = data.main.temp;
  let tempF = 1.8 * (temp - 273) + 32;
  let tempFF = tempF.toFixed(2);
  let tempFFF = `${tempFF}\u00B0 F`;
  console.log(tempFFF);
  let wind = data.wind.speed;
  console.log(`${wind} MPH`);
  let windF = `${wind} MPH`;
  let humidity = data.main.humidity;
  console.log(`${humidity}%`);
  let humidityF = `${humidity}%`;

  var cityDateEl = document.createElement("h2");
  cityDateEl.textContent = cityDate;
  currentContainer.appendChild(cityDateEl);

  var conditionsEl = document.createElement("ul");
  conditionsEl.innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="weather icon"> `;
  currentContainer.appendChild(conditionsEl);

  var tempConditionsEl = document.createElement("li");
  tempConditionsEl.textContent = `Temp: ${tempFFF}`;
  conditionsEl.appendChild(tempConditionsEl);

  var windCondtionsEL = document.createElement("li");
  windCondtionsEL.textContent = `Wind: ${windF}`;
  conditionsEl.appendChild(windCondtionsEL);

  var humidityConditionsEl = document.createElement("li");
  humidityConditionsEl.textContent = `Humidity: ${humidityF}`;
  conditionsEl.appendChild(humidityConditionsEl);

  var liEL = document.querySelectorAll("li");
  for (let i = 0; i < liEL.length; i++) {
    liEL[i].setAttribute("style", "list-style-type: none");
  }
};

function getForecast(lat, lon) {
  let apiKey = "825dda9ae5ba6a08a48bbade32e85c41";
  let forcastApi = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;

  fetch(forcastApi)
    .then(function (response) {
      if (response.ok) {
        console.log(response);
        response.json().then(function (data) {
          console.log(data);

          displayForcast(response, data);
        });
      } else {
        alert("Error:" + response.statusText);
      }
    })
    .catch(function (error) {
      alert(`Unable to get forcast.`);
    });
}

var displayForcast = function (response, data) {
  let forecastArr = data.list;
  console.log(forecastArr);
  console.log(data);

  for (let i = 0; i < 5; i++) {
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let year = date.getFullYear();
    let cityDate = ` ${month}/${day + i + 1}/${year}`;
    let forecastCard = document.createElement("span");

    fivedayContainer.appendChild(forecastCard);

    let forecastDateEl = document.createElement("h3");
    forecastDateEl.textContent = cityDate;
    forecastCard.appendChild(forecastDateEl);

    var conditionsEl = document.createElement("ul");

    conditionsEl.innerHTML = `<img src="https://openweathermap.org/img/wn/${forecastArr[i].weather[0].icon}@2x.png" alt="weather icon"> `;
    forecastCard.appendChild(conditionsEl);

    let temp = forecastArr[i].main.temp;
    let tempF = 1.8 * (temp - 273) + 32;
    let tempFF = tempF.toFixed(2);
    let tempFFF = `${tempFF}\u00B0 F`;
    let tempConditionsEl = document.createElement("li");
    tempConditionsEl.setAttribute("style", "list-style-type: none");
    tempConditionsEl.textContent = `Temp: ${tempFFF}`;
    conditionsEl.appendChild(tempConditionsEl);

    let wind = forecastArr[i].wind.speed;
    let windF = `${wind} MPH`;
    let humidity = forecastArr[i].main.humidity;
    let humidityF = `${humidity}%`;

    var windCondtionsEL = document.createElement("li");
    windCondtionsEL.setAttribute("style", "list-style-type: none");
    windCondtionsEL.textContent = `Wind: ${windF}`;
    conditionsEl.appendChild(windCondtionsEL);

    var humidityConditionsEl = document.createElement("li");
    humidityConditionsEl.setAttribute("style", "list-style-type: none");
    humidityConditionsEl.textContent = `Humidity: ${humidityF}`;
    conditionsEl.appendChild(humidityConditionsEl);
  }
};

historyContainer.addEventListener("click", (event) => {
  console.log(event.target.type);
  if (`${event.target.type}` === 'submit') {
    formSubmitHandler(event);
  } 
  return
});
searchButton.addEventListener("click", formSubmitHandler);
