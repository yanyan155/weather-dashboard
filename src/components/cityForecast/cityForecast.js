import { useParams, useLocation } from "react-router-dom";
import ChangeForecastButton from "../changeForecastButton/changeForecastButton";
import FiveDaysForecast from "../fiveDaysForecast/fiveDaysForecast";
import CurrentForecast from "../currentForecast/currentForecast";
import PreferButton from "../preferButton/preferButton";

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
      <div className="d-flex flex-row align-items-center mt-2 mt-sm-2 mt-md-4 mb-2">
        <h2 className="h4 me-2 mb-0" id="forecastTitle">
          {isFiveDaysForecast ? fiveDaysForecastText : currentForecastText} for{" "}
          {params?.town}
        </h2>
        <PreferButton></PreferButton>
        <ChangeForecastButton
          isFiveDaysForecast={isFiveDaysForecast}
        ></ChangeForecastButton>
      </div>
      {isFiveDaysForecast ? (
        <FiveDaysForecast></FiveDaysForecast>
      ) : (
        <CurrentForecast></CurrentForecast>
      )}
    </section>
  );
};

export default CityForecast;
