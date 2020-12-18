<template>
  <div class="centered">


    <div class="card mx-2 ">
      <h5 class="card-title text-center">{{ teamName }}</h5>
      <ul class="list-group list-group-flush">
        <li class="list-group-item my-0">
          <team-stand :team="this.getTeamData(this.teamName)"></team-stand>
        </li>
        <li class="list-group-item px-0 text-center">
          <match-list :show-toggle-show-matches="false" :pool-number="99"
                      :matches="getMatches()"></match-list>
        </li>
        <li class="list-group-item">
          <button type="link" @click="loadPastMatches()"
                  class="btn  btn-primary float-right ">show all matches
          </button>

          <button type="submit" @click="$router.push('/')"
                  class="btn btn-secondary float-left mr-2">back
          </button>


        </li>
        <li class="list-group-item" v-for="(match) in getPastMatchesForTeam()"
            :key="match.id+Math.random()">
          <match-view-main :results="match.results?match.results:{}"
                           :teams="match.teams"></match-view-main>
        </li>
      </ul>

      <ul class="list-group list-group-flush">

      </ul>
    </div>


  </div>
</template>

<script>
import MatchList from "@/components/view/MatchList";
import {mapActions, mapGetters} from "vuex";
import TeamStand from "@/components/view/TeamStand";
import MatchViewMain from "@/components/view/matchlist/MatchViewMain";

export default {
  name: "TeamView",
  components: {MatchViewMain, TeamStand, MatchList},
  props: {
    teamName: {
      type: String,
      required: true
    }
  },
  created() {
    this.loadAllData();

  },

  methods: {

    loadPastMatches() {
      console.log("load past ")
      this.loadData(this.teamName);
    },
    getMatches(){

      let matchList = JSON.parse(JSON.stringify(this.getMatchesForTeam(this.teamName)));
      matchList.forEach(match => match.teams.sort((a,) => a === this.teamName? -1 : 1));
      return matchList;
    },
    getPastMatchesForTeam() {

      return this.getPastTeamMatches(this.teamName);
    },
    ...mapActions('teamMatches', ['loadData']),
    ...mapActions(['loadAllData']),
  },
  computed: {

    ...mapGetters('teamMatches', ['getPastTeamMatches']),
    ...mapGetters('matches', ['getMatchesForTeam']),
    ...mapGetters('teampools', ['getTeamData']),
  }
}
</script>

<style scoped>

.centered {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>
