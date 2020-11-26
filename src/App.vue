<template>
      <div class="bg-white shadow-well py-4">
<!--            <router-view></router-view>-->
        <router-view></router-view>
        </div>
</template>

<script>

export default {
  name: "App",
  data() {
    return {
      value: "World"
    };
  }
};
</script>
