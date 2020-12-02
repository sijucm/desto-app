<template>
  <div class="card team-card">
    <div class="card-body  pr-1 ">

      <div class="container">

        <div class="row">

          <div class="col-4 pr-2 align-self-center">{{ team.team }}
            <router-link class=" mt-2"
                         :to="{name: 'TeamView', params:{'team':team, 'showMatches': false}}">
              <span v-html="this.cardText"></span>
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
import {cardText} from "@/assets/icons"
import TeamStand from "@/components/view/TeamStand";

export default {
  name: "TeamView",
  components: {TeamStand},
  data() {
    return {
      cardText
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

</style>
