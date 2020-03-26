import browserClient from "../clients/browserClient.js"

let storageKey = "side-aside-key";

async function getSetAsideTabs() {
  let results = await browserClient.storage.get(storageKey);
  return results || [];
}

async function addTabGroup(tabGroup) {
  let setAsideTabs = await getSetAsideTabs();
  setAsideTabs.push({
    createdAt: new Date().getTime(),
    tabs: tabGroup
  });
  let result = await browserClient.storage.set(storageKey, setAsideTabs);
}

async function removeTabInTabGroup(tabGroupCreateTime, indexInGroup) {
  let setAsideTabs = await getSetAsideTabs();
  let tabGroup = setAsideTabs.filter(group => group.createdAt === tabGroupCreateTime)[0];
  if (tabGroup.tabs.length === 1 && indexInGroup === 0) {
    setAsideTabs = setAsideTabs.filter(group => group.createdAt !== tabGroupCreateTime);
  } else {
    tabGroup.tabs.splice(indexInGroup, 1);
  }
  await browserClient.storage.set(storageKey, setAsideTabs);
}

async function removeTabGroup(tabGroupCreateTime) {
  let setAsideTabs = await getSetAsideTabs();
  setAsideTabs = setAsideTabs.filter(group => group.createdAt !== tabGroupCreateTime);
  return await browserClient.storage.set(storageKey, setAsideTabs);
}

async function removeAll() {
  return await browserClient.storage.remove(storageKey);
}

let setAsideTabStorage = {
  get: getSetAsideTabs,
  add: addTabGroup,
  removeTabGroup: removeTabGroup,
  removeAll: removeAll,
  removeTabInTabGroup: removeTabInTabGroup
};

export default setAsideTabStorage;