<template>
  <div>

    <div class="container">
      <div class="row">
        <div class="col">
          <ul class=" score-a list-group match-card list-group-flush mt-2">
            <li class="list-group-item match-card p-0 d-flex justify-content-center"> {{ teams[0] }}
              <!--              <result-badge-view :shown="getClassForTeamZero"></result-badge-view>-->
            </li>
            <li class="list-group-item match-card p-0 d-flex justify-content-center">
              {{ results.hasOwnProperty(teams[0])?results[teams[0]]:"..." }}
            </li>
          </ul>
        </div>
        <div class="col ">
          <ul class=" score-a list-group list-group-flush mt-2 ">
            <li class="list-group-item match-card p-0 d-flex justify-content-center"> {{ teams[1] }}
              <!--              <result-badge-view :shown="getClassForTeamOne"></result-badge-view>-->
            </li>
            <li class="list-group-item match-card p-0 d-flex justify-content-center">
              {{ results.hasOwnProperty(teams[1])?results[teams[1]]:"..." }}
            </li>
          </ul>
        </div>
      </div>
    </div>


  </div>
</template>

<script>

export default {
  name: "MatchResultView",
  components: {},
  props: {
    results: {
      type: Object,
      required: true,
    },
    teams: {
      type: Array,
      required: true
    }
  },
  computed: {
    getClassForTeamZero() {
      if (this.results[this.teams[0]] > this.results[this.teams[1]]) {
        return 1;
      } else if (this.results[this.teams[0]] === this.results[this.teams[1]]) {
        return 2;
      } else {
        return 0;
      }
    },
    getClassForTeamOne() {
      if (this.results[this.teams[1]] > this.results[this.teams[0]]) {
        return 1;
      } else if (this.results[this.teams[1]] === this.results[this.teams[0]]) {
        return 2;
      } else {
        return 0;
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
  border-style: groove;
}

</style>
