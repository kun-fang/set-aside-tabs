import setAsideTabStorage from '../common/storage.js'
import Tab from '../common/tab.js'

export default {
  async getAllTabs () {
    let tabs = await browser.tabs.query({
      currentWindow: true,
      windowType: "normal",
      hidden: false,
      pinned: false
    })
    return tabs.filter(tab => !tab.url.match("^about"))
      .map(tab => new Tab(tab));
  },

  async getHighlightedTabs () {
    let tabs = await browser.tabs.query({
      currentWindow: true,
      windowType: "normal",
      highlighted: true,
      hidden: false,
      pinned: false
    })
    return tabs.filter(tab => !tab.url.match("^about"))
      .map(tab => new Tab(tab));
  },

  async snapshotTabs (tabs) {
    await Promise.all(tabs.map(tab => tab.createSnapshot()));
  },

  async getRecentSessions (count) {
    let window = await browser.windows.getCurrent();
    let sessions = await browser.sessions.getRecentlyClosed({});
    return sessions.filter(
      session => session.tab
      && session.tab.windowId === window.id).slice(0, count);
  },

  async closeTabs (tabs) {
    let tabMap = tabs.reduce((map, tab) => {
      let key = tab.title + tab.url;
      if (map[key]) {
        map[key].push(tab);
      } else {
        map[key] = [tab];
      }
      return map;
    }, {});
    await Promise.all(tabs.map(tab => browser.tabs.remove(tab.id)));
    let sessions = await this.getRecentSessions(tabs.length);
    let sessionMap = sessions.reduce((map, session) => {
      let key = session.tab.title + session.tab.url;
      if (map[key]) {
        map[key].push(session);
      } else {
        map[key] = [session];
      }
      return map;
    }, {});
    Object.entries(tabMap).map(entry => {
      let [key, tabValues] = entry;
      let sessionValues = sessionMap[key] || [];
      tabValues.filter((_, index) => index < sessionValues.length)
        .map((tab, index) => tab.setSessionId(sessionValues[index]));
    });
  },

  async saveTabs (tabs) {
    await setAsideTabStorage.add(tabs.map(tab => tab.toJson()));
  },

  async setAsideTabs (isHighlighted) {
    let tabs = isHighlighted
      ? await this.getHighlightedTabs()
      : await this.getAllTabs();
    if (tabs.length > 0) {
      await this.snapshotTabs(tabs);
      await this.closeTabs(tabs);
    }
    if (tabs.length > 0) {
      await setAsideTabStorage.add(tabs);
    }
    return tabs;
  },

  async getSetAsideTabs () {
    let data = await setAsideTabStorage.get();
    return data.map(tabGroup => ({
      "createdAt": tabGroup.createdAt,
      "tabs": tabGroup.tabs.map(tab => new Tab(tab))
    }));
  },

  async removeRestoredTab (tabGroupCreateTime, index) {
    await setAsideTabStorage.removeTabInTabGroup(tabGroupCreateTime, index);
  },

  async clearTabGroup(tabGroupCreateTime) {
    await setAsideTabStorage.removeTabGroup(tabGroupCreateTime)
  },

  async clearAllTabs () {
    await setAsideTabStorage.removeAll();
  }
}