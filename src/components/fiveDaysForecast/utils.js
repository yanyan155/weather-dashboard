const findDaysData = (data) => {
  const dates = data.map((el) => {
    const [date] = el.date.split(" ");
    return date;
  });
  const uniqueDates = [...new Set(dates)];
  const daysData = uniqueDates.map((el) => {
    return {
      date: el,
      data: data.filter((elem) => elem.date.includes(el)),
    };
  });
  return daysData;
};

export default findDaysData;
