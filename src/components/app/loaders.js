import WeatherForecastService from "../../services/weather-forecast-service";
import DataStorageService from "../../services/data-storage-service";

const weatherForecastService = new WeatherForecastService();
const citiesStore = new DataStorageService("city");
const currentForecastStore = new DataStorageService("currentForecast");
const fiveDaysForecastStore = new DataStorageService("fiveDaysForecast");

const sliceUrl = (url, matcher) => {
  const index = url.indexOf(matcher);
  return url.slice(index + matcher.length);
};

const cityLoader = async ({ request }) => {
  const [, searchParams] = request.url.split("?");
  const searchTerm = new URLSearchParams(searchParams).get("cityName");
  const key = sliceUrl(request.url, "/find");
  const res = await citiesStore.getItem(key);
  if (res) {
    return res.data;
  } else {
    const value = await weatherForecastService.getCities(searchTerm);
    if (value && value.length > 0) {
      await citiesStore.setItem(key, value);
    }
    return value;
  }
};

const layoutLoader = async ({ request }) => {
  const url = new URL(request.url);
  const cityName = url.searchParams.get("cityName");
  return { cityName };
};

const getCoords = (request) => {
  const [, searchParams] = request.url.split("?");
  const lat = new URLSearchParams(searchParams).get("lat");
  const lon = new URLSearchParams(searchParams).get("lon");
  return [lat, lon];
};

const currentForecastLoader = async ({ request }) => {
  const [lat, lon] = getCoords(request);
  console.log("currentForecastLoader", request);

  const key = sliceUrl(request.url, "/city");
  const res = await currentForecastStore.getItem(key);
  if (res) {
    return res.data;
  } else {
    const value = await weatherForecastService.getCurrentForecast(lat, lon);
    if (value && value.length > 0) {
      await currentForecastStore.setItem(key, value);
    }
    return value;
  }
};

const fiveDaysForecastLoader = async ({ request }) => {
  const [lat, lon] = getCoords(request);
  console.log("fiveDaysForecastLoader", request);

  const key = sliceUrl(request.url, "/city");
  const res = await fiveDaysForecastStore.getItem(key);
  if (res) {
    return res.data;
  } else {
    const value = await weatherForecastService.getFiveDaysForecast(lat, lon);
    if (value && value.length > 0) {
      await fiveDaysForecastStore.setItem(key, value);
    }
    return value;
  }
};

export {
  cityLoader,
  currentForecastLoader,
  fiveDaysForecastLoader,
  layoutLoader,
};
