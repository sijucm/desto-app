<template>
  <div>


    <Main
        flavour="layoutFullWidth"
        :title-long="title.long"
        :title-short="title.short"
        :sdmID="'#123'">
      <template v-slot:titlebar>

        <div class="container no-gutters">
          <div class="row justify-content-between">

            <div class="col-auto py-2">
                <router-link class="justify-content-center" to="/">
                  <img  :src="iconUrl"/>
<!--                  <span v-html="football"></span>-->
                </router-link>
                <h6>{{ title.short }}</h6>
            </div>

            <div class="col-auto px-0 pt-3 py-2">
              <ChangeCurrentSchedule></ChangeCurrentSchedule>
            </div>

            <div class="col-3 px-3 py-2">

              <nav class="navbar navbar-expand-lg navbar-light float-right px-0 py-0">

                <button class="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown"
                        aria-expanded="false" aria-label="Toggle navigation">
                  <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavDropdown">
                  <ul class="navbar-nav">
                    <li class="nav-item active">
                      <a class="nav-link" href="/">Home </a>
                    </li>
                    <!--                    <li class="nav-item">-->
                    <!--                      <a class="nav-link" href="#">Next</a>-->
                    <!--                    </li>-->
                    <li class="nav-item">
                      <a class="nav-link" href="/#/about">About</a>
                    </li>
                    <li class="nav-item">
                      <LoginUser></LoginUser>
                    </li>
                    <!--                    <li class="nav-item dropdown">-->
                    <!--                      <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink"-->
                    <!--                         data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">-->
                    <!--                        Dropdown link-->
                    <!--                      </a>-->
                    <!--                      <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">-->
                    <!--                        <a class="dropdown-item" href="#">Action</a>-->
                    <!--                        <a class="dropdown-item" href="#">Another action</a>-->
                    <!--                        <a class="dropdown-item" href="#">Something else here</a>-->
                    <!--                      </div>-->
                    <!--                    </li>-->
                  </ul>
                </div>
              </nav>

            </div>
          </div>
        </div>

      </template>

      <div class="bg-white shadow-well py-2">
        <!--        <keep-alive>-->
        <router-view></router-view>
        <!--        </keep-alive>-->
      </div>

    </Main>
  </div>

</template>

<script>

import Main from "@/layouts/Main";
import LoginUser from "@/components/user/LoginUser";
import {home, football} from "@/assets/icons.js"
import ChangeCurrentSchedule from "@/components/view/ChangeCurrentSchedule";

export default {
  name: "App",
  components: {ChangeCurrentSchedule, LoginUser, Main},
  data() {
    return {
      iconUrl: require('./assets/redhasdot.png'),
      title: {
        long: 'Teams app',
        short: '',
      },
      home, football
    };
  }
};
</script>

<style scoped>
a {
  color: inherit;
}
</style>
