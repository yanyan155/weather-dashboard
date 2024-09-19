import { useNavigate, useLocation } from "react-router-dom";
import {
  fiveDaysForecastUrl,
  currentForecastUrl,
  fiveDaysForecastText,
  currentForecastText,
} from "../../utils/consts";

const ChangeForecastButton = ({ isFiveDaysForecast }) => {
  let { pathname, search } = useLocation();
  const navigate = useNavigate();

  const newPathname = isFiveDaysForecast
    ? pathname.replace(fiveDaysForecastUrl, currentForecastUrl)
    : pathname.replace(currentForecastUrl, fiveDaysForecastUrl);

  const changeForecast = () => {
    navigate(`${newPathname}${search}`);
  };
  return (
    <button type="button" onClick={changeForecast} className="btn btn-info">
      {isFiveDaysForecast ? currentForecastText : fiveDaysForecastText}
    </button>
  );
};
export default ChangeForecastButton;
