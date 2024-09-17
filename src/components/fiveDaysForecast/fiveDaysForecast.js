import { useLoaderData } from "react-router-dom";

const FiveDaysForecast = () => {
  let data = useLoaderData();
  return (
    <>
      {data.list.map((el) => {
        return (
          <ul>
            <li>Time stamp: 8.09.2024</li>
            <li>weather conditions: {el.weather[0].description}</li>
            <li>temperature: {el.main.temp} Kelvin</li>
            <li>humidity: {el.main.humidity} %</li>
            <li>wind speed: {el.wind.speed} meter/sec</li>
            <li>date: {el.dt_txt}</li>
          </ul>
        );
      })}
    </>
  );
};

export default FiveDaysForecast;
