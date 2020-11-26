<template>
  <div>
    Team pools
  </div>

</template>

<script>


import {mapActions} from "vuex";

export default {
  components: {},
  name: 'TeamPools',
  created() {
    // this.$store.state.stepState.currentStep = 3;
    //console.log(this.$store)
    // this.$store.dispatch('loadData') // dispatch loading
    // this.getData();
    console.log(this.$store)
  },

  computed: {
    ...mapActions('teampools', [
      'getData',
    ]),
  }
};
</script>

<style scoped>
</style>
