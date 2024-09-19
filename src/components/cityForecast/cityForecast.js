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
  const navigation = useNavigation();
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
      <div
        className={`forecast ${
          navigation.state === "loading" ? "loading" : ""
        }`}
      >
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
