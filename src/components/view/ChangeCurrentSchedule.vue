<template>
  <div class="container">
    <div class="row ">
      <div class="col ">
        <button :class="previousScheduleAvailable?'btn-primary':'btn-secondary'"
                @click="showPrevious()" type="button" class="btn btn-sm float-right">
          &lt;
        </button>
      </div>
      <div class="col-6 text-center">
        <h5>
          Speelronde <b>{{ this.$store.state.selectedSchedule + 3 }}</b>
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
import {mapActions} from "vuex";

export default {
  name: "ChangeCurrentSchedule",
  data() {
    return {}
  },
  computed: {
    previousScheduleAvailable() {
      const selectedSchedule = this.$store.state.selectedSchedule;
      if (this.$store.state.availableSchedules[selectedSchedule - 1]) {
        return true
      } else {
        return false;
      }
    },
    nextScheduleAvailable() {
      const selectedSchedule = this.$store.state.selectedSchedule;
      if (this.$store.state.availableSchedules[selectedSchedule + 1]) {
        return true
      } else {
        return false;
      }
    }
  },
  methods: {
    showPrevious() {
      const newScheduleIndex = this.$store.state.selectedSchedule - 1;
      this.changeSchedule(newScheduleIndex);
    },
    showNext() {
      const newScheduleIndex = this.$store.state.selectedSchedule + 1;
      this.changeSchedule(newScheduleIndex);

    },

    changeSchedule(newScheduleIndex) {
      if (this.$store.state.availableSchedules[newScheduleIndex]) {
        this.$store.state.selectedSchedule = newScheduleIndex;
        this.loadAllData();
      }
    },

    ...mapActions( ['loadAllData'])
  }
}
</script>

<style scoped>

</style>
