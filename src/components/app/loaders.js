import WeatherForecastService from "../../services/weather-forecast-service";

const weatherForecastService = new WeatherForecastService();

const cityLoader = async ({ request }) => {
  const [, searchParams] = request.url.split("?");
  const searchTerm = new URLSearchParams(searchParams).get("cityName");
  console.log("cityLoader", cityLoader);
  return await weatherForecastService.getCities(searchTerm);
};

const getCoords = (request) => {
  const [, searchParams] = request.url.split("?");
  const lat = new URLSearchParams(searchParams).get("lat");
  const lon = new URLSearchParams(searchParams).get("lon");
  return [lat, lon];
};

const currentForecastLoader = async ({ request }) => {
  const [lat, lon] = getCoords(request);
  console.log("currentForecastLoader", cityLoader);
  return await weatherForecastService.getCurrentForecast(lat, lon);
};

const fiveDaysForecastLoader = async ({ request }) => {
  const [lat, lon] = getCoords(request);
  console.log("currentForecastLoader", cityLoader);
  return await weatherForecastService.getFiveDaysForecast(lat, lon);
};

export { cityLoader, currentForecastLoader, fiveDaysForecastLoader };
