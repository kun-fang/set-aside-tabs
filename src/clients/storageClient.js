export default {
  get: async function (key) {
    let [localResult, syncResult] = await Promise.all([
      browser.storage.local.get(key),
      browser.storage.sync.get(key)
    ]);
    // migrate from local storage to sync storage
    if (!!localResult[key] && !syncResult[key]) {
      await this.set(key, localResult[key]);
      await browser.storage.local.remove(key);
      syncResult = localResult;
    }
    return syncResult[key];
  },
  set: async function (key, value) {
    let result = {};
    result[key] = value;
    return await browser.storage.sync.set(result);
  },
  remove: async function (key) {
    return await browser.storage.sync.remove(key);
  }
};
