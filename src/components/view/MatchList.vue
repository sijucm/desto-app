<template>

  <div class="card match-card mt-2" >
    <h5 class="card-title mt-2 ml-2">Matches</h5>
    <h6 class="card-subtitle ml-2">28-11-2020</h6>
      <ul class="list-group list-group-flush mt-2">
        <li class="list-group-item match-card p-0"  v-for="match in this.getMatches(this.poolNumber )"
            :key="match.id"> <match-view :match="match"></match-view></li>
      </ul>

  </div>


</template>

<script>
import {mapGetters} from "vuex";
import MatchView from "@/components/view/MatchView";

export default {
  name: "MatchList",
  components: {MatchView},
  props: {
    poolNumber: {
      type: Number,
      required: true,
    },
  },
  computed: {
    ...mapGetters('teampools', ['getPoolData']),
    ...mapGetters('matches',['getMatches']),
  },
}
</script>

<style scoped>
.match-card {
  background-color: inherit;
}

</style>
