<template>
  <div>&nbsp;</div>
</template>
<script>
import { getLocalStore } from '@/utils/util.js';
export default {
  data () {
    return {
    }
  },
  created () {
    let aList = JSON.parse(getLocalStore('userMenuPermission'));
    if (aList && aList.length > 0) {
      if (aList[0] && aList[0].children && aList[0].children.length > 0) {
        let sp = aList[0].children[0].path;
        if (sp && sp.length > 0) {
          this.$router.push({path: sp});
          return false;
        }
      }
    }
    this.$router.push({name: 'login'});
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>
</style>
