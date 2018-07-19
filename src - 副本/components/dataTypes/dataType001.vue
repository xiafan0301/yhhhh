<!-- 基础数据类型 -->
<template>
  <div class="main">
    <div class="vis-bg-l">
      <div is="visMenu"></div>
    </div>
    <div class="vis-bg-r">
      <div is="visHeader"></div>
      <div class="vis-bg-content">
        <transition enter-active-class="fade-in" leave-active-class="leave-immediately"
                    :duration="{ enter: 300, leave: 100 }">
          <router-view></router-view>
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
import visHeader from '@/components/common/header.vue';
import visMenu from '@/components/common/menu.vue';
export default {
  components: {visHeader, visMenu},
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
    min-width: 1200px; height: 100%;
   /* background: -webkit-linear-gradient(top, #010721, #010623);
    background: -moz-linear-gradient(top, #010721, #010623);
    background: linear-gradient(top, #010721, #010623); */
  }
  .vis-bg-l {
    float: left;
    width: 200px; height: 100%;
    background-color: #022344;
  }
  .vis-bg-r {
    height: 100%;
    margin-left: 200px;
    position: relative;
  }
  .vis-bg-content {
    padding-top: 62px;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
  }
</style>
