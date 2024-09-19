import { useLoaderData, Form, useSubmit, Outlet } from "react-router-dom";
import { useState } from "react";
import { currentForecastUrl, cityUrl } from "../../utils/consts";

const ChooseTown = () => {
  let data = useLoaderData();
  const submit = useSubmit();

  const isDataExists = data?.length > 0;
  const [current, setCurrent] = useState(0);

  const onSubmit = (event) => {
    event.preventDefault();
    const selected = data[current];

    submit("", {
      method: "get",
      action: `/${cityUrl}/${selected.name}/${selected.lat}-${selected.lon}/${currentForecastUrl}`,
    });
  };

  return (
    <>
      {isDataExists && (
        <div className="row ">
          <div className="col-12 col-md-6 col-lg-4 col-xl-3 my-2 my-sm-2 mt-md-4">
            <Form onSubmit={onSubmit}>
              <label htmlFor="choose-city-input" className="col-form-label">
                Please select town
              </label>
              <select
                className="form-select"
                id="choose-city-input"
                name="choose-city"
                value={current}
                onChange={(event) => {
                  setCurrent(event.target.value);
                }}
              >
                {data.map((el, i) => {
                  return (
                    <option key={i} value={i}>
                      {el.name} ({el.country ? `country: ${el.country}` : ""}{" "}
                      {el.state ? `state: ${el.state}` : ""})
                    </option>
                  );
                })}
              </select>
              <button type="submit" className="btn btn-primary mt-3">
                Submit
              </button>
            </Form>
          </div>
        </div>
      )}
      {!isDataExists && (
        <>
          <h2 className="h4">Oops!</h2>
          <p>Looks like we can't find the city. Please try another city</p>
        </>
      )}
      <Outlet />
    </>
  );
};

export default ChooseTown;
