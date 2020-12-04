<template>

  <div class="container text-center">
    <div class="row py-3">
      <div class="col">
        <report-score-team v-on:increase-goal="increaseGoalTeam0()"
                           v-on:decrease-goal="decreaseGoalTeam0()" :team-name="this.match.teams[0]"
                           :goals="this.team0Goal">

        </report-score-team>
      </div>
    </div>
    <div class="row py-3 mt-1">
      <div class="col ">
        <report-score-team v-on:increase-goal="increaseGoalTeam1()"
                           v-on:decrease-goal="decreaseGoalTeam1()" :team-name="this.match.teams[1]"
                           :goals="this.team1Goal">

        </report-score-team>
      </div>
    </div>

    <div class="row py-3 mt-1">
      <div class="col">
        <button @click="goBack()" class="btn btn-secondary float-left-sm mx-2" type="button">cancel</button>
      </div>
      <div class="col mt-1">
        <button @click="submitResult()" class="btn btn-primary float-right-sm mx-2" type="button">submit</button>
      </div>
    </div>

  </div>

</template>

<script>
import ReportScoreTeam from "@/components/view/reportScore/team/ReportScoreTeam";
import axios from "axios";
import {mapActions, mapGetters, mapMutations} from "vuex";

const maxGoals = 20;
export default {
  name: "ReportScoreComponent",
  components: {ReportScoreTeam},
  props: {
    match: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      team0Goal: this.match.results?this.match.results[this.match.teams[0]]:0,
      team1Goal: this.match.results?this.match.results[this.match.teams[1]]:0,
    }
  },
  computed: {
    ...mapGetters('teampools', ['getPoolData']),
    ...mapGetters('user', ['canChangeScore']),
  },
  methods: {
    goBack(){
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/');
    },
    ...mapMutations('matches', ['updateData']),
    ...mapActions('teampools', ['loadData']),
    submitResult(){
      if (!this.canChangeScore) {
        //TODO-1: change this to a notification
        console.log('No authorization to change the score');
        return;
      }

      let team0Score = parseInt(this.team0Goal);
      let team1Score = parseInt(this.team1Goal);

      if (team0Score < 0 || team1Score < 0) {
        return;
      }

      const data = {};
      data[this.match.teams[0]] = team0Score;
      data[this.match.teams[1]] = team1Score;

      console.log("date being sent - 1" + JSON.stringify(data));
      this.reportScore(data);
    },

    reportScore(data) {

      console.log("date being sent 2" + JSON.stringify(data));

      //{weekId}/match/{matchId}/score
      const currentScheduleId = this.$store.getters.getCurrentScheduleId;
      axios.post('/api/modify/' + currentScheduleId+ '/match/' + this.match.id + '/score', data)
      .then((results) => {
        console.log("updating matches "+ currentScheduleId);
        const scheduleId = currentScheduleId;
        this.updateData({scheduleId, results});
        this.loadData(scheduleId);
        this.$router.go(-1);
      })
      .catch(error => console.log(error));


    },

    increaseGoalTeam0() {
      if (this.team0Goal >= maxGoals) {
        this.team0Goal = maxGoals;
        return;
      }
      this.team0Goal++;
    },
    decreaseGoalTeam0() {
      if (this.team0Goal <= 0) {
        this.team0Goal = 0;
        return;
      }
      this.team0Goal--;
    },

    increaseGoalTeam1() {
      if (this.team1Goal >= maxGoals) {
        this.team1Goal = maxGoals;
        return;
      }
      this.team1Goal++;
    },
    decreaseGoalTeam1() {
      if (this.team1Goal <= 0) {
        this.team1Goal = 0;
        return;
      }
      this.team1Goal--;
    }
  }

}
</script>

<style scoped>


</style>
