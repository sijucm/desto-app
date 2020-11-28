<template>
  <div class="card">
    <div class="card-body">
      <h4 class="card-title"> {{
          match.teams[0] + ' vs ' + match.teams[1] + ' at ' + match.time + ' '
          + match.field
        }}</h4>
      <div class="card-text">

        <form>
          <div class="form-group">
            <label for="team1">{{ match.teams[0] }}</label>
            <input type="number" v-model="team0" class="form-control" id="team1"
                   placeholder="0">
          </div>
          <div class="form-group">
            <label for="team2">{{ match.teams[1] }}</label>
            <input type="number" v-model="team1" class="form-control" id="team2"
                   placeholder="0">
          </div>

          <div class="form-group">
            <label for="remarks">Remarks</label>
            <textarea v-model="remarks" class="form-control" id="remarks" rows="3"></textarea>
          </div>

        </form>
      </div>
      <div class="d-flex justify-content-between  flex-sm-row flex-wrap pb-1 mt-2">
        <button type="submit" @click="goHome" class="btn btn-secondary">Cancel</button>
        <button type="submit" @click="reportScore" class="btn btn-primary">Submit</button>
      </div>
    </div>
  </div>


</template>

<script>
import {mapActions, mapGetters, mapMutations} from "vuex";
import axios from "axios";

export default {
  name: "ReportScore",
  data() {
    return {
      team0: '', team1: '', remarks: ''
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
      this.$router.push('/');
    },
    reportScore() {

      const data = {};
      data[this.match.teams[0]] = this.team0;
      data[this.match.teams[1]] = this.team1;


      axios.post('/api/score/1/week' + 1 + '/' + this.match.id, data)
      .then((results) => {
        this.updateData(results.data);
        this.$router.push('/');
      })
      .catch(error => console.log(error));

      // // var jsonmatch = '';
      // // for(let i = 1; i <= 6; i++) {
      // //   const v = "\"pool"+i+"\":"+JSON.stringify(this.$store.getters.getMatches(i, this.getPoolData(i))) +','
      // //   jsonmatch = jsonmatch + v;
      // //
      // // }
      //
      // console.log(jsonmatch);

    },
    ...mapActions('teampools', [
      'loadData'
    ]),
    ...mapMutations('matches', ['updateData'])
  },
  computed: {
    ...mapGetters('teampools', ['getPoolData']),
  }
}
</script>

<style scoped>

</style>
