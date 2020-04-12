import Vue from 'vue'
import SetAsideTabs from './components/SetAsideTabs.vue'
import tabAction from './tabAction.js'
import { setAsideTabsCommandName } from '../common/constant.js'

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
    setAsideTabs: [],
    setAsideTabsCommand: null,
  },
  async mounted() {
    await this.initTabs();
    await this.getCommand();
  },
  computed: {
    commandTip: function () {
      return !this.setAsideTabsCommand
        ? ""
        : `${this.setAsideTabsCommand.description}\nShortcut: ${this.setAsideTabsCommand.shortcut}`
    }
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
    },

    async getCommand() {
      let allCmds = await browser.commands.getAll();
      let filteredCmd = allCmds.filter(cmd => cmd.name === setAsideTabsCommandName);
      if (filteredCmd.length > 0) {
        this.setAsideTabsCommand = filteredCmd[0];
      }
    }
  }
})