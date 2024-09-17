import { useParams, Outlet } from "react-router-dom";
import ChangeForecastButton from "../changeForecastButton/changeForecastButton";

const CityForecast = () => {
  let params = useParams();
  return (
    <>
      <p>Results for {params?.town}</p>
      <ChangeForecastButton></ChangeForecastButton>
      <Outlet />
    </>
  );
};

export default CityForecast;
