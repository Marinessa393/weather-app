// import refs from "./refs.js";
export default class MagicWeather {
  constructor(refs) {
    this.refs = refs;
  }

  getFetch(query) {
    let apiKey = `34f80e94c4c1e9252cec72f1519cd873`;
    const {
      city,
      temp,
      icon,
      description,
      humidity,
      wind,
      weather,
    } = this.refs;

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}`;
    return fetch(url)
      .then((r) => {
        if (!r.ok) return alert("No data, try again");
        return r.json();
      })
      .then((data) => {
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
      .catch((error) => console.log(error));
  }

  search() {
    const { input, btn, container } = this.refs;
    input.addEventListener("keyup", (e) => {
      if (e.key === "Enter") {
        this.getFetch(input.value);
        container.style.display = "none";
        input.value = "";
      }
    });

    btn.addEventListener("click", () => {
      this.getFetch(input.value);
      container.style.display = "none";
      input.value = "";
    });
  }
}
