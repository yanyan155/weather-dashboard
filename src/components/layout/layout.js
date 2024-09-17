import { Outlet } from "react-router-dom";
import Preferences from "../preferences/preferences";
import FindCityForm from "../findCityForm/findCityForm";

const Layout = () => {
  return (
    <div className="container">
      <h1 className="text-center">Welcome to weather forecast app!</h1>

      <div class="row align-items-start">
        <div class="col">
          <FindCityForm></FindCityForm>
        </div>
        <div class="col">
          <Preferences></Preferences>
        </div>
      </div>

      <Outlet />
    </div>
  );
};

export default Layout;
