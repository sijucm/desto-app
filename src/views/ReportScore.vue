<template>
  <div>
    <report-score-component v-if="1==2"></report-score-component>

  <div v-if="1===1" class="card align-items-center">
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
import {mapActions, mapGetters, mapMutations} from "vuex";
import axios from "axios";
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
    reportScore() {

      if (!this.canChangeScore) {
        //TODO-1: change this to a notification
        console.log('No authorization to change the score');
      }

      let team0Score = parseInt(this.team0);
      let team1Score = parseInt(this.team1);

      if (team0Score < 0 && team1Score < 0) {
        return;
      }

      const data = {};
      data[this.match.teams[0]] = team0Score;
      data[this.match.teams[1]] = team1Score;

      console.log("date being sent" + JSON.stringify(data));

      //{weekId}/match/{matchId}/score
      const currentWeek = this.$store.state.currentWeek;
      axios.post('/api/modify/' + currentWeek + '/match/' + this.match.id + '/score', data)
      .then((results) => {
        this.updateData(results.data);
        this.$router.go(-1);
      })
      .catch(error => console.log(error));


    },
    ...mapActions('teampools', [
      'loadData'
    ]),
    ...mapMutations('matches', ['updateData'])
  },
  computed: {
    ...mapGetters('teampools', ['getPoolData']),
    ...mapGetters('user', ['canChangeScore']),
  }
}
</script>

<style scoped>

label
{
  font-weight:900;
  text-align:right;
}
</style>
