import storageClient from "../clients/storageClient.js"

let storageKey = "side-aside-key";

async function getSetAsideTabs() {
  let results = await storageClient.get(storageKey);
  return results || [];
}

async function addTabGroup(tabGroup) {
  let setAsideTabs = await getSetAsideTabs();
  setAsideTabs.push({
    createdAt: new Date().getTime(),
    tabs: tabGroup
  });
  let result = await storageClient.set(storageKey, setAsideTabs);
}

async function removeTabInTabGroup(tabGroupCreateTime, indexInGroup) {
  let setAsideTabs = await getSetAsideTabs();
  let tabGroup = setAsideTabs.filter(group => group.createdAt === tabGroupCreateTime)[0];
  if (tabGroup.tabs.length === 1 && indexInGroup === 0) {
    setAsideTabs = setAsideTabs.filter(group => group.createdAt !== tabGroupCreateTime);
  } else {
    tabGroup.tabs.splice(indexInGroup, 1);
  }
  await storageClient.set(storageKey, setAsideTabs);
}

async function removeTabGroup(tabGroupCreateTime) {
  let setAsideTabs = await getSetAsideTabs();
  setAsideTabs = setAsideTabs.filter(group => group.createdAt !== tabGroupCreateTime);
  return await storageClient.set(storageKey, setAsideTabs);
}

async function removeAll() {
  return await storageClient.remove(storageKey);
}

let setAsideTabStorage = {
  get: getSetAsideTabs,
  add: addTabGroup,
  removeTabGroup: removeTabGroup,
  removeAll: removeAll,
  removeTabInTabGroup: removeTabInTabGroup
};

export default setAsideTabStorage;