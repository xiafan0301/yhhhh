<template>
  <div class="vis-title vis-bg-cover">
    <h1>{{title}}</h1>
  </div>
</template>
<script>
export default {
  props: ['title'],
  data () {
    return {}
  },
  methods: {}
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .vis-title {
    position: absolute; top: 0; left: 0; z-index: 10000;
    width: 100%; height: 10%;
    animation: fadeInDown .4s ease-out 1s both;
    background-image: url(../../assets/img/icons/vis-002.png);
    background-position: center bottom;
    background-repeat: no-repeat;
    -webkit-background-size: auto 100%; background-size: auto 100%;
    > h1 {
      position: absolute; top: 50%; left: 50%;
      font-size: 2.2rem; color: #fff; font-family: PingFang-Medium;
      font-weight: bold;
      text-align: center;
      -webkit-transform: translate3d(-50%, -50%, 0);
      transform: translate3d(-50%, -50%, 0);
      background-image: -webkit-gradient(linear, 0 0, 0 bottom, from(rgba(255, 255, 255, 1)), to(rgba(108, 189, 234, 1)));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
</style>
