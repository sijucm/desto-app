<template>
  <div class="card teamcard" >
<!--    <img class="card-img-top" src="ss" alt="Card image cap">-->
    <div class="card-body">
<!--      <h5 class="card-title">{{team.team}}</h5>-->
      <div class="card-text">
      <div>{{team.team}} <span class="badge badge-secondary"></span></div>
      </div>
<!--      <a href="#" class="btn btn-primary">Go somewhere</a>-->
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
}
</script>

<style scoped>

.teamcard {
  background-color: #d8d8d8;
}

</style>
