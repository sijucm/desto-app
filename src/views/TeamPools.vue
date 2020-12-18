<template>


<div>
    <pool-list/>
</div>


</template>

<script>


import {mapActions} from "vuex";
import PoolList from "@/components/view/PoolList";

export default {
  components: { PoolList},
  name: 'TeamPools',
   created() {
    // this.$store.dispatch("teampools/loadData")
    // this.$store.dispatch('loadAllData');
    this.loadAllData();
  },

  methods: {
    ...mapActions( [
      'loadAllData',
    ]),
  },
  computed: {
    // ...mapState('teampools', {
    //   pool1: state => state && state.data && state.data.pools ? state.data.pools.pool1 : {},
    //   pool2: state => state && state.data && state.data.pools ? state.data.pools.pool2 : {}
    // }),

  }
};
</script>

