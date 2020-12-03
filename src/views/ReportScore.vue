<template>
  <div>
    <report-score-component :match="match" v-if="1==1"></report-score-component>

  <div v-if="1===2" class="card align-items-center">
    <div class="card-body">
<!--      <h6 class="card-title"> {{-->
<!--          match.teams[0] + ' vs ' + match.teams[1] + ' at ' + match.time + ' '-->
<!--          + match.field-->
<!--        }}</h6>-->
      <div class="card-text">

        <form class="form-inline">
          <div class="form-group">
            <label for="team1">{{ match.teams[0] }}</label>
            <input  type="number" v-model="team0" class="form-control form-control-lg ml-2" id="team1"
                   placeholder="goals">
          </div>
          <div class="form-group">
            <label for="team2">{{ match.teams[1] }}</label>
            <input  type="number" v-model="team1" class="form-control form-control-lg ml-2" id="team2"
                   placeholder="goals">
          </div>

          <!--          <div class="form-group">-->
          <!--            <label for="remarks">Remarks</label>-->
          <!--            <textarea v-model="remarks" class="form-control" id="remarks" rows="3"></textarea>-->
          <!--          </div>-->

        </form>
      </div>
      <div class="d-flex justify-content-between  flex-sm-row flex-wrap pb-1 mt-2">
        <button type="submit" @click="goHome" class="btn btn-secondary">Cancel</button>
        <button type="submit" @click="reportScore" class="btn btn-primary">Submit</button>
      </div>
    </div>
  </div>

  </div>

</template>

<script>
import ReportScoreComponent from "@/components/view/reportScore/ReportScoreComponent";

export default {
  name: "ReportScore",
  components: {ReportScoreComponent},
  data() {
    return {
      team0: this.match.results?this.match.results[this.match.teams[0]]:0 , team1: this.match.results?this.match.results[this.match.teams[1]]:0, remarks: ''
    }
  },
  props: {
    match: {
      type: Object,
      required: true,
    }
  },
  methods: {
    goHome() {
      this.$router.go(-1);
    },

  },

}
</script>

<style scoped>

label
{
  font-weight:900;
  text-align:right;
}
</style>
