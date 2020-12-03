<template>
<div class="container">
  <div class="row">
    <div class="col team-name">{{this.teamName}}</div>
  </div>
  <div class="row">
    <div class="col symbols">&lt;</div>
    <div class="col-6 goal">{{this.goals}}</div>
    <div class="col symbols">&gt;</div>
  </div>

</div>
</template>

<script>
export default {
  name: "ReportScoreTeam",
  props:{
    goals:{
      type:Number,
      required: true
    },
    teamName:{
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>

.team-name{
  font-size: 20px;
  background-color: #80bdff;
}

.goal{
  font-size: 60px;
  background-color: lightslategrey;
}

.symbols{
  font-size: 60px;

  background-color: #0c5460;
}


</style>
