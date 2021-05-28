<template>
  <div>

    <div class="container">

      <div class="row align-items-center no-gutters">
        <div class="col  text-right mr-2 ">{{ teams[0] }}</div>
        <div class="col-auto  text-center"><result-badge-view :shown="getClassForTeamZero"></result-badge-view></div>

        <template v-if='results.hasOwnProperty(teams[1]) && results[teams[1]] != null'>
          <div class="col score-a goals text-right pr-1"> {{
              results.hasOwnProperty(teams[0]) && results[teams[0]] != null ? results[teams[0]] : match.time
            }}
          </div>
          <div class="col-auto  goals p-0 m-0">-</div>
          <div class="col score-a goals text-left pl-1">{{
              results.hasOwnProperty(teams[1]) && results[teams[1]] != null ? results[teams[1]] : match.field
            }}
          </div>

        </template>
        <template v-else>
          <div class="col-auto score-a goals text-right px-3"> {{
               match.time
            }}
          {{
              match.field
            }}
          </div>

        </template>

        <div class="col-auto d-xs-none d-sm-block text-center"><result-badge-view :shown="getClassForTeamOne"></result-badge-view></div>
        <div class="col text-left ml-2">{{ teams[1] }}</div>
      </div>


    </div>


  </div>
</template>

<script>

import ResultBadgeView from "@/components/view/ResultBadgeView";
export default {
  name: "MatchViewMain",
  components: {ResultBadgeView},
  props: {
    match: {
      type: Object,
      required: true,
    },
    results: {
      type: Object,
      required: true,
    },
    teams: {
      type: Array,
      required: true
    }
  },
  methods: {

  },
  computed: {
    getClassForTeamZero() {
      if (!(Object.prototype.hasOwnProperty.call(this.results, this.teams[0])
          && Object.prototype.hasOwnProperty.call(this.results, this.teams[1]))) {
        return 0;
      }

      if (this.results[this.teams[0]] > this.results[this.teams[1]]) {
        return 1;
      } else if (this.results[this.teams[0]] === this.results[this.teams[1]]) {
        return 2;
      } else {
        return 3;
      }
    },
    getClassForTeamOne() {
      if (!(Object.prototype.hasOwnProperty.call(this.results, this.teams[0])
          && Object.prototype.hasOwnProperty.call(this.results, this.teams[1]))) {
        return 0;
      }
      if (this.results[this.teams[1]] > this.results[this.teams[0]]) {
        return 1;
      } else if (this.results[this.teams[1]] === this.results[this.teams[0]]) {
        return 2;
      } else {
        return 3;
      }

    },

  }
}
</script>

<style scoped>
.match-card {
  background-color: inherit;
  /*min-height: 140px;*/
}

.score-a {
  /*border-style: groove;*/
}

@media (min-width: 400px) {
  .goals {
    /*font-size: 20px;*/
  }
}

</style>
