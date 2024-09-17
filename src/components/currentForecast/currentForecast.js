import { useLoaderData } from "react-router-dom";

const CurrentForecast = () => {
  let data = useLoaderData();
  console.log("CurrentForecast data", data);

  return (
    <ul>
      <li>Time stamp: {data.timeStamp}</li>
      <li>weather conditions: {data.description}</li>
      <li>temperature: {data.temperature} Kelvin</li>
      <li>humidity: {data.humidity} %</li>
      <li>wind speed: {data.windSpeed} meter/sec</li>
    </ul>
  );
};

export default CurrentForecast;
