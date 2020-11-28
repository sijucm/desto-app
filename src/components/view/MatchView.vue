<template>

  <div class="card match-card">
    <h6 class="card-sub-title mt-2 ml-2">{{
        match.teams[0] + ' vs ' + match.teams[1] + ' at ' + match.time + ' '
        + match.field
      }}</h6>
    <div class="card-body pt-0">

      <div v-if="match.results">
        <match-result-view :results="match.results" :teams="match.teams"></match-result-view>
      </div>

      <span class="badge badge-secondary"></span>

      <!--      <a v-on:click="this.goToReport(match)" class="card-link">report score</a>-->


    </div>
    <div class="card-link  mt-2 ml-2 mb-2">
      <router-link :to="{name: 'ReportScore', params:{match}}">{{
          match.results ? 'Change results' : 'Report results'
        }}
      </router-link>
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
  min-height: 140px;
}

</style>
