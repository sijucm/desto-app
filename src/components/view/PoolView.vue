<template>

  <div class="card mt-2" :class="'division-'+this.poolNumber">
    <!--    <img class="card-img-top" src="ss" alt="Card image cap">-->
    <div class="card-body">
      <h4 class="card-title">{{ this.getPoolName(this.poolNumber)['divisionName'] }}</h4>
      <h5 class="card-subtitle">{{ this.getPoolName(this.poolNumber)['subPoolName'] }}</h5>
      <div class="card-text">




         <team-list :pool-number="this.poolNumber"></team-list>

         <match-list :pool-number="this.poolNumber" :show-toggle-show-matches="true" :matches="this.getMatches(this.poolNumber)"></match-list>


      </div>
      <!--      <a href="#" class="btn btn-primary">Go somewhere</a>-->
    </div>
  </div>

</template>

<script>
import {mapGetters} from "vuex";
import MatchList from "@/components/view/MatchList";
import TeamList from "@/components/view/TeamList";

import {champion} from "@/assets/icons"

export default {
  name: "PoolView",
  components: {TeamList, MatchList},
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
    ...mapGetters('matches', ['getMatches']),
    ...mapGetters(['getPoolName'])
  },

  methods: {}
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
