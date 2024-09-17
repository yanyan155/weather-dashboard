import { useNavigate, useLocation } from "react-router-dom";

const ChangeForecastButton = () => {
  let location = useLocation();
  const navigate = useNavigate();

  const isFiveDaysForecast = location.pathname.includes("five-days-forecast");
  const newPathname = isFiveDaysForecast
    ? location.pathname.replace("five-days-forecast", "current-forecast")
    : location.pathname.replace("current-forecast", "five-days-forecast");

  const changeForecast = () => {
    navigate(`${newPathname}${location.search}`);
  };
  return (
    <button type="button" onClick={changeForecast}>
      display{" "}
      {isFiveDaysForecast ? "current forecast" : "5 days weather forecast"}
    </button>
  );
};
export default ChangeForecastButton;
