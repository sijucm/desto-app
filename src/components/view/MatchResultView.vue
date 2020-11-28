<template>
  <div>
    <div>
      {{ teams[0] }} : {{ results[teams[0]] }}
      <result-badge-view :shown="getClassForTeamZero"></result-badge-view>
    </div>
    <div>
      {{ teams[1] }} : {{ results[teams[1]] }}
      <result-badge-view :shown="getClassForTeamOne"></result-badge-view>
    </div>
  </div>
</template>

<script>
import ResultBadgeView from "@/components/view/ResultBadgeView";
export default {
  name: "MatchResultView",
  components: {ResultBadgeView},
  props:{
    results:{
      type:Object,
      required: true,
    },
    teams:{
      type: Array,
      required: true
    }
  },
  computed:{
    getClassForTeamZero ()  {
      if(this.results[this.teams[0]] > this.results[this.teams[1]]) {
       return 1;
      }else if (this.results[this.teams[0]] === this.results[this.teams[1]]){
        return 2;
      }else{
        return 0;
      }
    },
    getClassForTeamOne () {
      if(this.results[this.teams[1]] > this.results[this.teams[0]]) {
        return 1;
      }else if (this.results[this.teams[1]] === this.results[this.teams[0]]){
        return 2;
      }else{
        return 0;
      }

    },

  }
}
</script>

<style scoped>

</style>
