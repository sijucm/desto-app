<template>
  <div class="card team-card">
    <div class="card-body">

      <div class="container">

        <div class="row">

          <div class="col align-self-center">{{ team.team }}</div>

          <div class="col p-0">
            <ul class="list-group list-group-flush">
              <li class="list-group-item">
                m
              </li>
              <li class="list-group-item">{{ team.standings.mp }}</li>
            </ul>
          </div>

          <div class="col p-0 align-self-center">
            <ul class="list-group list-group-flush">
              <li class="list-group-item">
                w
              </li>
              <li class="list-group-item">{{ team.standings.w }}</li>
            </ul>
          </div>

          <div class="col p-0">
            <ul class="list-group list-group-flush">
              <li class="list-group-item">
                d
              </li>
              <li class="list-group-item">{{ team.standings.d }}</li>
            </ul>
          </div>
          <div class="col p-0">
            <ul class="list-group list-group-flush">
              <li class="list-group-item">
                gf
              </li>
              <li class="list-group-item">{{ team.standings.gf }}</li>
            </ul>
          </div>
          <div class="col p-0 justify-content-center">
            <ul class="list-group list-group-flush">
              <li class="list-group-item">
                ga
              </li>
              <li class="list-group-item">{{ team.standings.ga }}</li>
            </ul>
          </div>
          <div class="col p-0 justify-content-center">
            <ul class="list-group list-group-flush">
              <li class="list-group-item">
                points
              </li>
              <li class="list-group-item d-flex justify-content-center">{{ team.standings.points }}</li>
            </ul>
          </div>

        </div>

      </div>


    </div>
  </div>
</template>

<script>

export default {
  name: "TeamView",
  props: {
    team: {
      type: Object,
      required: true,
    },
  },
  computed: {}
}
</script>

<style scoped>

.team-card {
  background-color: inherit;
}

.list-group-item  {
  background-color: inherit;
}

</style>
