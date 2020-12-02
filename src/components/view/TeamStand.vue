<template>
  <div class="container m-0">
    <div class="row justify-content-center text-center">
      <div class="col p-0">
        <ul class="list-group list-group-flush">
          <li class="list-group-item">
            m
          </li>
          <li class="list-group-item">{{ team.standings.mp }}</li>
        </ul>
      </div>

      <div class="col p-0">
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
            f
          </li>
          <li class="list-group-item">{{ team.standings.gf }}</li>
        </ul>
      </div>
      <div class="col p-0">
        <ul class="list-group list-group-flush">
          <li class="list-group-item justify-content-center">
            a
          </li>
          <li class="list-group-item justify-content-center">{{ team.standings.ga }}</li>
        </ul>
      </div>
      <div class="col pr-0 pl-1">
        <ul class="list-group list-group-flush justify-content-center">
          <li class="list-group-item justify-content-center">
            points
          </li>
          <li class="list-group-item">{{
              team.standings.points
            }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TeamStand",
  props: {
    team: {
      type: Object,
      required: true,
    },
    icon: {}
  },
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
</style>
