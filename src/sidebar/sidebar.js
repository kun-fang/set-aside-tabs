import Vue from 'vue'
import SetAsideTabs from './components/SetAsideTabs.vue'
import tabAction from '../common/tabAction.js'

import '../icons/set-aside-icon-48.png'
import '../icons/set-aside-icon-96.png'
import '../icons/windows-icon-48.png'

import "spectre.css/dist/spectre.css"

new Vue({
  el: '#sidebar',
  components: {
    "set-aside-tabs": SetAsideTabs
  },
  data: {
    setAsideTabs: []
  },
  async mounted() {
    this.initTabs();
  },
  methods: {
    async setAsideTabGroup() {
      let tabGroup = await tabAction.setAsideTabs(false);
      if (tabGroup.length > 0) {
        let tabs = await tabAction.getSetAsideTabs();
        this.setAsideTabs = tabs;
      }
    },

    async clearTabs() {
      await tabAction.clearAllTabs();
      this.setAsideTabs = [];
    },

    async initTabs() {
      this.setAsideTabs = await tabAction.getSetAsideTabs(false);
    }
  }
})