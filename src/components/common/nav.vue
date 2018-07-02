<template>
  <div class="vis-nav">
    <i class="el-icon-menu"></i>
    <ul>
      <li><a href="./index.html" target="vis-index">首页</a></li>
      <li><a href="./entironment.html">生态环境</a></li>
      <li><a href="./society.html">社会发展</a></li>
      <li><a href="./economics.html">国民经济</a></li>
      <li><a href="./stable.html">综治维稳</a></li>
      <li><a href="./emergency.html">应急指挥</a></li>
    </ul>
  </div>
</template>
<script>
export default {
  components: {},
  data () {
    return {}
  },
  mounted () {
  },
  methods: {}
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .vis-nav {
    position: fixed; top: 2.5rem; right: 6rem; z-index: 10001;
    width: 2rem; height: 2rem;
    line-height: 2rem;
    text-align: center;
    > i {
      font-size: 1.5rem;
      display: inline-block;
      cursor: pointer;
      color: #eee;
    }
    &:hover > i { color: #fff; }
    > ul {
      overflow: hidden;
      position: absolute; top: 95%; right: -3rem;
      width: 8rem;
      background-color: rgba(255, 255, 255, .2);
      height: 0;
      transition: height .4s ease-out;
      > li {
        height: 2rem;
        line-height: 2rem;
        &:first-child {
          margin-top: 1rem;
        }
        &:last-child {
          margin-bottom: 1rem;
        }
        > a {
          color: #f6f6f6;
        }
      }
    }
    &:hover > ul {
      height: 14rem;
    }
  }
</style>
