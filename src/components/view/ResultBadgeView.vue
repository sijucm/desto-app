<template>

  <span>
    <span v-if="shown===1" class="badge badge-success">win</span>
    <span v-if="shown===2" class="badge badge-info">draw</span>
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
