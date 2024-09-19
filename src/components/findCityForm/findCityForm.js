import { useEffect } from "react";
import { Form, useLoaderData, useNavigation } from "react-router-dom";
import { findUrl } from "../../utils/consts";
import "./findCityForm.css";

const FindCityForm = () => {
  const { cityName } = useLoaderData();
  const { location } = useNavigation();

  const searching =
    location && new URLSearchParams(location.search).has("cityName");

  useEffect(() => {
    document.getElementById("cityName").value = cityName;
  }, [cityName]);

  return (
    <Form method="get" action={`/${findUrl}`}>
      <h2 className="h4" id="cityFormTitle">
        Find a city
      </h2>
      <div className="position-relative">
        <input
          type="text"
          name="cityName"
          id="cityName"
          placeholder="type city to search"
          className={`form-control ${searching ? "loading" : ""}`}
          defaultValue={cityName}
          aria-labelledby="cityFormTitle"
        />
        <div id="search-spinner" className={searching ? "" : "d-none"} />
      </div>
      <button type="submit" className="btn btn-primary mt-3">
        Submit
      </button>
    </Form>
  );
};

export default FindCityForm;
