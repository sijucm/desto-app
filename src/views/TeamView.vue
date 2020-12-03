<template>
  <div>


    <div class="card mx-3">
      <h5 class="card-title text-center">{{teamName}}</h5>
      <ul class="list-group list-group-flush">
        <li class="list-group-item my-0">
          <team-stand :team="this.getTeamData(this.teamName)"></team-stand>
        </li>
        <li class="list-group-item text-center">
          <match-list  :show-toggle-show-matches="false" :pool-number="99"
                      :matches="this.getMatchesForTeam(teamName)"></match-list>
        </li>
        <li class="list-group-item">
          <button type="submit" @click="$router.push('/')"
                  class="btn btn-primary float-right mr-4">back
          </button>
        </li>
      </ul>
    </div>




  </div>
</template>

<script>
import MatchList from "@/components/view/MatchList";
import {mapGetters} from "vuex";
import TeamStand from "@/components/view/TeamStand";

export default {
  name: "TeamView",
  components: {TeamStand, MatchList},
  props: {
    teamName: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapGetters('matches', ['getMatchesForTeam']),
    ...mapGetters('teampools', ['getTeamData']),
  }
}
</script>

<style scoped>

</style>
