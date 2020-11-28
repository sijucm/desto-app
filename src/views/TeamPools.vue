<template>

  <div>
    <a class="float-right" href="/.auth/login/aad">Login for admin rights</a>
<br>
<div>

    <pool-list/>
</div>

  </div>

</template>

<script>


import {mapActions} from "vuex";
import PoolList from "@/components/view/PoolList";

export default {
  components: {PoolList},
  name: 'TeamPools',
  created() {
    // this.$store.dispatch("teampools/loadData")
    this.loadData();
    this.loadMatchData();
  },

  methods: {
    ...mapActions('teampools', [
      'loadData',
    ]),
    ...mapActions('matches', {loadMatchData:'loadData'}),
  },
  computed: {
    // ...mapState('teampools', {
    //   pool1: state => state && state.data && state.data.pools ? state.data.pools.pool1 : {},
    //   pool2: state => state && state.data && state.data.pools ? state.data.pools.pool2 : {}
    // }),

  }
};
</script>

