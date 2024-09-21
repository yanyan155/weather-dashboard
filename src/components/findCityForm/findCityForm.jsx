import React, { useEffect } from "react";
import {
  Form,
  useLoaderData,
  useNavigation,
  useSubmit,
} from "react-router-dom";
import { useForm } from "react-hook-form";
import { findUrl } from "../../utils/consts";
import "./findCityForm.css";

const FindCityForm = () => {
  const { cityName } = useLoaderData();
  const { location } = useNavigation();
  const submit = useSubmit();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      cityName: cityName,
    },
    mode: "onChange",
  });

  const searching =
    location && new URLSearchParams(location.search).has("cityName");

  useEffect(() => {
    document.getElementById("cityName").value = cityName;
  }, [cityName]);

  const onSubmit = (data) =>
    submit(data, { method: "get", action: `/${findUrl}` });

  const isInputValid = errors?.cityName;

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="h4" id="cityFormTitle">
        Find a city
      </h2>
      <div className="position-relative">
        <div id="search-spinner" className={searching ? "" : "d-none"} />
        <input
          type="text"
          name="cityName"
          id="cityName"
          placeholder="type city to search"
          aria-invalid={isInputValid ? "true" : "false"}
          className={`form-control ${searching ? "loading" : ""} ${
            isInputValid ? "is-invalid" : ""
          }`}
          aria-labelledby="cityFormTitle"
          aria-describedby="empty-cityName wrong-symbol-cityName"
          {...register("cityName", {
            required: true,
            pattern: {
              value: /^[a-zA-Z0-9 -]*$/,
            },
          })}
        />
        {errors.cityName?.type === "required" && (
          <div id="empty-cityName" className="form-text text-danger">
            Please fill the input
          </div>
        )}
        {errors.cityName?.type === "pattern" && (
          <div id="wrong-symbol-cityName" className="form-text text-danger">
            Only letters and numbers are allowed
          </div>
        )}
      </div>
      <button type="submit" className="btn btn-primary mt-3">
        Submit
      </button>
    </Form>
  );
};

export default FindCityForm;
