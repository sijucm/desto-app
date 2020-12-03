<template>
  <div class="container ">
    <div class="row">
      <div class="col team-name">{{ this.teamName }}</div>
    </div>
    <div class="row">
      <div class="col symbols p-0">
        <button v-on:click="$emit('decrease-goal')" type="button" class="btn btn-primary-outline btn-lg  btn-block h-100 w-100 p-0">
          <span v-html="arrowLeft"></span>
        </button>
      </div>
      <div class="col-6 goal">{{ this.goals }}</div>
      <div class="col symbols p-0">
        <button v-on:click="$emit('increase-goal')" type="button" class="btn btn-primary-outline btn-lg  btn-block h-100 w-100 p-0">
          <span  v-html="arrowRight"></span>
        </button>
      </div>
    </div>

  </div>
</template>

<script>
import {arrowRight, arrowLeft} from "@/assets/icons.js"

export default {
  name: "ReportScoreTeam",
  props: {
    goals: {
      type: Number,
      required: true
    },
    teamName: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      arrowLeft, arrowRight
    }
  }
}
</script>

<style scoped>

.team-name {
  font-size: 50px;
  background-color: #5a6268;
}

.goal {
  font-size: 60px;
  background-color: lightslategrey;
}

.symbols {
  font-size: 60px;

  background-color: #0c5460;
}


</style>
