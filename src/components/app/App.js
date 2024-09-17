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
import { getResource } from "../../utils";

// TODO: add loading indicator
// TODO: add wordpress
// TODO: add caching requests https://www.npmjs.com/package/localforage
// TODO: add filelds validation
// TODO: add labels to forms
// TODO: check error bounaries
// TODO: impove request management (create separate service)
// TODO: add README.md

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
        loader: async ({ request, params }) => {
          const [, searchParams] = request.url.split("?");
          const searchTerm = new URLSearchParams(searchParams).get("cityName");

          return await getResource(
            `http://api.openweathermap.org/geo/1.0/direct?q=${searchTerm}&limit=10`
          );
        },
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
                loader: async ({ request, params }) => {
                  const [, searchParams] = request.url.split("?");
                  const lat = new URLSearchParams(searchParams).get("lat");
                  const lon = new URLSearchParams(searchParams).get("lon");

                  return await getResource(
                    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}`
                  );
                },
              },

              {
                path: "five-days-forecast",
                Component: FiveDaysForecast,
                ErrorBoundary: ErrorBoundary,
                loader: async ({ request, params }) => {
                  const [, searchParams] = request.url.split("?");
                  const lat = new URLSearchParams(searchParams).get("lat");
                  const lon = new URLSearchParams(searchParams).get("lon");

                  return await getResource(
                    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}`
                  );
                },
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
