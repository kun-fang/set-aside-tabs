import browserClient from '../clients/browserClient.js'
import setAsideTabStorage from './storage.js'
import Tab from './tab.js'

export default {
  async getAllTabs () {
    let tabs = await browserClient.tabs.query({
      currentWindow: true,
      windowType: "normal",
      hidden: false,
      pinned: false
    })
    return tabs.filter(tab => !tab.url.match("^about"))
      .map(tab => new Tab(tab));
  },

  async getHighlightedTabs () {
    let tabs = await browserClient.tabs.query({
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
    let window = await browserClient.windows.getCurrent();
    let sessions = await browserClient.sessions.getRecentlyClosed({});
    return sessions.filter(
      session => session.tab
      && session.tab.windowId === window.id).slice(0, count);
  },

  async closeTabs (tabs) {
    await Promise.all(tabs.map(tab => browserClient.tabs.remove(tab.id)));
    let sessions = await this.getRecentSessions(tabs.length);
    tabs
      .filter((_, index) => index < sessions.length)
      .map((tab, index) => tab.setSessionId(sessions[index]));
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