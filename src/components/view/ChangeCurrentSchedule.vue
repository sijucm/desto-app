<template>
  <div class="container no-gutters" >
    <div class="row ">
      <div class="col-auto px-0">
        <button :class="previousScheduleAvailable?'btn-primary':'btn-secondary'"
                @click="showPrevious()" type="button" class="btn btn-sm float-right px-1 py-0">
          &lt;
        </button>
      </div>
      <div class="col-auto text-center px-1">
          {{ this.$store.getters.getCurrentScheduleObject.name}}
      </div>
      <div class="col-auto px-0 ">
        <button :class="nextScheduleAvailable?'btn-primary':'btn-secondary'"  @click="showNext()" type="button"
                class="btn btn-sm float-left px-1 py-0">&gt;
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "ChangeCurrentSchedule",
  data() {
    return {}
  },
  computed: {
    previousScheduleAvailable() {
      const selectedSchedule = this.$store.state.selectedSchedule;
      if (this.getAvailableSchedulesSettings[selectedSchedule - 1]) {
        return true
      } else {
        return false;
      }
    },
    nextScheduleAvailable() {
      const selectedSchedule = this.$store.state.selectedSchedule;
      if (this.getAvailableSchedulesSettings[selectedSchedule + 1]) {
        return true
      } else {
        return false;
      }
    },
    ...mapGetters("matchSettings", ["getAvailableSchedulesSettings"]),
  },
  methods: {
    showPrevious() {
      const newScheduleIndex = this.$store.state.selectedSchedule - 1;
      this.changeSchedule(newScheduleIndex);
    },
    showNext() {
      const newScheduleIndex = this.$store.state.selectedSchedule + 1;
      this.changeCurrentSchedule(newScheduleIndex);

    },

    changeSchedule(newScheduleIndex) {
        this.changeCurrentSchedule(newScheduleIndex);
    },

    ...mapActions( ['loadAllData']),
    ...mapActions( ['changeCurrentSchedule'])
  }
}
</script>

<style scoped>

</style>
