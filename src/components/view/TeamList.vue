<template>
  <div class="card team-card mt-2">

<!--    <h5 class="card-title mt-2 ml-2">Teams</h5>-->

          <ul class="list-group list-group-flush">
            <li class="list-group-item team-card p-0"  v-for="(team) in getPoolData(this.poolNumber)" :key="team.team">
              <team-view :icon="champion" :team="team"></team-view>
            </li>
          </ul>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import TeamView from "@/components/view/TeamView";
import {champion} from "@/assets/icons"

export default {
  name: "TeamList",
  components: {TeamView},
  data (){
    return{
      champion
    }
  },
  props: {
    poolNumber: {
      type: Number,
      required: true,
    },
  },
  computed: {
    ...mapGetters('teampools', ['getPoolData']),
  },
}
</script>

<style scoped>
.team-card {
  background-color: inherit;
}

</style>
