import refs from "./refs.js";

const {
  city,
  temp,
  icon,
  description,
  humidity,
  wind,
  input,
  btn,
  weather,
} = refs;

let apiKey = `34f80e94c4c1e9252cec72f1519cd873`;

input.addEventListener("keyup", (e) => {
  if (e.key === "Enter") getResult(input.value);
});

btn.addEventListener("click", () => {
  getResult(input.value);
});

function getResult(query) {
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}`;
  let result = fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // console.log(data.clouds);
      city.textContent = `Weather in ${data.name}`;
      let tempC = Math.round(data.main.temp - 273.15);
      temp.textContent = `${tempC}°C`;
      icon.src = `https://openweathermap.org/img/wn//${data.weather[0].icon}.png`;
      icon.alt = data.weather[0].description;
      description.textContent = data.weather[0].description;
      humidity.textContent = `Humidity: ${data.main.humidity}%`;
      wind.textContent = `Wind speed: ${data.wind.speed} km/h`;
      weather.classList.remove("loading");
      document.body.style.backgroundImage = `url(
      'https://source.unsplash.com/1600x900/?${data.name}')`;
    })
    .catch((error) => console.log(error), console.log("Mistake"));
  return result;
} // console.log(result);
