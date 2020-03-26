<template>
  <div class="card" @click="$emit('restore-tab', sessionId)">
    <div class="card-image">
      <button class="btn btn-link float-right" @click.stop="$emit('drop-tab', sessionId)">&times;</button>
      <img class="image-responsive snapshot" :src="snapshot">
    </div>
    <div class="card-footer footer">
      <label><img class="inline-icon" :src="favIconUrl">{{ title }}</label>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    url: {
      type: String,
      required: true
    },
    sessionId: {
      type: String,
      required: true
    },
    snapshot: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    favIconUrl: {
      type: String,
      required: false
    }
  }
}
</script>

<style scoped>
.tab-card > .card {
  flex: 0 0 auto;
  width: 200px;
  border-radius: 0.5rem;
  margin-left: 5px;
  margin-right: 5px;
}

.card:hover {
  box-shadow: 0 0 2px 1px #008cba;
}

.snapshot {
  max-width: 100%;
  height: auto;
  border-bottom: .05rem solid #dadee4;
  border-top: .05rem solid #dadee4;
}

.footer {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  padding-top: 0.3em !important;
  padding-top: 0.5em !important;
}

.footer > label {
   display: inline
}
</style>