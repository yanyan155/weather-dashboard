import { useParams, Outlet, useLocation, useFetcher } from "react-router-dom";
import ChangeForecastButton from "../changeForecastButton/changeForecastButton";
import {
  fiveDaysForecastUrl,
  currentForecastText,
  fiveDaysForecastText,
} from "../../utils/consts";

const PreferButton = () => {
  const fetcher = useFetcher();
  return (
    <fetcher.Form method="post">
      {/* URL + forecast type */}
      <button
        className="btn btn-warning"
        aria-labelledby="forecastTitle"
        name="prefer"
      >
        prefer
      </button>
    </fetcher.Form>
  );
};

const CityForecast = () => {
  let params = useParams();
  let location = useLocation();

  const isFiveDaysForecast = location.pathname.includes(fiveDaysForecastUrl);
  return (
    <section>
      <div className="d-flex flex-row align-items-center mt-4 mb-2">
        <h2 className="h4 me-2" id="forecastTitle">
          {isFiveDaysForecast ? fiveDaysForecastText : currentForecastText} for{" "}
          {params?.town}
        </h2>
        <PreferButton></PreferButton>
        <ChangeForecastButton
          isFiveDaysForecast={isFiveDaysForecast}
        ></ChangeForecastButton>
      </div>
      <Outlet />
    </section>
  );
};

export default CityForecast;
