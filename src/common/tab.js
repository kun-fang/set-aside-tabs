export default class Tab {
  constructor(tab) {
    this.id = tab.id;
    this.url = tab.url;
    this.index = tab.index;
    this.title = tab.title;
    this.favIconUrl = tab.favIconUrl;
    this.sessionId = tab.sessionId;
    this.snapshot = tab.snapshot;
  }

  async createSnapshot() {
    this.snapshot = await browser.tabs.captureTab(this.id, {
      format: "jpeg",
      quality: 1
    });
  }

  setSessionId(session) {
    this.sessionId = session.tab.sessionId;
  }

  async restore() {
    if (this.sessionId !== null) {
      await browser.sessions.restore(this.sessionId).then(() => {}, error => {
        console.log("session cannot be restored for tab", this.toJson())
        return this.openTab();
      })
    } else {
      await this.openTab();
    }
  }

  openTab() {
    return browser.tabs.create({
      active: true,
      index: this.index,
      url: this.url
    });
  }

  toJson() {
    return {
      id: this.id,
      sessionId: this.sessionId,
      index: this.index,
      title: this.title,
      url: this.url,
      favIconUrl: this.favIconUrl,
      snapshot: this.snapshot
    }
  }
}