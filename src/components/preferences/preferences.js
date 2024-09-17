const Preferences = () => {
  const data = [
    {
      name: "London",
      country: "GB",
      state: "England",
      coord: "-0.1278,-0.1278",
    },
    {
      name: "London",
      country: "US",
      state: "Ontario",
      coord: "-0.786,-0.342",
    },
  ];

  return (
    <div>
      <h2 className="h3">Preferences</h2>
      <p>Fast access to previous requests</p>
      <ul className="list-group">
        {data.map((el) => {
          return (
            <li key={el.coord} className="list-group-item">
              {el.name} ({el.country}, {el.state})
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Preferences;
