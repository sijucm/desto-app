<template>

  <div class="card text-center match-card float-center">
    <div class="float-center align-text-center card-header">
      <h6 class="mt-2 ml-2">{{
          match.teams[0] + ' vs ' + match.teams[1] + ' : ' + match.time + ' '
          + match.field
        }}</h6>
    </div>
    <div class="card-body pt-0">

      <div>
        <match-result-view :results="match.results?match.results:{}"
                           :teams="match.teams"></match-result-view>
      </div>


      <router-link v-if="getR().includes('destoadmin')" class="float-right mt-2"
                   :to="{name: 'ReportScore', params:{match}}">{{
          match.results ? 'Change results' : 'Report results'
        }}
      </router-link>


    </div>


  </div>

</template>

<script>
import MatchResultView from "@/components/view/MatchResultView";
// import {mapGetters} from "vuex";

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
    console.log("Roles : " + this.getR())
  },
  methods: {
    goToReport: (match) => {
      this.$router.push({name: 'ReportScore', params: {match}})
    },
    // ...mapGetters('user', ['getRoles']),
    getR() {
      console.log("data in store: " + this.$store.state.user.data.clientPrincipal);
      if (this.$store.state.user.data.clientPrincipal
          && this.$store.state.user.data.clientPrincipal.userRoles) {
        return this.$store.state.user.data.clientPrincipal.userRoles;

      } else {
        return [];
      }
    }
  },
}
</script>

<style scoped>
.match-card {
  background-color: inherit;
  /*min-height: 140px;*/
}


</style>
