import { useLoaderData, Form, useSubmit, Outlet } from "react-router-dom";
import { useState } from "react";

const ChooseTown = () => {
  let data = useLoaderData();
  console.log("ChooseTown data", data);
  const submit = useSubmit();

  const isDataExists = data?.length > 0;
  const [current, setCurrent] = useState(0);

  return (
    <>
      {isDataExists && (
        <Form
          onSubmit={(event) => {
            event.preventDefault();
            const selected = data[current];

            submit(`lat=${selected.lat}&lon=${selected.lon}`, {
              method: "get",
              action: `/city/${selected.name}/current-forecast`,
            });
          }}
        >
          <p>Please select town</p>
          <select
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
          <input type="submit" value="Submit"></input>
        </Form>
      )}
      {!isDataExists && <p>Looks like we can't find city.</p>}
      <Outlet />
    </>
  );
};

export default ChooseTown;
