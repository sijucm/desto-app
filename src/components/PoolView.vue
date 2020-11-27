<template>

  <div class="card mt-2" :class="'division-'+this.poolNumber" >
    <!--    <img class="card-img-top" src="ss" alt="Card image cap">-->
    <div class="card-body">
      <h5 class="card-title">{{this.$store.getters.getPoolName(this.poolNumber)}}</h5>
            <p class="card-text">
      <div v-for="(team) in getPoolData(this.poolNumber)" :key="team.team">
        <team-view class="mt-2" :team="team"></team-view>
      </div>
      <!--      <a href="#" class="btn btn-primary">Go somewhere</a>-->
    </div>
  </div>

</template>

<script>
import {mapGetters} from "vuex";
import TeamView from "@/components/TeamView";

export default {
  name: "PoolView",
  components: {TeamView},
  props: {
    poolNumber: {
      type: Number,
      required: true,
    },
  },

  computed: {
    ...mapGetters('teampools', ['getPoolData']),
  },

  methods: {

  }
}
</script>

<style scoped>
.division-1 {
  background-color: #7FCDCD;
}

.division-2 {
  background-color: #7FCDCD;
}

.division-3 {
  background-color: #98B4D4;
}

.division-4 {
  background-color: #98B4D4;
}
.division-5 {
  background-color: #DFCFBE;
}

.division-6 {
  background-color: #DFCFBE;
}


</style>
