import { useLoaderData, Form, useSubmit, Outlet } from "react-router-dom";
import { useState } from "react";

const ChooseTown = () => {
  let data = useLoaderData();
  console.log("ChooseTown data", data);
  const submit = useSubmit();

  const isDataExists = data?.length > 0;
  const [current, setCurrent] = useState(0);

  const onSubmit = (event) => {
    event.preventDefault();
    const selected = data[current];

    submit(`lat=${selected.lat}&lon=${selected.lon}`, {
      method: "get",
      action: `/city/${selected.name}/current-forecast`,
    });
  };

  return (
    <>
      {isDataExists && (
        <Form onSubmit={onSubmit} className="mt-4">
          <label htmlFor="choose-city-input" class="col-form-label">
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
          <button type="submit" class="btn btn-primary mt-2">
            Submit
          </button>
        </Form>
      )}
      {!isDataExists && <p>Looks like we can't find the city.</p>}
      <Outlet />
    </>
  );
};

export default ChooseTown;
