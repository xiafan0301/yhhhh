<template>
  <div style="height: 100%;">
    <transition enter-active-class="fade-in" leave-active-class="leave-immediately"
                :duration="{ enter: 300, leave: 100 }">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>
</style>
