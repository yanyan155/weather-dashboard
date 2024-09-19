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
        setTimeout(this.clearStaleData, 500);
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

class QueueDataStorageService {
  constructor(name) {
    this.store = localforage.createInstance({
      name: name,
    });
    this.sizeLimit = 3;
  }

  setItem = async (value) => {
    try {
      let array = await this.store.getItem("array");
      if (!array) array = [];
      const index = array.findIndex((el) => this.compareObjects(el, value));

      if (index !== -1) {
        array = array.slice(0, index).concat(array.slice(index + 1));
      }
      array.unshift(value);
      if (array.length > this.sizeLimit) {
        array.pop();
      }
      await this.store.setItem("array", array);
    } catch (err) {
      console.log(err);
    }
  };

  compareObjects(a, b) {
    for (let key in a) {
      if (a[key] !== b[key]) {
        return false;
      }
    }
    return true;
  }

  getItems = async () => {
    try {
      let array = await this.store.getItem("array");
      if (!array) array = [];
      return array;
    } catch (err) {
      console.log(err);
    }
  };
}

export { QueueDataStorageService };
