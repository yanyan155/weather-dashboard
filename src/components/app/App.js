import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "../error-page/error-page";
import Layout from "../layout/layout";
import ChooseTown from "../chooseTown/chooseTown";
import CityForecast from "../cityForecast/cityForecast";
import CurrentForecast from "../currentForecast/currentForecast";
import FiveDaysForecast from "../fiveDaysForecast/fiveDaysForecast";
import {
  cityLoader,
  currentForecastLoader,
  fiveDaysForecastLoader,
} from "./loaders";
import {
  fiveDaysForecastUrl,
  currentForecastUrl,
  cityUrl,
} from "../../utils/consts";

// TODO: add caching requests https://www.npmjs.com/package/localforage
// TODO: add filelds validation
// TODO: check error bounaries
// TODO: impove request management
// TODO: add README.md
// check memo!

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    errorElement: ErrorPage,
    children: [
      {
        path: cityUrl,
        Component: ChooseTown,
        ErrorBoundary: ErrorPage,
        loader: cityLoader,
        children: [
          {
            path: ":town",
            Component: CityForecast,
            ErrorBoundary: ErrorPage,
            children: [
              {
                path: currentForecastUrl,
                Component: CurrentForecast, // when new city is Added -> refresh preferences
                ErrorBoundary: ErrorPage,
                loader: currentForecastLoader,
              },
              {
                path: fiveDaysForecastUrl,
                Component: FiveDaysForecast,
                ErrorBoundary: ErrorPage,
                loader: fiveDaysForecastLoader,
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
