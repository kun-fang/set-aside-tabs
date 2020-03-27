<template>
  <div>
    <tab-group
      v-for="group in sortedTabGroups"
      :key="group.time"
      v-bind="group"
      @refresh-tabs="$emit('refresh-tabs')">
    </tab-group>
  </div>
</template>

<script>
import TabGroup from './TabGroup.vue'

export default {
  components: {
    "tab-group": TabGroup
  },
  
  props: {
    tabGroups: {
      type: Array,
      default: () => []
    }
  },

  computed: {
    sortedTabGroups: function () {
      return this.tabGroups.sort((a, b) => b.createdAt - a.createdAt);
    }
  }
}
</script>
