import { useParams, Outlet, useLocation } from "react-router-dom";
import ChangeForecastButton from "../changeForecastButton/changeForecastButton";
import {
  fiveDaysForecastUrl,
  currentForecastText,
  fiveDaysForecastText,
} from "../../utils/consts";

const CityForecast = () => {
  let params = useParams();
  let location = useLocation();

  const isFiveDaysForecast = location.pathname.includes(fiveDaysForecastUrl);
  return (
    <section>
      <div className="d-flex flex-row align-items-center mt-4">
        <h2 className="h3 me-2">
          {isFiveDaysForecast ? fiveDaysForecastText : currentForecastText} for{" "}
          {params?.town} city
        </h2>
        <ChangeForecastButton
          isFiveDaysForecast={isFiveDaysForecast}
        ></ChangeForecastButton>
      </div>
      <Outlet />
    </section>
  );
};

export default CityForecast;
