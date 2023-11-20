console.log("connected");
let userFormEl = document.getElementById("user-form");
console.log(userFormEl)
let searchInput = document.getElementById("search-input");
let searchButton = document.getElementById("search-button");
let historyContainer = document.getElementById("history-container");
let currentContainer = document.getElementById("current-container");
let cityWeatherSearch = document.getElementById("search-term");
let fivedayContainer = document.getElementById("fiveday-container");

var formSubmitHandler = function(event){
  event.preventDefault();

  let search = searchInput.value.trim();

  if (search) {
    getWeather(search);
    currentContainer.textContent = "";
    fivedayContainer.textContent = "";
    searchInput.value = "";
  } else {
    alert("Please enter a city/location.");
  }
};

var getWeather = function (city) {
  let apiKey = "825dda9ae5ba6a08a48bbade32e85c41";
  let weatherAPI = `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apiKey}`;
  console.log(city);

  fetch(weatherAPI)
    .then(function (response) {
      if (response.ok) {
        console.log(response);
        response.json().then(function (data) {
          console.log(data);
          displayCurrentWeather(data, city);

          // Append proper desired information to page
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
  
  console.log(city)
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
  currentContainer.appendChild(conditionsEl);

  var tempConditionsEl = document.createElement("li");
  tempConditionsEl.textContent = tempFFF;
  conditionsEl.appendChild(tempConditionsEl);

  var windCondtionsEL = document.createElement("li");
  windCondtionsEL.textContent = windF;
  conditionsEl.appendChild(windCondtionsEL);

  var humidityConditionsEl = document.createElement("li");
  humidityConditionsEl.textContent = humidityF;
  conditionsEl.appendChild(humidityConditionsEl);

  var liEL = document.querySelectorAll("li");
  for (let i = 0; i < liEL.length; i++) {
    liEL[i].setAttribute("style", "list-style-type: none");
  }
};
userFormEl.addEventListener("submit", formSubmitHandler);
