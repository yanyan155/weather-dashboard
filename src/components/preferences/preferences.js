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
    <>
      <div>Preferences</div>
      <ul>
        {data.map((el) => {
          return (
            <li key={el.coord}>
              {el.name} ({el.country}, {el.state})
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Preferences;
