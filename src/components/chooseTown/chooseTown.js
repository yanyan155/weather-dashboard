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

    submit(`lat=${selected.lat}&lon=${selected.lon}`, {
      method: "get",
      action: `/${cityUrl}/${selected.name}/${currentForecastUrl}`,
    });
  };

  return (
    <>
      {isDataExists && (
        <div className="row ">
          <div className="col-12 col-md-6 col-lg-4 col-xl-3">
            <Form onSubmit={onSubmit} className="mt-4">
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
              <button type="submit" className="btn btn-primary mt-2">
                Submit
              </button>
            </Form>
          </div>
        </div>
      )}
      {!isDataExists && <p>Looks like we can't find the city.</p>}
      <Outlet />
    </>
  );
};

export default ChooseTown;
