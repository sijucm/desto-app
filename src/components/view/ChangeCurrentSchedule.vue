<template>
  <div class="container pr-0">
    <div class="row ">
      <div class="col ">
        <button :class="previousScheduleAvailable?'btn-primary':'btn-secondary'"
                @click="showPrevious()" type="button" class="btn btn-sm float-right">
          &lt;
        </button>
      </div>
      <div class="col-6 text-center">
        <h5>
          {{ this.$store.getters.getCurrentScheduleObject.name}}
        </h5>
      </div>
      <div class="col ">
        <button :class="nextScheduleAvailable?'btn-primary':'btn-secondary'"  @click="showNext()" type="button"
                class="btn btn-sm float-left ">&gt;
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
