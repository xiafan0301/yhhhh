<template>
  <div class="new-drill">
    <div class='header'>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>模拟演练</el-breadcrumb-item>
        <el-breadcrumb-item>演练记录</el-breadcrumb-item>
        <el-breadcrumb-item><span style='color: #0785FD'>{{currentText}}</span></el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="new-drill-body">
      <div class="steps">
        <div class="step-box" :class="[$store.state.currentPage === 1 ? 'active-step' : '']">1.设置事件</div>
        <div class="step-box" :class="[$store.state.currentPage === 2 ? 'active-step' : '']">2.制定方案</div>
        <div class="step-box" :class="[$store.state.currentPage === 3 ? 'active-step' : '']">3.确定发布</div>
      </div>
      <!-- <template v-if="$store.state.currentPage === 1"> -->
        <div
          is="addEvent"
          v-show="$store.state.currentPage === 1"
          :status="status">
        </div>
      <!-- </template>
      <template v-if="$store.state.currentPage === 2"> -->
        <div
          is="addCtcPlan"
          v-show="$store.state.currentPage === 2"
          :status="status"
        ></div>
      <!-- </template> -->
    </div>
  </div>
</template>
<script>
import addEvent from './comp/addEvent.vue';
import addCtcPlan from './comp/addCtcPlan.vue';
import {dictType} from '@/config/data.js';
export default {
  components: {addEvent, addCtcPlan},
  data () {
    return {
      currentText: '',
      activeStep: 1,
      status: ''
    }
  },
  mounted () {
    this.getDataInfo();
  },
  methods: {
    getDataInfo () {
      const status = this.$route.query.status;
      if (status === 'modify') {
        this.status = 'modify';
        this.currentText = '修改演练';
      } else {
        this.currentText = '新建演练';
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.new-drill {
  padding: 20px;
  .header {
    margin-bottom: 20px;
  }
  .new-drill-body {
    background: #fff;
    padding: 20px 10px 20px 60px;
    .steps {
      width: 70%;
      display: flex;
      .step-box {
        width: 250px;
        height: 50px;
        line-height: 50px;
        background: #EFEFEF;
        color: #0785FD;
        text-align: center;
        margin-right: 20px;
      }
      .active-step {
        color: #fff !important;
        background: #0785FD !important;
      }
      // margin
    }
  }
  .operation-btn {
    margin-top: 2%;
  }
}
</style>
