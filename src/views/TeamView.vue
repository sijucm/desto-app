<template>
  <div>

    <div class="container">
      <div class="row align-items-center">
        <div class="col-3 align-text-bottom"><h5>{{ team.team }}</h5></div>
        <div class="col">
          <team-stand :team="team"></team-stand>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <match-list :show-toggle-show-matches="false" :pool-number="99"
                      :matches="this.getMatchesForTeam(team.team)"></match-list>
        </div>
      </div>
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
    team: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters('matches', ['getMatchesForTeam']),
  }
}
</script>

<style scoped>

</style>
