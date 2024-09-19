import { redirect } from "react-router-dom";
import WeatherForecastService from "../../services/weather-forecast-service";
import DataStorageService, {
  QueueDataStorageService,
} from "../../services/data-storage-service";
import { cityUrl, findUrl, currentForecastUrl } from "../../utils/consts";

const weatherForecastService = new WeatherForecastService();
const citiesStore = new DataStorageService("city");
const currentForecastStore = new DataStorageService("currentForecast");
const fiveDaysForecastStore = new DataStorageService("fiveDaysForecast");
const preferredStore = new QueueDataStorageService("preferred");

const sliceUrl = (url, matcher) => {
  const index = url.indexOf(matcher);
  return url.slice(index + matcher.length);
};

const cityLoader = async ({ request }) => {
  const [, searchParams] = request.url.split("?");
  const searchTerm = new URLSearchParams(searchParams).get("cityName");
  const key = sliceUrl(request.url, `/${findUrl}`);
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
  console.log("layoutLoader", request);
  const url = new URL(request.url);
  const cityName = url.searchParams.get("cityName");
  const preferred = await preferredStore.getItems();
  return { cityName, preferred };
};

const getCoords = (url) => {
  const parts = url.split("/");
  const coords = parts[parts.length - 2];
  return coords.split("-");
};

const currentForecastLoader = async ({ request }) => {
  const [lat, lon] = getCoords(request.url);
  console.log("currentForecastLoader", request);

  const key = sliceUrl(request.url, `/${cityUrl}`);
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
  const [lat, lon] = getCoords(request.url);
  console.log("fiveDaysForecastLoader", request);

  const key = sliceUrl(request.url, `/${cityUrl}`);
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

const preferAction = async ({ params, request }) => {
  console.log("preferAction", params, request);
  const data = {
    cityName: params.town,
    coords: params.coords,
    isCurrentForecast: request.url.includes(`${currentForecastUrl}`),
  };
  await preferredStore.setItem(data);
  const index = request.url.indexOf("/city");
  return redirect(request.url.slice(index));
};

export {
  cityLoader,
  currentForecastLoader,
  fiveDaysForecastLoader,
  layoutLoader,
  preferAction,
};
