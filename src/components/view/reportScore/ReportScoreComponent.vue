<template>

  <div class="container text-center">
    <div class="row py-3">
      <div class="col">
        <report-score-team team-name="A05-8" goals="2"></report-score-team>
      </div>
    </div>
    <div class="row py-3">
      <div class="col">
        <report-score-team team-name="B04-6" goals="9"></report-score-team>
      </div>
    </div>

  </div>

</template>

<script>
import ReportScoreTeam from "@/components/view/reportScore/team/ReportScoreTeam";

export default {
  name: "ReportScoreComponent",
  components: {ReportScoreTeam}
}
</script>

<style scoped>

</style>
