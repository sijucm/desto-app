<template>

  <div class="card match-card mt-2">
    <h5 class="card-title mt-2 ml-2 d-flex justify-content-between  flex-sm-row flex-wrap">
      Matches
      <a v-if="showToggleShowMatches" class="ml-2 mr-2 btn btn-sm btn-outline-primary" role="button"
         @click="toggleShowMatches()">
        {{this.showMatches?'Hide':'Show'}}
      </a>
    </h5>
    <h6 class="card-subtitle ml-2"></h6>
    <ul v-show="showMatches" class="list-group list-group-flush" >
      <li class="list-group-item match-card px-0" v-for="match in this.matches"
          :key="match.id">
        <match-view-main :results="match.results?match.results:{}"
                         :teams="match.teams"></match-view-main>
      </li>
    </ul>

  </div>


</template>

<script>
import MatchViewMain from "@/components/view/matchlist/MatchViewMain";

export default {
  name: "MatchListMain",
  components: {MatchViewMain},
  data() {
    return {
      showMatches: !this.showToggleShowMatches
    };
  },
  props: {
    matches: {},
    showToggleShowMatches:{
      type: Boolean,
      required: true
    }
  },
  methods: {
    toggleShowMatches() {
      this.showMatches = !this.showMatches;
    }
  },
  computed: {},
}
</script>

<style scoped>
.match-card {
  background-color: inherit;
}

</style>
