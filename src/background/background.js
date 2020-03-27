async function createSetAsideTabsPage() {
  let opened = await getOpenedSetAsideTabsPage();
  if (!!opened) {
    await browser.tabs.update(opened.id, {
      active: true
    });
  } else {
    await browser.tabs.create({
      active: true,
      pinned: true,
      index: 0,
      url: "/sidebar.html"
    })
  }
}

async function getOpenedSetAsideTabsPage() {
  let extension = await browser.management.get(browser.runtime.id);
  let urls = extension.hostPermissions.filter(url => url.match("moz-extension://"));
  let tabs = await browser.tabs.query({
    currentWindow: true,
    url: urls[0]
  });
  return tabs.length > 0 ? tabs[0] : null;
}

browser.browserAction.onClicked.addListener(createSetAsideTabsPage);
