import { useFetcher } from "react-router-dom";

const PreferButton = () => {
  const fetcher = useFetcher();
  return (
    <fetcher.Form method="post" className="me-2">
      <button
        className="btn btn-warning"
        aria-labelledby="forecastTitle"
        name="prefer"
      >
        prefer
      </button>
    </fetcher.Form>
  );
};

export default PreferButton;
