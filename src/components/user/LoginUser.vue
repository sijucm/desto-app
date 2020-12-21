<template>
  <span>
    <a v-if="!this.isLoggedIn()" class="nav-link" href="/loginGoogle">Login</a>
    <a v-if="this.isLoggedIn()" class="nav-link" href="/logout">Logout</a>
  </span>
</template>

<script>
//?post_login_redirect_uri=%2Fuserauth
import {mapGetters} from "vuex";

export default {
  name: "LoginUser",
  methods: {
    ...mapGetters('user', ['isLoggedIn']),
  }

}
</script>

<style scoped>

</style>
