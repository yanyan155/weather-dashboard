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
  layoutLoader,
} from "./loaders";
import { preferAction } from "./actions";
import {
  fiveDaysForecastUrl,
  currentForecastUrl,
  cityUrl,
  findUrl,
} from "../../utils/consts";

// TODO: add filelds validation
// TODO: impove request management
// TODO: add README.md
// check memo!

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
        path: `${cityUrl}/:town`,
        Component: CityForecast,
        ErrorBoundary: ErrorPage,
        children: [
          {
            path: currentForecastUrl,
            Component: CurrentForecast,
            ErrorBoundary: ErrorPage,
            loader: currentForecastLoader,
            action: preferAction,
          },
          {
            path: fiveDaysForecastUrl,
            Component: FiveDaysForecast,
            ErrorBoundary: ErrorPage,
            loader: fiveDaysForecastLoader,
            action: preferAction,
          },
        ],
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
