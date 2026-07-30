const colors = [
  {
    weather: "Clear",
    color: function () {
      return `linear-gradient(180deg, #FF512F 0%, #F09819 60%, #FFCD3C 100%)`;
    },
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTA1gJceBn_MFYgWXflhS47NOCFBialGDW_KjfVowYPGw&s=10"
  },
  {
    weather: "Clouds",
    color: function () {
      return `linear-gradient(180deg, #4A00E0 0%, #8E2DE2 60%, #E0C3FC 100%)`;
    },
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQc0jjBBvHQFySNmWJqIGf85-lQfEBYjlWT_zqW0dmu5w&s=10"
  },
  {
    weather: "Rain",
    color: function () {
      return `linear-gradient(180deg, #6B7C96 0%, #A5C0D6 60%, #E2EAF1 100%)`;
    },
    imageUrl:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvFjNwgg1ExLsjRqBH5sljPS-9QWBC169Nq7iziYH5GA&s=10'
  },
  {
    weather: "Drizzle",
    color: function () {
      return ` linear-gradient(180deg, #0BA360 0%, #3CBA92 60%, #A8FF78 100%)`},
  imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-w0BXG1ENZFOF-QossoMXW4m2fb_4f0fLADQqw7DwFQ&s=10"
  },
  {
    weather: "Snow",
    color: function () {
      return `linear-gradient(180deg, #FFEBEB 0%, #F6D5F7 60%, #FFFFFF 100%)`},
  imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrpeeOLZWKU4xxAxCiAzj-rHUR1YgROebXj5jOS9R1Og&s=10"
  },
  {
    weather: "Atmosphere",
    color: function () {
      return `linear-gradient(180deg, #0284C7 0%, #38BDF8 60%, #BAE6FD 100%)`},
  imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScMBkZVvt97zZPSVf8zO5if182vM9Da1n_BahsDNPPjA&s=10"
  },
  {
    weather: "Thunderstorm",
    color: function () {
      return `linear-gradient(180deg, #0F0C20 0%, #2F0707 50%, #750000 100%)`},
  imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvtBPMCnb-svdRJrUABv9W8C5n3ledSuubuybc2boYwA&s=10"
  }
  
];

//declaration
const inputName = document.getElementById("city-name");
const weatherImage = document.querySelector(".weather-image");
const formElement = document.getElementsByTagName("form")[0];
const weatherResult = document.querySelector(".weather-result");
const appContainer = document.querySelector('.app-container');
let cityName = "baglung";
const apiKey = "12e0491c7566450df940fdad75bf383c";


//Fetch Api
async function getWeather() {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`
    );
    if (!response.ok)
      throw new Error("This is the error caused by server " + response.status);
    const data = await response.json();
    createElement(data);
  } catch (error) {
    console.error(error);
  }
}

//creates Element by the respone data
function createElement(data) {
  weatherResult.innerHTML = "";
  weatherResult.innerHTML = `
    <p class='city-name'>${data.name}</p>
  <img src=${checkImage(data.weather[0].main)}
         class='weather-image'/>
        <p class="weather-con">
          <span class="condition">${data.weather[0].main}</span>
          &ndash;
          <span class="description">${data.weather[0].description}</span>
        </p>
        <p class="temp-now">
          <i class="bi bi-thermometer-sun"></i>
          <span class="temp">${Math.round(data.main.temp - 273.5)}&deg;C</span>
        </p>
        <p class="min-max-temp">
          <span class="min">
            <i class="bi bi-thermometer-low"></i>
            <span class="min-temp">Min. ${Math.round(data.main.temp_min - 273.5)}&deg;C</span>
          </span>
          <span class="max">
            <i class="bi bi-thermometer-high"></i>
           <span class="max-temp">max. ${Math.round(data.main.temp_max - 273.5)}&deg;C</span>
          </span>
        </p>
        <p class="humidity">
          <i class="bi bi-moisture"></i>
          <span id="humidity">Humidity:${data.main.humidity}&percnt;</span>
        </p>
        <p class="wind">
          <i class="bi bi-wind"></i>
          <span id="wind">Wind Speed:${data.wind.speed}km&#47;hr</span>
        </p>
  `;
  document.querySelector(".app-container").appendChild(weatherResult);
}

formElement.addEventListener("submit", (e) => {
  e.preventDefault();
  cityName = inputName.value.trim();
  getWeather();
});
function checkImage(data) {
  switch (data) {
    case "Clear":
      appContainer.style.background=colors[0].color();
      return colors[0].imageUrl;
      break;
    case "Clouds":
       appContainer.style.background=colors[1].color();
      return colors[1].imageUrl;
      break;
    case "Rain":
       appContainer.style.background=colors[2].color();
      return colors[2].imageUrl;
      break;
    case "Drizzle":
       appContainer.style.background=colors[3].color();
      return colors[3].imageUrl;
      break;
    case "Snow":
       appContainer.style.background=colors[4].color();
      return colors[4].imageUrl;
      break;
    case "Atmosphere":
       appContainer.style.background=colors[5].color();
      return colors[5].imageUrl;
      break;
    case "Thunderstorm":
       appContainer.style.background=colors[6].color();
      return colors[6].imageUrl;
      break;
  }
}

document.addEventListener('DOMContentLoaded',()=>{
  getWeather();
})