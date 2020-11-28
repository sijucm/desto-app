<template>

  <div class="container">
    <div class="row">
      <div class="col-sm-6" v-for="poolNumber in poolList" :key="poolNumber">
        <pool-view class="mt-2" :pool-number=poolNumber></pool-view>
      </div>
    </div>
  </div>

</template>
<script>
import PoolView from "@/components/view/PoolView"

export default {
  name: 'PoolList',
  components: {PoolView},
  data: () => ({
    poolList: [1, 2, 3, 4, 5, 6]
  }),

}
</script>

