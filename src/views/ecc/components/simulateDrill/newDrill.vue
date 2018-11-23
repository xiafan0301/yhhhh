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
      eventDataInfo: null,
      taskList: [],
      ctcDataInfo: {},
      status: '',
      reservePlanList: []
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
        // this.ctcDataInfo = JSON.parse(this.$route.params.data);
      } else {
        this.currentText = '新建演练';
      }
    },
    // pageFromChild (data) {
    //   this.currentPage = data;
    // },
    // eventFromChild (data) { // 接收来自子组件的值
    //   this.currentPage = data.currentPage;
    //   this.eventDataInfo = JSON.parse(JSON.stringify(data.emiEvent));
    //   this.ctcDataInfo = JSON.parse(JSON.stringify(data.emiEvent));
    //   this.reservePlanList = data.replanList;
    // },
    // ctcFromChild (data) {
    //   this.taskList = data.taskList;
    //   if (this.status === 'modify') {
    //     this.modifyDataInfo();
    //   } else {
    //     this.addDataInfo();
    //   }
    // },
    // getReplanList () { // 获取预案列表
    //   console.log(this.$route.query.eventType)
    //   const params = {
    //     pageNum: -1,
    //     'where.planType': this.eventDataInfo.eventType
    //   }
    //   this.axios.get('A2/planServices/plans', {params})
    //     .then((res) => {
    //       if (res && res.data.list) {
    //         this.reservePlanList = res.data.list;
    //       }
    //     })
    //     .catch(() => {});
    // },
    addDataInfo () { // 新增演练事件
      const params = {...this.eventDataInfo, taskList: [...this.taskList]};
      console.log('params', params)
      if (params) {
        this.axios.post('A2/eventServices/simulateEvent', params)
          .then(res => {
            if (res) {
              this.$message({
                message: '发布成功',
                type: 'success'
              });
              this.axios.get('A2/eventServices/events/' + res.data)
                .then(resp => {
                  if (resp) {
                    if (resp.data.eventStatusName === '未处理') {
                      this.$router.push({name: 'unreated-drill', query: {eventId: res.data}});
                    } else {
                      this.$router.push({name: 'drill-detail-reat', query: {eventId: res.data}});
                    }
                  }
                })
                .catch(() => {})
              // if (res.data.eventStatusName === '未处理') {
              //   this.$router.push({name: 'unreated-drill', query: {eventId: res.data}});
              // } else {
              //   this.$router.push({name: 'drill-detail-reat', query: {eventId: res.data}});
              // }
            } else {
              this.$message.error('发布失败');
            }
          })
          .catch(() => {});
      }
      // if (this.eventDataInfo) {
      //   this.axios.post('A2/eventServices/simulateEvent', this.eventDataInfo) // 添加事件
      //     .then((res) => {
      //       if (res) {
      //         this.axios.post('A2/taskServices/task/' + res.data, this.taskList) // 调度任务
      //           .then((response) => {
      //             if (response) {
      //               this.currentPage = data.currentPage;
      //               this.axios.get('A2/eventServices/events/' + res.data)
      //                 .then(resp => {
      //                   if (resp) {
      //                     if (resp.data.eventStatusName === '未处理') {
      //                       this.$router.push({name: 'unreated-drill', query: {eventId: res.data}});
      //                     } else {
      //                       this.$router.push({name: 'drill-detail-reat', query: {eventId: res.data}});
      //                     }
      //                   }
      //                 })
      //                 .catch(() => {})
      //               this.$message({
      //                 message: '发布成功',
      //                 type: 'success'
      //               });
      //             } else {
      //               this.$message.error('发布失败');
      //             }
      //           })
      //           .catch(() => {});
      //       } else {
      //         this.$message.error('操作失败');
      //       }
      //     })
      //     .catch(() => {})
      // }
    },
    modifyDataInfo () { // 修改演练事件
      const params = {...this.eventDataInfo, taskList: [...this.taskList]};
      console.log('params', params)
      if (params) {
        this.axios.put('A2/eventServices/simulateEvent/' + this.$route.query.eventId, params)
          .then(res => {
            if (res) {
              this.$message({
                message: '修改成功',
                type: 'success'
              });
              this.axios.get('A2/eventServices/events/' + this.$route.query.eventId)
                .then(resp => {
                  if (resp) {
                    if (resp.data.eventStatusName === '未处理') {
                      this.$router.push({name: 'unreated-drill', query: {eventId: this.$route.query.eventId}});
                    } else {
                      this.$router.push({name: 'drill-detail-reat', query: {eventId: this.$route.query.eventId}});
                    }
                  }
                })
                .catch(() => {})
              // if (res.data.eventStatusName === '未处理') {
              //   this.$router.push({name: 'unreated-drill', query: {eventId: this.$route.query.eventId}});
              // } else {
              //   this.$router.push({name: 'drill-detail-reat', query: {eventId: this.$route.query.eventId}});
              // }
            } else {
              this.$message.error('修改失败');
            }
          })
          .catch(() => {});
      }
      // if (this.eventDataInfo) {
      //   this.axios.put('A2/eventServices/events/' + this.$route.query.eventId, this.eventDataInfo) // 修改事件
      //     .then((res) => {
      //       if (res) {
      //         this.axios.post('A2/taskServices/task/' + this.$route.query.eventId, this.taskList) // 调度任务
      //           .then((response) => {
      //             if (response) {
      //               this.currentPage = data.currentPage;
      //               this.axios.get('A2/eventServices/events/' + this.$route.query.eventId)
      //                 .then(resp => {
      //                   if (resp) {
      //                     if (resp.data.eventStatusName === '未处理') {
      //                       this.$router.push({name: 'unreated-drill', query: {eventId: this.$route.query.eventId}});
      //                     } else {
      //                       this.$router.push({name: 'drill-detail-reat', query: {eventId: this.$route.query.eventId}});
      //                     }
      //                   }
      //                 })
      //                 .catch(() => {})
      //               this.$message({
      //                 message: '修改成功',
      //                 type: 'success'
      //               });
      //             } else {
      //               this.$message.error('修改失败');
      //             }
      //           })
      //           .catch(() => {});
      //       } else {
      //         this.$message.error('操作失败');
      //       }
      //     })
      //     .catch(() => {})
      // }
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
