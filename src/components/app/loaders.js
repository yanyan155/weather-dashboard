import WeatherForecastService from "../../services/weather-forecast-service";
import DataStorageService from "../../services/data-storage-service";

const weatherForecastService = new WeatherForecastService();
const citiesStore = new DataStorageService("city");
const currentForecastStore = new DataStorageService("currentForecast");
const fiveDaysForecastStore = new DataStorageService("fiveDaysForecast");

// Promise.resolve()
//   .then(async () => {
//     await citiesStore.setItem("cat", "cat");
//     await citiesStore.setItem("dog", "dog");
//     await citiesStore.setItem("3x", "3");
//     await citiesStore.setItem("1x", "1");
//     await citiesStore.setItem("a", "a");
//   })
//   .then(async () => {
//     citiesStore.clearStaleData();
//   })
//   .then(async () => {
//     await citiesStore.setItem("1", "1");
//     await citiesStore.setItem("2", "2");
//     await citiesStore.setItem("0", "0");
//     await citiesStore.setItem("2x", "2");
//     await citiesStore.setItem("frog", "frog");
//     await citiesStore.setItem("0x", "0");
//     await citiesStore.setItem("3x", "3");
//   })
//   .then(async () => {
//     citiesStore.clearStaleData();
//   })
//   .then(async () => {
//     await citiesStore.clear();
//   });

const sliceUrl = (cityUrl) => {
  const index = cityUrl.indexOf("/city");
  return cityUrl.slice(index + 5);
};

const cityLoader = async ({ request }) => {
  const [, searchParams] = request.url.split("?");
  const searchTerm = new URLSearchParams(searchParams).get("cityName"); // error here when go to weather forecast (try town 'minsk')
  const key = sliceUrl(request.url);
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

const getCoords = (request) => {
  const [, searchParams] = request.url.split("?");
  const lat = new URLSearchParams(searchParams).get("lat");
  const lon = new URLSearchParams(searchParams).get("lon");
  return [lat, lon];
};

const currentForecastLoader = async ({ request }) => {
  const [lat, lon] = getCoords(request);
  console.log("currentForecastLoader", request);

  const key = sliceUrl(request.url);
  const res = await currentForecastStore.getItem(key);
  if (res) {
    return res.data;
  } else {
    const value = await weatherForecastService.getCurrentForecast(lat, lon);
    if (value && value.length > 0) {
      await currentForecastStore.setItem(key, value); // PUSH DATA TO preferenses
    }
    return value;
  }
};

const fiveDaysForecastLoader = async ({ request }) => {
  const [lat, lon] = getCoords(request);
  console.log("fiveDaysForecastLoader", request);

  const key = sliceUrl(request.url);
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

export { cityLoader, currentForecastLoader, fiveDaysForecastLoader };
