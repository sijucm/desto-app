<template>

  <div class="card text-center match-card float-center">
    <div class="float-center align-text-center card-header">
    <h6 class="mt-2 ml-2">{{
        match.teams[0] + ' vs ' + match.teams[1] + ' : ' + match.time + ' '
        + match.field
      }}</h6>
    </div>
    <div class="card-body pt-0">

      <div>
        <match-result-view :results="match.results?match.results:{}" :teams="match.teams"></match-result-view>
      </div>

      <router-link class="float-right mt-2" :to="{name: 'ReportScore', params:{match}}">{{
          match.results ? 'Change results' : 'Report results'
        }} </router-link>
    </div>


  </div>

</template>

<script>
import MatchResultView from "@/components/view/MatchResultView";
export default {
  name: "MatchView",
  components: {MatchResultView},
  props: {
    match: {
      type: Object,
      required: true,
    },
  },
  methods: {
    goToReport: (match) => {
      this.$router.push({name: 'ReportScore', params: {match}})
    },
  },
}
</script>

<style scoped>
.match-card {
  background-color: inherit;
  /*min-height: 140px;*/
}


</style>
