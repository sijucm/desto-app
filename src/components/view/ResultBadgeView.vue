<template>

  <span>
    <span v-if="shown===1" class="badge badge-success">+</span>
    <span v-if="shown===2" class="badge badge-info">=</span>
    <span v-if="shown===3" class="badge badge-secondary">-</span>
  </span>
</template>

<script>
export default {
  name: "ResultBadgeView",
  props:{
    shown: Number
  }
}
</script>

<style scoped>

</style>
