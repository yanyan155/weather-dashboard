import { useNavigate, useLocation } from "react-router-dom";
import {
  fiveDaysForecastUrl,
  currentForecastUrl,
  fiveDaysForecastText,
  currentForecastText,
} from "../../utils/consts";

const ChangeForecastButton = ({ isFiveDaysForecast }) => {
  let location = useLocation();
  const navigate = useNavigate();

  const newPathname = isFiveDaysForecast
    ? location.pathname.replace(fiveDaysForecastUrl, currentForecastUrl)
    : location.pathname.replace(currentForecastUrl, fiveDaysForecastUrl);

  const changeForecast = () => {
    navigate(`${newPathname}${location.search}`);
  };
  return (
    <button type="button" onClick={changeForecast} className="btn btn-primary">
      display {isFiveDaysForecast ? currentForecastText : fiveDaysForecastText}
    </button>
  );
};
export default ChangeForecastButton;
