<template>

  <div class="card match-card">
    <ul v-show="showMatches" class="list-group list-group-flush">
      <li class="list-group-item match-card py-0 px-0" v-for="match in this.matches"
          :key="match.id">
        <match-view :match="match"></match-view>
      </li>

      <li class="list-group-item match-card py-0 px-0" id="copyItems">
        <!--        IMPORTANT!! The structure has impact on the copy function. Please be careful-->
        <div class="d-flex flex-row justify-content-center">
          <div class="p-2">
            <textarea disabled class="form-control mx-2 " rows="3"
                      :value="getMatchExportedText"></textarea>
          </div>
          <div class="p-2 align-self-center">
            <button type="submit" @click="copyToClipboard($event)"
                    class=" btn btn-secondary">copy
            </button>

          </div>
        </div>


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
      showMatches: this.showToggleShowMatches ? false : true
    };
  },
  props: {
    poolNumber: {
      type: Number,
      required: true,
    },
    matches: {},
    showToggleShowMatches: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    toggleShowMatches() {
      this.showMatches = !this.showMatches;
    },
    copyToClipboard(e) {
      // console.log("event is ", e);

      let data1 = e.target.parentElement;
      // console.log(data1)

      let data2 = data1.parentElement
      // console.log(data2)

      let data3 = data2.firstChild;
      // console.log(data3)

      let data4 = data3.firstChild
      // console.log(data4)

      data4.select();
      document.execCommand("copy");

    },
  },
  computed: {
    getMatchExportedText() {
      // const formatMatchResult = (result) => { return {a} }
      let formattedTet = this.matches.filter(match => match.results).map(match => {
        return match.teams[0]
            + ' vs '
            + match.teams[1]
            + '   '
            + match.results[match.teams[0]]
            + ' - '
            + match.results[match.teams[1]]
      });

      return formattedTet.join('\n');
    }
  },
}
</script>

<style scoped>
.match-card {
  background-color: inherit;
}

</style>
