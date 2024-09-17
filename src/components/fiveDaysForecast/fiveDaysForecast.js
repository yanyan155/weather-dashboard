import { useLoaderData } from "react-router-dom";

const FiveDaysForecast = () => {
  let data = useLoaderData();
  console.log("FiveDaysForecast data", data);

  return (
    <>
      {data.map((el) => {
        return (
          <ul>
            <li>date: {el.date}</li>
            <li>weather conditions: {el.description}</li>
            <li>temperature: {el.temperature} Kelvin</li>
            <li>humidity: {el.humidity} %</li>
            <li>wind speed: {el.windSpeed} meter/sec</li>
          </ul>
        );
      })}
    </>
  );
};

export default FiveDaysForecast;
