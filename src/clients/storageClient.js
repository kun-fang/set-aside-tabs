export default {
  get: async function (key) {
    let result = await browser.storage.local.get(key);
    return result[key];
  },
  set: async function (key, value) {
    let result = {};
    result[key] = value;
    return await browser.storage.local.set(result);
  },
  remove: async function (key) {
    return await browser.storage.local.remove(key);
  }
};
