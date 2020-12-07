<template>

  <div class="card match-card">
    <ul v-show="showMatches" class="list-group list-group-flush" >
      <li class="list-group-item match-card py-0 px-0" v-for="match in this.matches"
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
