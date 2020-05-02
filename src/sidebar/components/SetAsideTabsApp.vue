<template>
  <div id="sidebar">
    <header class="navbar">
      <section class="navbar-section">
        <button class="btn btn-lg btn-default tooltip tooltip-right"
          :data-tooltip="commandTip"
          @click="setAsideTabGroup">
          <img src="set-aside-icon-48.png" class="inline-icon">
          Set Aside Tabs
        </button>
        <button class="btn btn-lg btn-default" style="margin-left: 10px"
          v-show="this.hasHighlightedTabs"
          @click="setAsideHighlightedTabs">
          Set Aside Highlighted Tabs
        </button>
      </section>
      <section class="navbar-center">
        <div class="navbar-brand text-bold">Tabs You Have Set Aside</div>
      </section>
      <section class="navbar-section">
        <button v-if="setAsideTabs.length > 0" class="btn btn-link" @click="clearTabs">Clear All</button>
      </section>
    </header>
    <br>
    <div class="empty" v-if="setAsideTabs.length === 0">
      <div class="empty-icon">
        <img src="set-aside-icon-96.png" alt="">
      </div>
      <p class="empty-title h5">No tabs are set aside</p>
      <p class="empty-subtitle">Try it by clicking <em>Set Aside Tabs</em> button</p>
    </div>
    <set-aside-tabs :tab-groups="setAsideTabs" @refresh-tabs="initTabs"></set-aside-tabs>
  </div>
</template>

<script>
import tabAction from '../tabAction.js'
import SetAsideTabs from './SetAsideTabs.vue'

export default {
  components: {
    "set-aside-tabs": SetAsideTabs
  },
  data: function () {
    return {
      setAsideTabs: [],
      setAsideTabsCommand: null,
      hasHighlightedTabs: false
    };
  },
  props: {
    commandName: {
      type: String,
      required: true
    }
  },
  computed: {
    commandTip: function () {
      return !this.setAsideTabsCommand
        ? false
        : `${this.setAsideTabsCommand.description}\nShortcut: ${this.setAsideTabsCommand.shortcut}`
    }
  },
  mounted: async function() {
    await this.initTabs();
    await this.getCommand();
    browser.tabs.onHighlighted.addListener(async () => {
      let highlightedTabs = await tabAction.getHighlightedTabs();
      this.hasHighlightedTabs = (highlightedTabs.length > 0);
    })
  },
  methods: {
    async setAsideTabGroup() {
      let tabGroup = await tabAction.setAsideTabs(false);
      if (tabGroup.length > 0) {
        let tabs = await tabAction.getSetAsideTabs();
        this.setAsideTabs = tabs;
      }
    },

    async setAsideHighlightedTabs() {
      let tabGroup = await tabAction.setAsideTabs(true);
      if (tabGroup.length > 0) {
        let tabs = await tabAction.getSetAsideTabs();
        this.setAsideTabs = tabs;
        this.hasHighlightedTabs = false;
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
      let filteredCmd = allCmds.filter(cmd => cmd.name === this.commandName);
      if (filteredCmd.length > 0) {
        this.setAsideTabsCommand = filteredCmd[0];
      }
    }

  }
}
</script>

<style scoped>
  .btn {
    border-radius: 0.3rem !important;
  }
  .btn.btn-lg {
    height: 2.0rem !important;
  }
</style>