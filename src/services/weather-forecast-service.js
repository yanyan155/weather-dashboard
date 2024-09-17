export default class WeatherForecastService {
  appid = "f54e26292e8a7851c509d107a3730b1d";
  apiBase = "https://api.openweathermap.org";

  getResource = async (url) => {
    const res = await fetch(`${this.apiBase}${url}&appid=${this.appid}`);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`);
    }
    return await res.json();
  };

  getCities = async (searchTerm) => {
    const res = await this.getResource(
      `/geo/1.0/direct?q=${searchTerm}&limit=10`
    );
    return this.prepareCityData(res);
  };

  getCurrentForecast = async (lat, lon) => {
    const res = await this.getResource(
      `/data/2.5/weather?lat=${lat}&lon=${lon}`
    );
    return this.prepareCurrentForecastData(res);
  };

  getFiveDaysForecast = async (lat, lon) => {
    const res = await this.getResource(
      `/data/2.5/forecast?lat=${lat}&lon=${lon}`
    );
    console.log("getFiveDaysForecast", res);
    return this.prepareFiveDaysForecastData(res);
  };

  prepareCityData = (data) => {
    const newData = data.map((el) => {
      delete el.local_names;
      return el;
    });
    return newData;
  };

  prepareCurrentForecastData = (data) => {
    const newData = {
      timeStamp: this.toDateTime(data.dt),
      description: data.weather[0].description,
      temperature: data.main.temp,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
    };
    return newData;
  };

  prepareFiveDaysForecastData = (data) => {
    const newList = data.list.map((el) => {
      return {
        date: el.dt_txt,
        description: el.weather[0].description,
        temperature: el.main.temp,
        humidity: el.main.humidity,
        windSpeed: el.wind.speed,
      };
    });

    console.log("newList", newList);
    return newList;
  };

  toDateTime = (secs) => {
    const date = new Date(1970, 0, 1);
    date.setSeconds(secs);
    return date.toISOString().replace("T", " ").replace(".000Z", "");
  };
}
