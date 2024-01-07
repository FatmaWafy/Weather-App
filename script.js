let Inp = document.querySelector(".search input[type=text]");
let Btn = document.querySelector(".search input[type=submit]");
let weather = document.querySelector(".weather");
let main = document.querySelector(".main");
let boxes = document.querySelectorAll(".box");

window.onload = CheckWeather("cairo");

async function CheckWeather(city) {
  let response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=4686e096f51246bf920185235231412&q=${city}&days=7&aqi=no&alerts=no`
  );
  let data = await response.json();
  document.querySelector(
    ".city"
  ).innerHTML = `${data.location.name}, ${data.location.country} `;

  document.querySelector(".Feels-like").innerHTML =
    Math.round(data.current.feelslike_c) + "°C";

  document.querySelector(".temp").innerHTML =
    Math.round(data.current.temp_c) + "°C";

  document.querySelector(".humidity").innerHTML = data.current.humidity + " %";

  document.querySelector(".wind").innerHTML = data.current.wind_kph + " Kp/h";

  document.querySelector(".img").src = data.current.condition.icon;

  document.querySelector(".text").textContent = data.current.condition.text;

  // use a loop to update each box element with the corresponding forecast data

  boxes.forEach((box, i) => {
    let dayName = getDayName(data.forecast.forecastday[i].date);
    box.querySelector(".date").textContent = ` ${dayName}`;

    box.querySelector(".maxTemp").textContent = `Max: ${Math.round(
      data.forecast.forecastday[i].day.maxtemp_c
    )} °C`;

    box.querySelector(".minTemp").textContent = `Min: ${Math.round(
      data.forecast.forecastday[i].day.mintemp_c
    )} °C`;

    box.querySelector(
      ".condition"
    ).innerHTML = ` ${data.forecast.forecastday[i].day.condition.text} <br> <img src="${data.forecast.forecastday[i].day.condition.icon}">  `;

    box.querySelector(
      ".sunrise"
    ).textContent = `Sunrise: ${data.forecast.forecastday[i].astro.sunrise}`;

    box.querySelector(
      ".sunset"
    ).textContent = `Sunset: ${data.forecast.forecastday[i].astro.sunset}`;
  });
}

Btn.addEventListener("click", () => {
  CheckWeather(Inp.value);
});
document.onkeyup = function (e) {
  if (e.key === "Enter") {
    CheckWeather(Inp.value);
  }
};
function getDayName(date) {
  let day = new Date(date);
  return day.toLocaleDateString("EG", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}
