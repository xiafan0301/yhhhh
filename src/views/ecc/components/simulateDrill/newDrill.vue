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
        <div class="step-box" :class="[currentPage === '1' ? 'active-step' : '']">1.设置事件</div>
        <div class="step-box" :class="[currentPage === '2' ? 'active-step' : '']">2.制定方案</div>
        <div class="step-box" :class="[currentPage === '3' ? 'active-step' : '']">3.确定发布</div>
      </div>
      <div is="addEvent" v-show="currentPage === '1'" @eventData="eventFromChild" @reservePlan="reservePlanFromChild" :addEventForm="dataInfo" :status="status"></div>
      <div is="addCtcPlan" v-show="currentPage === '2'" @ctcData="ctcFromChild" @ctcPage="pageFromChild" :ctcPlanData="dataInfo" :status="status" :reservePlanList="reservePlanList && reservePlanList"></div>
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
      currentPage: '1',
      eventDataInfo: null,
      taskList: [],
      dataInfo: {},
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
        const eventId = this.$route.query.eventId;
        if (eventId) {
          this.axios.get('A2/eventServices/events/' + eventId)
            .then((res) => {
              if (res) {
                this.dataInfo = res.data;
              }
            })
            .catch(() => {})
        }
      } else {
        this.currentText = '新建演练';
      }
    },
    pageFromChild (data) {
      this.currentPage = data;
    },
    eventFromChild (data) { // 接收来自子组件的值
      this.currentPage = data.currentPage;
      this.eventDataInfo = data.emiEvent;
      console.log('eventDataInfo', this.eventDataInfo)
    },
    reservePlanFromChild (data) {
      this.reservePlanList = data;
      console.log('reservePlanList', this.reservePlanList);
    },
    ctcFromChild (data) {
      this.taskList = data.taskList;
      if (this.status === 'modify') {
        this.modifyDataInfo(data);
      } else {
        this.addDataInfo(data);
      }
    },
    getReplanList () { // 获取预案列表
      console.log(this.$route.query.eventType)
      const params = {
        pageNum: -1,
        'where.planType': this.eventDataInfo.eventType
      }
      this.axios.get('A2/planServices/plans', {params})
        .then((res) => {
          if (res && res.data.list) {
            this.reservePlanList = res.data.list;
          }
        })
        .catch(() => {});
    },
    addDataInfo (data) {
      if (this.eventDataInfo) {
        this.axios.post('A2/eventServices/event', this.eventDataInfo) // 添加/修改事件
          .then((res) => {
            if (res) {
              this.axios.post('A2/taskServices/task/' + res.data, this.taskList) // 调度任务
                .then((response) => {
                  if (response) {
                    this.currentPage = data.currentPage;
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
                    this.$message({
                      message: '发布成功',
                      type: 'success'
                    });
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
    },
    modifyDataInfo (data) {
      if (this.eventDataInfo) {
        this.axios.put('A2/eventServices/events/' + this.$route.query.eventId, this.eventDataInfo) // 修改事件
          .then((res) => {
            if (res) {
              this.axios.post('A2/taskServices/task/' + this.$route.query.eventId, this.taskList) // 调度任务
                .then((response) => {
                  if (response) {
                    this.currentPage = data.currentPage;
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
                    this.$message({
                      message: '修改成功',
                      type: 'success'
                    });
                  } else {
                    this.$message.error('修改失败');
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
