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
    <ul v-show="showMatches" class="list-group list-group-flush mt-2" >
      <li class="mt-2 list-group-item match-card p-0" v-for="match in this.matches"
          :key="match.id">
        <match-view :match="match"></match-view>
      </li>
    </ul>

  </div>


</template>

<script>
import MatchView from "@/components/view/MatchView";

export default {
  name: "MatchList",
  components: {MatchView},
  data() {
    return {
      showMatches: this.showToggleShowMatches?false:true
    };
  },
  props: {
    poolNumber: {
      type: Number,
      required: true,
    },
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
