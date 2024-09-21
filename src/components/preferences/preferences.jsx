import React from "react";
import { useLoaderData, NavLink } from "react-router-dom";

import {
  fiveDaysForecastUrl,
  currentForecastUrl,
  fiveDaysForecastText,
  currentForecastText,
  cityUrl,
} from "../../utils/consts";

const Preferences = () => {
  let { preferred } = useLoaderData();

  return (
    <>
      {preferred.length > 0 && (
        <div>
          <h2 className="h4">Preferences</h2>
          <ul className="list-group">
            {preferred.map((el) => {
              const key = `${el.coords}-${el.isCurrentForecast}`;
              const url = `/${cityUrl}/${el.cityName}/${el.coords}/${
                el.isCurrentForecast ? currentForecastUrl : fiveDaysForecastUrl
              }`;

              return (
                <li key={key} className="list-group-item p-0">
                  <NavLink
                    to={url}
                    className={({ isActive, isPending }) => {
                      const classes = "d-block px-4 py-2 text-decoration-none";
                      const extra = isActive
                        ? "bg-info text-black"
                        : isPending
                        ? "bg-secondary text-white"
                        : "text-muted";
                      return `${classes} ${extra}`;
                    }}
                  >
                    {el.cityName},{" "}
                    {el.isCurrentForecast
                      ? currentForecastText
                      : fiveDaysForecastText}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
};

export default Preferences;
