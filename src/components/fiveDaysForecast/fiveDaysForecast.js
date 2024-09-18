import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import findDaysData from "./utils";
import "./fiveDaysForecast.css";

const FiveDaysForecast = () => {
  let data = useLoaderData();
  const daysData = findDaysData(data);
  const [index, setIndex] = useState(0);

  const onDateClick = (e) => {
    const index = Number(e.target.dataset.index);
    setIndex(index);
  };

  return (
    <>
      <ul
        className="days-list list-group list-group-horizontal my-2"
        onClick={onDateClick}
      >
        {daysData.map((el, i) => {
          const active = i === index ? "active" : "";
          const className = `list-group-item ${active}`;
          return (
            <li key={el.date} className={className} data-index={i}>
              {el.date}
            </li>
          );
        })}
      </ul>
      <table className="table table-striped ">
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
          {daysData[index].data.map((el) => {
            const [, time] = el.date.split(" ");
            return (
              <tr>
                <td>{time}</td>
                <td>{el.description}</td>
                <td>{el.temperature}</td>
                <td>{el.humidity}</td>
                <td>{el.windSpeed}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default FiveDaysForecast;
