import { Form } from "react-router-dom";
import { cityUrl } from "../../utils/consts";

const FindCityForm = () => {
  const action = `/${cityUrl}`;
  return (
    <Form method="get" action={action}>
      <h2 className="h3">Find a city</h2>
      <label htmlFor="city-name-input" className="col-form-label">
        City
      </label>
      <input
        type="text"
        id="city-name-input"
        name="cityName"
        placeholder="type city to search"
        className="form-control"
      />
      <button type="submit" className="btn btn-primary mt-2">
        Submit
      </button>
    </Form>
  );
};

export default FindCityForm;
