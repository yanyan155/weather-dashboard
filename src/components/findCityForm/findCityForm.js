import { useEffect } from "react";
import { Form, useLoaderData } from "react-router-dom";
import { findUrl } from "../../utils/consts";

const FindCityForm = () => {
  const { cityName } = useLoaderData();

  useEffect(() => {
    document.getElementById("cityName").value = cityName;
  }, [cityName]);

  return (
    <Form method="get" action={`/${findUrl}`}>
      <h2 className="h4" id="cityFormTitle">
        Find a city
      </h2>
      <input
        type="text"
        name="cityName"
        id="cityName"
        placeholder="type city to search"
        className="form-control"
        defaultValue={cityName}
        aria-labelledby="cityFormTitle"
      />
      <button type="submit" className="btn btn-primary mt-3">
        Submit
      </button>
    </Form>
  );
};

export default FindCityForm;
