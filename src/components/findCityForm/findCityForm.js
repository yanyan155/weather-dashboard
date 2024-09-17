import { Form } from "react-router-dom";

const FindCityForm = () => {
  return (
    <Form
      method="get"
      action="/city"
      className="d-flex flex-column align-items-start"
    >
      <h2 className="h3">Find a city</h2>
      <label htmlFor="city-name-input" class="col-form-label">
        City
      </label>
      <input
        type="text"
        id="city-name-input"
        name="cityName"
        placeholder="type city to search"
      />
      <button type="submit" class="btn btn-primary mt-2">
        Submit
      </button>
    </Form>
  );
};

export default FindCityForm;
