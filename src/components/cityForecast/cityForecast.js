import { useParams, Outlet, useLocation } from "react-router-dom";
import ChangeForecastButton from "../changeForecastButton/changeForecastButton";

const CityForecast = () => {
  let params = useParams();
  let location = useLocation();

  const isFiveDaysForecast = location.pathname.includes("five-days-forecast");
  return (
    <section>
      <div className="d-flex flex-row align-items-center mt-4">
        <h2 className="h3 me-2">
          {isFiveDaysForecast ? "5 days weather forecast" : "current forecast"}{" "}
          for {params?.town} city
        </h2>
        <ChangeForecastButton></ChangeForecastButton>
      </div>
      <Outlet />
    </section>
  );
};

export default CityForecast;
