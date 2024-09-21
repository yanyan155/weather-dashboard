import React from "react";
import { useLoaderData } from "react-router-dom";

const CurrentForecast = () => {
  let { timeStamp, description, temperature, humidity, windSpeed } =
    useLoaderData();

  return (
    <table className="table table-striped table-bordered text-center align-middle">
      <thead>
        <tr>
          <th scope="col">Date</th>
          <th scope="col">Weather</th>
          <th scope="col">Temperature, Kelvin</th>
          <th scope="col">Humidity, %</th>
          <th scope="col">Wind speed, meter/sec</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{timeStamp}</td>
          <td>{description}</td>
          <td>{temperature}</td>
          <td>{humidity}</td>
          <td>{windSpeed}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default CurrentForecast;
