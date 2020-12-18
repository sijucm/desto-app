<template>

  <div class="card text-center match-card">
    <div class="float-center align-text-center card-header py-0">
      <h6>
          {{
            'Time: ' + match.time + ' Field: '
            + match.field
          }}

      </h6>
    </div>
    <div class="card-body py-0 px-0">

      <div>
        <match-result-view :results="match.results?match.results:{}"
                           :teams="match.teams"></match-result-view>
      </div>


      <router-link v-if="this.canChangeScore()" class="float-right mt-2 mr-2"
                   :to="{name: 'ReportScore', params:{match}}">{{
          match.results ? 'Change results' : 'Start match'
        }}
      </router-link>


    </div>


  </div>

</template>

<script>
import MatchResultView from "@/components/view/MatchResultView";
import {mapGetters} from "vuex";

export default {
  name: "MatchView",
  components: {MatchResultView},
  props: {
    match: {
      type: Object,
      required: true,
    },
  },
  created() {
    // console.log("Roles : " + this.getRoles())
  },
  methods: {
    goToReport: (match) => {
      this.$router.push({name: 'ReportScore', params: {match}})
    },
    ...mapGetters('teampools', ['canChangeScore']),
  },
}
</script>

<style scoped>
.match-card {
  background-color: inherit;
  /*min-height: 140px;*/
}


</style>
