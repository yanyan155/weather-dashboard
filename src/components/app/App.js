import {
  createBrowserRouter,
  RouterProvider,
  useLocation,
} from "react-router-dom";
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

// TODO: add loading indicator
// TODO: add caching requests https://www.npmjs.com/package/localforage
// TODO: add filelds validation
// TODO: add labels to forms
// TODO: check error bounaries
// TODO: impove request management
// TODO: add README.md
// check memo!
// add consts.js file with routes and texts

const ErrorBoundary = () => {
  let location = useLocation();
  return <div>some error occurs in {location.pathname}</div>;
};

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    errorElement: ErrorPage,
    children: [
      {
        path: "city",
        Component: ChooseTown,
        ErrorBoundary: ErrorBoundary,
        loader: cityLoader,
        children: [
          {
            path: ":town",
            Component: CityForecast,
            ErrorBoundary: ErrorBoundary,
            children: [
              {
                path: "current-forecast",
                Component: CurrentForecast,
                ErrorBoundary: ErrorBoundary,
                loader: currentForecastLoader,
              },

              {
                path: "five-days-forecast",
                Component: FiveDaysForecast,
                ErrorBoundary: ErrorBoundary,
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
