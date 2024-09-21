import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "../error-page/error-page";
import Layout from "../layout/layout";
import ChooseTown from "../chooseTown/chooseTown";
import CityForecast from "../cityForecast/cityForecast";
import {
  cityLoader,
  currentForecastLoader,
  fiveDaysForecastLoader,
  layoutLoader,
  preferAction,
} from "./loadersAndActions";
import {
  fiveDaysForecastUrl,
  currentForecastUrl,
  cityUrl,
  findUrl,
} from "../../utils/consts";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    errorElement: ErrorPage,
    loader: layoutLoader,
    children: [
      {
        path: findUrl,
        Component: ChooseTown,
        ErrorBoundary: ErrorPage,
        loader: cityLoader,
      },
      {
        path: `${cityUrl}/:town/:coords/${currentForecastUrl}`,
        Component: CityForecast,
        ErrorBoundary: ErrorPage,
        loader: currentForecastLoader,
        action: preferAction,
      },
      {
        path: `${cityUrl}/:town/:coords/${fiveDaysForecastUrl}`,
        Component: CityForecast,
        ErrorBoundary: ErrorPage,
        loader: fiveDaysForecastLoader,
        action: preferAction,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
