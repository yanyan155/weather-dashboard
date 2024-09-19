import { Outlet } from "react-router-dom";
import Preferences from "../preferences/preferences";
import FindCityForm from "../findCityForm/findCityForm";

const Layout = () => {
  return (
    <div className="container mt-2">
      <h1 className="text-center h2 ">Welcome to the weather forecast app!</h1>
      <section className="row flex-column-reverse flex-md-row my-2">
        <div className="col-12 col-md-6 col-lg-4 col-xl-3 my-2 my-sm-2 mt-md-4">
          <FindCityForm></FindCityForm>
        </div>
        <div className="col-12 col-md-6 col-lg-4 col-xl-3 my-2 my-sm-2 my-md-0">
          <Preferences></Preferences>
        </div>
      </section>

      <Outlet />
    </div>
  );
};

export default Layout;
