<template>
  <div>
    <report-score-component :match="match" ></report-score-component>
  </div>

</template>

<script>
import ReportScoreComponent from "@/components/view/reportScore/ReportScoreComponent";

export default {
  name: "ReportScore",
  components: {ReportScoreComponent},
  props: {
    match: {
      type: Object,
      required: true,
    }
  },
}
</script>

<style scoped>

</style>
