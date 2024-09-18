import localforage from "localforage";

export default class DataStorageService {
  constructor(name) {
    this.store = localforage.createInstance({
      name: name,
    });
    this.timeOutType = name;
    this.sizeLimit = 100;
    this.timeOut = {
      city: 1000 * 60 * 60 * 24, // 1 day in msec
      currentForecast: 1000 * 30, // 30 min in msec
      fiveDaysForecast: 1000 * 60, // 1hr in msec
    };
  }

  setItem = async (key, value) => {
    try {
      if (this.length >= this.sizeLimit) {
        await this.clearStaleData(); // TODO: call it after setItem
      }
      const obj = {
        date: Date.now(),
        data: value,
      };
      const res = await this.store.setItem(key, obj);
      return res;
    } catch (err) {
      console.log(err);
    }
  };

  getItem = async (key) => {
    try {
      const value = await this.store.getItem(key);
      if (value) {
        const date = Date.now();
        if (date - value.date < this.timeOut[this.timeOutType]) {
          return await this.store.getItem(key);
        } else {
          await this.store.removeItem(key);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  clear = async () => {
    try {
      await this.store.clear();
    } catch (err) {
      console.log(err);
    }
  };

  clearStaleData = async () => {
    try {
      const keysArr = await this.store.keys();
      let keysDateArr = await Promise.allSettled(
        keysArr.map(async (el) => {
          const item = await this.store.getItem(el);

          return {
            key: el,
            date: item.date,
          };
        })
      );
      keysDateArr = keysDateArr
        .filter((el) => el.status === "fulfilled")
        .sort((a, b) => a.value.date - b.value.date);

      const dateNow = Date.now();
      keysDateArr.forEach(async (el, i) => {
        if (
          i < 50 ||
          (dateNow - el.value.date > this.timeOut[this.timeOutType] && i < 80)
        ) {
          await this.store.removeItem(el.value.key);
        }
      });
    } catch (err) {
      console.log(err);
    }
  };
}
