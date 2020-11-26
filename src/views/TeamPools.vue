<template>
  <div>
    <div class="container">

      <div>Pool 1</div>
      <div v-for="(team, index) in pool1" class="row" :key="index">
        <div>{{index+1}}: {{team.team}}</div>
      </div>

      <div>Pool 5</div>
      <div v-for="(team, index) in pool5" class="row" :key="index">
        <div>{{index+1}}: {{team.team}}</div>
      </div>

    </div>


  </div>

</template>

<script>


import {mapActions, mapState} from "vuex";

export default {
  components: {},
  name: 'TeamPools',
  created() {
    // this.$store.dispatch("teampools/loadData")
    this.loadData();
  },

  methods:{
    ...mapActions('teampools', [
      'loadData',
    ]),
  },
  computed: {
    ...mapState('teampools', {
      pool1: state => state.pools.pool1,
      pool5: state => state.pools.pool5
    }),

  }
};
</script>

<style scoped>
</style>
