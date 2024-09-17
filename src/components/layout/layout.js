import { Outlet, Form } from "react-router-dom";
import Preferences from "../preferences/preferences";

const Layout = () => {
  return (
    <div>
      <h1>Welcome to weather forecast app!</h1>
      <Form method="get" action="/city">
        <p>Find city</p>
        <input type="text" name="cityName" placeholder="type city to search" />
        <input type="submit" value="Submit" />
      </Form>
      <Preferences></Preferences>
      <Outlet />
    </div>
  );
};

export default Layout;
