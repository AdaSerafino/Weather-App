let now = new Date();

let h2 = document.querySelector("h2");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

let day = days[now.getDay()];
let hour = now.getHours();
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

h2.innerHTML = `${day}, ${hour}:${minutes} `;

let apiKey = "5967aac478c61d8681bc0238c6fbf1df";

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input").value;
  searchCity(city);
}

let form = document.querySelector("#search-bar");
form.addEventListener("submit", handleSubmit);

function searchCity(city) {
  let apiBase = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiBase}?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
  axios.get(apiUrl).then(changeIcon);
}

function showWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
}

function CurrentPosition(position) {
  let apiBase = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiBase}?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function locate(event) {
  navigator.geolocation.getCurrentPosition(CurrentPosition);
}

let locationButton = document.querySelector("#current");
locationButton.addEventListener("click", locate);

function changeIcon(response) {
  let icon = `${response.data.weather[0].icon}`;
  let iconElement = document.querySelector("#iconNow");

  if (icon === "11d") {
    iconElement.innerHTML = "⛈";
  } else {
    if (icon === "09d") {
      iconElement.innerHTML = "🌧";
    } else {
      if (icon === "10d") {
        iconElement.innerHTML = "🌦";
      } else {
        if (icon === "13d") {
          iconElement.innerHTML = "🌨";
        } else {
          if (icon === "13d") {
            iconElement.innerHTML = "❄";
          } else {
            if (icon === "50d") {
              iconElement.innerHTML = "🌫";
            } else {
              if (icon === "01d") {
                iconElement.innerHTML = "☀";
              } else {
                if (icon === "02d") {
                  iconElement.innerHTML = "🌤";
                } else {
                  if (icon === "03d") {
                    iconElement.innerHTML = "🌤";
                  } else {
                    if (icon === "04d" && "04n") {
                      iconElement.innerHTML = "☁";
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
searchCity("Rome");
