<template>


<div>
  <ChangeCurrentSchedule></ChangeCurrentSchedule>
    <pool-list/>
</div>


</template>

<script>


import {mapActions} from "vuex";
import PoolList from "@/components/view/PoolList";
import ChangeCurrentSchedule from "@/components/view/ChangeCurrentSchedule";

export default {
  components: {ChangeCurrentSchedule, PoolList},
  name: 'TeamPools',
   created() {
    // this.$store.dispatch("teampools/loadData")
    this.$store.dispatch('loadAllData');

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

