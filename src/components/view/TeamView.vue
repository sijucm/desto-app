<template>
  <div class="card team-card">
    <div class="card-body">

      <div>{{team.team}} <span class="badge badge-secondary"></span></div>
    </div>
  </div>
</template>

<script>

export default {
  name: "TeamView",
  props: {
    team: {
      type: Object,
      required: true,
    },
  },
  computed:{
  }
}
</script>

<style scoped>

.team-card {
  background-color: inherit;
}

</style>
