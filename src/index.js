import css from "./css/main.css";
import refs from "./js/refs.js";
// import "./js/fetch.js";
import MagicWeather from "./js/class.js";

const weatherApp = new MagicWeather(refs);

weatherApp.search();
