console.log("connected");
let city = document.getElementById("search").value;
console.log(city);
let apiKey = "825dda9ae5ba6a08a48bbade32e85c41";

let weatherAPI = `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apiKey}`;


fetch(weatherAPI)
.then(function(response){
    return response.json();
    console.log(response)
})
.then(function(data){
    // Append proper desired information to page
    console.log(data);
    console.log(city);
    date = new Date();
    console.log(date);
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let year = date.getFullYear();
    console.log(`${month}/${day}/${year}`)
    let temp = data.main.temp;
    let tempF = 1.8 * (temp - 273) + 32;
    let tempFF = tempF.toFixed(2);
    console.log(temp);
    console.log(`${tempFF}\u00B0 F`);
    let wind = data.wind.speed;
    console.log(`${wind} MPH`);
    let humidity = data.main.humidity;
    console.log(`${humidity}%`);

    
});