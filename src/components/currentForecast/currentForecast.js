import { useLoaderData } from "react-router-dom";

const CurrentForecast = () => {
  let data = useLoaderData();
  console.log("CurrentForecast data", data);

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th scope="col">Time stamp</th>
          <th scope="col">Weather</th>
          <th scope="col">Temperature, Kelvin</th>
          <th scope="col">Humidity, %</th>
          <th scope="col">Wind speed, meter/sec</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{data.timeStamp}</td>
          <td>{data.description}</td>
          <td>{data.temperature}</td>
          <td>{data.humidity}</td>
          <td>{data.windSpeed}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default CurrentForecast;
