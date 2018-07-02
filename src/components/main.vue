<template>
  <div class="main">
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
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .main {
    margin: 0 auto;
    height: 100%;
    background: #000;
   /* background: -webkit-linear-gradient(top, #010721, #010623);
    background: -moz-linear-gradient(top, #010721, #010623);
    background: linear-gradient(top, #010721, #010623); */
  }
</style>
