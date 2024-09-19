import { useParams, useLocation, useNavigation } from "react-router-dom";
import ChangeForecastButton from "../changeForecastButton/changeForecastButton";
import FiveDaysForecast from "../fiveDaysForecast/fiveDaysForecast";
import CurrentForecast from "../currentForecast/currentForecast";
import PreferButton from "../preferButton/preferButton";
import "./cityForecast.css";

import {
  fiveDaysForecastUrl,
  currentForecastText,
  fiveDaysForecastText,
} from "../../utils/consts";

const CityForecast = () => {
  const { state } = useNavigation();
  const { town } = useParams();
  const { pathname } = useLocation();

  const isFiveDaysForecast = pathname.includes(fiveDaysForecastUrl);
  return (
    <section>
      <div className="d-flex flex-row align-items-center mt-2 mt-sm-2 mt-md-4 mb-2">
        <h2 className="h4 me-2 mb-0" id="forecastTitle">
          {isFiveDaysForecast ? fiveDaysForecastText : currentForecastText} for{" "}
          {town}
        </h2>
        <PreferButton></PreferButton>
        <ChangeForecastButton
          isFiveDaysForecast={isFiveDaysForecast}
        ></ChangeForecastButton>
      </div>
      <div className={`forecast ${state === "loading" ? "loading" : ""}`}>
        {isFiveDaysForecast ? (
          <FiveDaysForecast></FiveDaysForecast>
        ) : (
          <CurrentForecast></CurrentForecast>
        )}
      </div>
    </section>
  );
};

export default CityForecast;
