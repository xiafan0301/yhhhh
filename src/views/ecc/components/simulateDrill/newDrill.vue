<template>
  <div class="new-drill">
    <div class='header'>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>模拟演练</el-breadcrumb-item>
        <el-breadcrumb-item>演练记录</el-breadcrumb-item>
        <el-breadcrumb-item><span style='color: #0785FD'>新建演练</span></el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="new-drill-body">
      <div class="steps">
        <div class="step-box" :class="[currentPage === '1' ? 'active-step' : '']">1.设置事件</div>
        <div class="step-box" :class="[currentPage === '2' ? 'active-step' : '']">2.制定方案</div>
        <div class="step-box" :class="[currentPage === '3' ? 'active-step' : '']">3.确定发布</div>
      </div>
      <div is="addEvent" v-show="currentPage === '1'" @eventData="eventFromChild"></div>
      <div is="addCtcPlan" v-show="currentPage === '2'" @ctcData="ctcFromChild" @ctcPage="pageFromChild"></div>
    </div>
  </div>
</template>
<script>
import addEvent from './comp/addEvent.vue';
import addCtcPlan from './comp/addCtcPlan.vue';
export default {
  components: {addEvent, addCtcPlan},
  data () {
    return {
      activeStep: 1,
      currentPage: '1',
      eventDataInfo: null,
      taskList: []
    }
  },
  methods: {
    pageFromChild (data) {
      this.currentPage = data;
    },
    eventFromChild (data) { // 接收来自子组件的值
      this.currentPage = data.currentPage;
      this.eventDataInfo = data.emiEvent;
      console.log(this.eventDataInfo)
    },
    ctcFromChild (data) {
      this.taskList = data.taskList;
      if (this.eventDataInfo) {
        this.axios.post('A2/eventServices/event', this.eventDataInfo)
          .then((res) => {
            if (res) {
              console.log(res)
              this.axios.post('A2/taskServices/task/' + res.data, this.taskList)
                .then((response) => {
                  if (response) {
                    this.currentPage = data.currentPage;
                    this.$message({
                      message: '发布成功',
                      type: 'success'
                    });
                    // this.$router.push({name: 'event-detail-reat', query: {eventId: eventId}});
                    // this.isTaskLoading = false;
                  } else {
                    this.$message.error('发布失败');
                  }
                })
                .catch(() => {});
            } else {
              this.$message.error('操作失败');
            }
          })
          .catch(() => {})
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
