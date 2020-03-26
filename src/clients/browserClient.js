export default {
  storage: {
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
  },

  tabs: browser.tabs,

  sessions: browser.sessions,

  windows: browser.windows,

  browserAction: browser.browserAction,

  sidebarAction: browser.sidebarAction,

  management: browser.management,

  runtime: browser.runtime
};
