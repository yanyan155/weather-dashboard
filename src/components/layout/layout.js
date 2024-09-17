import { Outlet } from "react-router-dom";
import Preferences from "../preferences/preferences";
import FindCityForm from "../findCityForm/findCityForm";

const Layout = () => {
  return (
    <div className="container">
      <h1 className="text-center">Welcome to weather forecast app!</h1>

      <div className="row">
        <div className="col-12 col-md-6 col-lg-4 col-xl-3">
          <FindCityForm></FindCityForm>
        </div>
        <div className="col-12 col-md-6 col-lg-4 col-xl-3">
          <Preferences></Preferences>
        </div>
      </div>

      <Outlet />
    </div>
  );
};

export default Layout;
