<template>
  <div class="card team-card">
    <div class="card-body  pr-1 ">

      <div class="container">

        <div class="row">

          <div class="col-4 pr-2 align-self-center">
            <router-link class=" mt-2"
                         :to="{name: 'TeamView', params:{'teamName':team.team, 'showMatches': false}}">
              <div style="display: inline-block">
                {{ team.team }}
              </div>
              <div class="waggle ml-1">
                <span v-html="this.assignment"></span>
              </div>
            </router-link>
          </div>

          <div class="col m-0">
            <team-stand :team="team"></team-stand>
          </div>

        </div>

      </div>


    </div>
  </div>
</template>

<script>
import {assignment} from "@/assets/icons"
import TeamStand from "@/components/view/TeamStand";

export default {
  name: "TeamView",
  components: {TeamStand},
  data() {
    return {
      assignment
    }
  },
  props: {
    team: {
      type: Object,
      required: true,
    },
    icon: {}
  },
  computed: {}
}
</script>

<style scoped>

.team-card {
  background-color: inherit;
}

.list-group-item {
  background-color: inherit;
  padding: 0;
}

.card-body {
  padding-left: 0;
}

.container {
  padding-left: 1;
}

.waggle {
  display: inline-block;
  animation: waggle 1s linear 3s 5 forwards;
}

@keyframes waggle {
  0% {
    transform: none;
  }
  49.5%{
    transform: none;
  }
  50% {
    transform: rotateZ(-20deg) scale(1);
    /*background: green;*/
  }
  50.5% {
    transform: rotateZ(-10deg) scale(1.2);
    /*background: red;*/
  }
  51% {
    transform: rotateZ(0) scale(1.2);
    background: none;
  }
  51.5% {
    transform: rotateZ(10deg) scale(1.2);
  }
  52% {
    transform: rotateZ(20deg) scale(1.2);
  }
  52.5% {
    transform: rotateZ(0) scale(1);
  }
  53%, 100% {
    transform:none;
  }

  /*0% {*/
  /*  transform: none;*/
  /*}*/
  /*50% {*/
  /*  transform: rotateZ(-20deg) scale(1);*/
  /*}*/
  /*60% {*/
  /*  transform: rotateZ(25deg) scale(1.2);*/
  /*}*/
  /*67.5% {*/
  /*  transform: rotateZ(-15deg) scale(1.2);*/
  /*}*/
  /*75% {*/
  /*  transform: rotateZ(15deg) scale(1.2);*/
  /*}*/
  /*82.5% {*/
  /*  transform: rotateZ(-12deg) scale(1.2);*/
  /*}*/
  /*85% {*/
  /*  transform: rotateZ(0) scale(1.2);*/
  /*}*/
  /*100% {*/
  /*  transform: rotateZ(0) scale(1);*/
  /*} */

}


</style>
