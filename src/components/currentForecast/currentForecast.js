import { useLoaderData } from "react-router-dom";

const CurrentForecast = () => {
  let data = useLoaderData();
  return (
    <ul>
      <li>Time stamp: 8.09.2024</li>
      <li>weather conditions: {data.weather[0].description}</li>
      <li>temperature: {data.main.temp} Kelvin</li>
      <li>humidity: {data.main.humidity} %</li>
      <li>wind speed: {data.wind.speed} meter/sec</li>
    </ul>
  );
};

export default CurrentForecast;
