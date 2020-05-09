<template>
  <div class="panel tab-group">
    <div class="panel-header">
      <div class="form-group">
        <button class="btn btn-link float-right" @click="removeGroup">&times;</button>
        <!-- <button class="btn btn-link float-right">Bookmark These Pages</button> -->
        <a class="btn btn-link float-right" @click="restoreAll">Restore tabs</a>
        <label class="form-label form-inline" v-show="nameEditing">Name: </label>
        <input ref="nameInput" v-show="nameEditing" class="form-inline" type="text" placeholder="Name" :value="name" @blur="onEditingName($event)">
        <label v-show="!nameEditing" @click="nameEditing=true"><span class="text-success">{{ name }}</span> {{ size }} tabs <span class="text-gray">{{ createTimeDisplay }}</span></label>
      </div>
    </div>
    <div class="panel-body">
      <div class="tab-card">
        <tab-snapshot
          v-for="tab in tabs"
          :key="tab.index"
          v-bind="tab"
          @restore-tab="onRestoreTab"
          @drop-tab="onDropTab">
        </tab-snapshot>
      </div>
    </div>
  </div>
</template>

<script>
import TabSnapshot from './TabSnapshot.vue'
import tabAction from '../tabAction.js'

export default {
  components: {
    'tab-snapshot': TabSnapshot
  },

  data: function () {
    return {
      nameEditing: false
    };
  },

  props: {
    tabs: {
      type: Array,
      default: () => []
    },
    createdAt: {
      type: Number,
      required: true
    },
    name: {
      type: String,
      required: false
    }
  },

  computed: {
    size: function () {
      return this.tabs.length;
    },
    createTimeDisplay: function () {
      let diff = new Date().getTime() - this.createdAt;
      if (diff / 60000 < 1) {
        return "just now";
      }
      diff = Math.floor(diff / 60000);
      if (diff / 60 < 1) {
        return `${diff} minutes ago`
      }
      diff = Math.floor(diff / 60);
      if (diff / 24 < 1) {
        return `${diff} hours ago`
      }
      diff = Math.floor(diff / 24);
      if (diff / 30 < 1) {
        return `${diff} days ago`
      }
      let createDate = new Date(this.createdAt);
      return createDate.toLocaleDateString();
    }
  },

  methods: {
    onRestoreTab: async function (sessionId) {
      let tabIndex = getIndexInTabGroup(this.tabs, sessionId);
      if (tabIndex < 0) {
        return;
      }
      await this.tabs[tabIndex].restore();
      await tabAction.removeRestoredTab(this.createdAt, tabIndex);
      this.$emit("refresh-tabs");
    },

    onDropTab: async function (sessionId) {
      let tabIndex = getIndexInTabGroup(this.tabs, sessionId);
      if (tabIndex < 0) {
        return;
      }
      await tabAction.removeRestoredTab(this.createdAt, tabIndex);
      this.$emit("refresh-tabs");
    },

    onEditingName: async function (event) {
      await tabAction.updateTabGroupName(this.createdAt, event.target.value);
      this.$emit("refresh-tabs");
      this.nameEditing = false;
    },

    restoreAll: async function () {
      await Promise.all(this.tabs.map(tab => tab.restore()));
      await tabAction.clearTabGroup(this.createdAt);
      this.$emit("refresh-tabs");
    },

    removeGroup: async function () {
      await tabAction.clearTabGroup(this.createdAt);
      this.$emit("refresh-tabs");
    }
  }
}

function getIndexInTabGroup(tabs, sessionId) {
    return tabs.map(tab => tab.sessionId).indexOf(sessionId);
}
</script>

<style scoped>
.tab-card {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
}
.tab-group {
  padding-bottom: 10px;
  background: #f7f8f9;
}
</style>