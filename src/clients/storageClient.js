export default {
  get: async function (key) {
    let [localResult, syncResult] = await Promise.all([
      browser.storage.local.get(key),
      browser.storage.sync.get(key)
    ]);
    // migrate from local storage to sync storage
    if (!!syncResult[key] && !localResult[key]) {
      await this.set(key, localResult[key]);
      await browser.storage.sync.remove(key);
      localResult = syncResult;
    }
    return localResult[key];
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
