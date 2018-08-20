<template>
  <div class='ctc-detail'>
    <div class='ctc-detail-header'>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>调度指挥</el-breadcrumb-item>
        <el-breadcrumb-item><span style='color: #0785FD'>方案制定</span></el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class='ctc-detail-body'>
      <div class='ctc-detail-basic'>
        <div class='ctc-detail-basic-header'>
          <div class='flag'></div>
          <p class='ctc-detail-basic-text'>基本信息</p>
          <p class='ctc-detail-number'>事件编号：{{eventDetailObj.eventCode}}</p>
        </div>
        <div class='ctc-detail-basic-detail'>
          <div class='ctc-detail-basic-list'>
            <div>
              <span class='title'>事件类型：</span>
              <span class='content'>{{eventDetailObj.eventTypeName}}</span>
            </div>
            <div>
              <span class='title'>事件等级：</span>
              <span class='content'>{{eventDetailObj.eventLevelName}}</span>
            </div>
            <div><span class='title'>报案时间：</span><span class='content'>{{eventDetailObj.reportTime}}</span></div>
          </div>
          <div class='ctc-detail-basic-list'>
            <div>
              <span class='title'>报案人：</span>
              <span class='content'>{{eventDetailObj.reporterPhone}}</span>
              <!-- <span style='color:#0785FD;font-weight:bold;text-decoration:underline'>1234567890</span> -->
            </div>
            <div><span class='title'>事发地点：</span><span class='content'>{{eventDetailObj.eventAddress}}</span></div>
          </div>
          <div class='ctc-detail-basic-list'>
            <div>
              <span class='title'>人员伤亡：</span>
              <template v-if='eventDetailObj.casualties == -1'>
                <span class='content'>不确定</span>
              </template>
              <template v-else-if='eventDetailObj.casualties == 0'>
                <span class='content'>无</span>
              </template>
              <template v-if='eventDetailObj.casualties > 0'>
                <span class='content'>{{eventDetailObj.casualties}}</span>
              </template>
            </div>
          </div>
          <div class='ctc-detail-basic-list'>
            <div style='width:100%'><span class='title'>事件情况：</span><span class='content'>{{eventDetailObj.eventDetail}}</span></div>
          </div>
          <div class='ctc-detail-basic-list ctc-detail-img-content'>
            <img
              v-for='item in eventDetailObj.attachmentList'
              :src='item.url'
              :key='item.attachmentId'
            />
          </div>
        </div>
      </div>
      <div class='ctc-detail-first' v-show='eventDetailObj.taskList && eventDetailObj.taskList.length === 0'>
        <div class='ctc-detail-first-header'>
          <div class='flag'></div>
          <p class='ctc-detail-first-text'>调度指挥方案</p>
        </div>
        <div class='ctc-detail-first-content'>
          <ul v-for="(item, index) in eventDetailObj.taskList" :key="'item'+index">
            <li>
              <span class='title'>调度部门：</span><span class='content'>{{item.departmentName}}</span>
            </li>
            <li>
              <span class='title'>任务名称：</span><span class='content'>{{item.taskName}}</span>
            </li>
            <li>
              <span class='title'>任务内容：</span><span class='content'>{{item.taskContent}}</span>
            </li>
            <li class='divide'></li>
          </ul>
          <ul>
            <li>
              <span class='title'>调度部门：</span><span class='content'>消防部</span>
            </li>
            <li>
              <span class='title'>任务名称：</span><span class='content'>灭火</span>
            </li>
            <li>
              <span class='title'>任务内容：</span><span class='content'>速去现场灭火</span>
            </li>
            <li class='divide'></li>
          </ul>
          <ul>
            <li>
              <span class='title'>调度部门：</span><span class='content'>消防部</span>
            </li>
            <li>
              <span class='title'>任务名称：</span><span class='content'>灭火</span>
            </li>
            <li>
              <span class='title'>任务内容：</span><span class='content'>速去现场灭火</span>
            </li>
            <li class='divide'></li>
          </ul>
        </div>
      </div>
      <div class='ctc-detail-bottom'>
        <div class='ctc-idea-left'>
          <div class='ctc-idea-header'>
            <div class='flag'></div>
            <template v-if="eventDetailObj.taskList && eventDetailObj.taskList.length > 1">
              <p class='ctc-idea-text'>再次调度指挥方案</p>
            </template>
            <template v-else>
              <p class='ctc-idea-text'>调度指挥方案</p>
            </template>
          </div>
          <div class='ctc-idea-body'>
            <el-form class='ctc-idea-form' :model='taskForm' ref='taskForm' :rules='rules'>
              <el-form-item label="执行部门" label-width='120px' prop='departmentId'>
                <el-select  placeholder="请选择执行部门" style='width: 80%' v-model='taskForm.departmentId'>
                  <el-option label="全部" value="shanghai"></el-option>
                  <el-option label="部分" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="任务名称" label-width='120px' prop='taskName'>
                <el-input type="text" placeholder='请输入任务名称' style='width: 80%' v-model='taskForm.taskName'></el-input>
              </el-form-item>
              <el-form-item label="任务内容" label-width='120px' prop='taskContent'>
                <el-input type="textarea" placeholder='请输入任务内容' rows='7' style='width: 80%' v-model='taskForm.taskContent'></el-input>
              </el-form-item>
              <el-form-item style='margin-left: 120px'>
                <div class='add-task' @click="addTask('taskForm')">
                  <i class="el-icon-plus" style='width: 36px;height:36px;color:#D8D8D8'></i>
                  <span class='add-img-text'>添加任务</span>
                </div>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div class='ctc-replan-right'>
          <div class='ctc-replan-header'>
            <div class='flag'></div>
            <p class='ctc-replan-text'>推荐预案</p>
          </div>
          <div class='ctc-replan-table'>
            <el-table
              style="width: 100%"
              :data='reservePlanList'
              highlight-current-row
              class='ctc-table'
               max-height="372"
            >
              <el-table-column label="预案名称" prop='planName' align='center' show-overflow-tooltip></el-table-column>
              <el-table-column label="预案类型" prop='planType' align='center'></el-table-column>
              <el-table-column label="适用等级" prop='levelList' align='center'></el-table-column>
              <el-table-column label="操作" align='center'>
                <template slot-scope="scope">
                  <el-button type='text' style='color: #0785FD' @click="selectReplanDetail">查看</el-button>
                  <el-button type='text' style='color: #0785FD' @click="skipEnableReplan(scope)">启用</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class='more-replan' @click='selectMorePlan'>更多预案</div>
          </div>
        </div>
      </div>
    </div>
    <div class='operation-btn-ctc-detail'>
      <el-button @click='back'>返回</el-button>
      <el-button style='background: #0785FD;color:#fff'>确定</el-button>
    </div>
  </div>
</template>
<script>
import {dictType} from '@/config/data.js';
export default {
  data () {
    return {
      eventDetailObj: {},
      reservePlanList: [{
        planName: '公共区域消防安全应急预案',
        planType: '事故灾难',
        levelList: 'IV'
      }, {
        planName: '公共区域消防安全应急预案',
        planType: '事故灾难',
        levelList: 'IV'
      }, {
        planName: '公共区域消防安全应急预案',
        planType: '事故灾难',
        levelList: 'IV'
      }, {
        planName: '公共区域消防安全应急预案',
        planType: '事故灾难',
        levelList: 'IV'
      }, {
        planName: '公共区域消防安全应急预案',
        planType: '事故灾难',
        levelList: 'IV'
      }, {
        planName: '公共区域消防安全应急预案',
        planType: '事故灾难',
        levelList: 'IV'
      }, {
        planName: '公共区域消防安全应急预案',
        planType: '事故灾难',
        levelList: 'IV'
      }, {
        planName: '公共区域消防安全应急预案',
        planType: '事故灾难',
        levelList: 'IV'
      }],
      rules: {
        departmentId: [
          { required: true, message: '请选择执行部门', trigger: 'blur' }
        ],
        taskName: [
          { required: true, message: '请填写任务名称', trigger: 'blur' },
          { max: 200, message: '最多可以输入200个字' }
        ],
        taskContent: [
          { required: true, message: '请填写任务内容', trigger: 'blur' },
          { max: 10000, message: '最多可以输入10000个字' }
        ]
      },
      taskForm: {
        eventId: '',
        departmentName: '',
        departmentId: '',
        taskName: '',
        taskContent: ''
      },
      taskList: [] // 要添加的任务列表
    }
  },
  mounted () {
    if (this.$route.params.eventId) {
      this.getEventDetail();
    } else if (this.$route.params.addForm) {
      this.getEventLevel();
      this.getEventType();
      this.eventDetailObj = this.$route.params.addForm;
    }
  },
  methods: {
    selectMorePlan () { // 查看更多预案
      this.$router.push({name: 'replan-list', params: {eventId: this.$route.params.eventId}});
    },
    back () {
      this.$router.back(-1);
    },
    getEventDetail () { // 获取事件详情
      const eventId = this.$route.params.eventId;
      if (eventId) {
        this.axios.get('A2/eventServices/events/' + eventId)
          .then((res) => {
            if (res && res.data) {
              this.eventDetailObj = res.data;
            }
          })
          .catch(() => {})
      }
    },
    selectReplanDetail () { // 查看预案
      this.$router.push({name: 'replan-detail'});
    },
    skipEnableReplan (scope) { // 启用预案
      this.$router.push({name: 'enable-replan', params: {eventId: this.$route.params.eventId, planId: scope.row.planId}});
    },
    getEventType () { // 获取事件类型
      this.axios.get('A2/dictServices/dicts/byDictTypeId/' + dictType.eventTypeId)
        .then((res) => {
          if (res && res.data) {
            res.data.map((item) => {
              if (item.dictId === this.$route.params.addForm.eventType) {
                this.$route.params.addForm.eventType = item.dictContent;
              }
            });
          }
        })
        .catch(() => {})
    },
    getEventLevel () { // 获取事件等级
      this.axios.get('A2/dictServices/dicts/byDictTypeId/' + dictType.eventLevelId)
        .then((res) => {
          if (res && res.data) {
            res.data.map((item) => {
              if (item.dictId === this.$route.params.addForm.eventLevel) {
                this.$route.params.addForm.eventLevel = item.dictContent;
              }
            });
          }
        })
        .catch(() => {})
    },
    addTask (form) { // 添加任务
      this.$refs[form].validate((valid) => {
        if (valid) {
        }
      });
    }
  }
}
</script>
<style lang='scss'>
  .ctc-detail {
    padding: 20px;
    height: 100%;
    .ctc-detail-header {
      margin-bottom: 10px;
    }
    .ctc-detail-body {
      width: 100%;
      .ctc-detail-basic, .ctc-detail-first{
        background: #fff;
        margin-bottom: 0.7%;
        .ctc-detail-basic-header, .ctc-detail-first-header {
          width: 100%;
          display: flex;
          p {
            margin-top: 25px;
          }
          .flag {
            height:20px;
            width:3px;
            position: relative;
            top: 25px;
            border-top-right-radius: 5px;
            border-bottom-right-radius: 5px;
            background: #0785FD;
          }
          .ctc-detail-basic-text, .ctc-detail-first-text {
            color: #0785FD;
            font-size: 16px;
            font-weight: bold;
            margin-left: 1%;
          }
          .ctc-detail-number {
            color: #555555;
            font-size: 14px;
            margin-left: 2%;
          }
        }
        .ctc-detail-basic-detail, .ctc-detail-first-content {
          width: 100%;
          display:flex;
          padding: 20px;
          flex-direction: column;
          .ctc-detail-basic-list {
            display: flex;
            flex-wrap: wrap;
            div {
              width:33.3%;
              line-height:27px;
              .title {
                color: #222222;
                font-size: 13px;
                width: 80px;
                display: inline-block;
                text-align: right;
              }
              .content {
                color: #777777;
                font-size: 14px;
                margin-left: 1%;
              }
            }
          }
          .ctc-detail-img-content {
            width: 100%;
            padding-left: 80px;
            img {
              width: 100px;
              height: 75px;
              margin-right: 1%;
              margin-top: 1%;
            }
          }
          ul {
            li {
              line-height: 27px;
              .title {
                color: #222222;
                font-size: 13px;
              }
              .content {
                color: #777777;
                font-size: 14px;
                margin-left:1%;
              }
            }
            .divide {
              height:1px;
              margin: 1% 0;
              background: #EAEAEA;
            }
          }
          & ul:last-child .divide {
            display: none;
          }
        }
      }
      .ctc-detail-bottom {
        width: 100%;
        display: flex;
        .ctc-idea-left {
          margin-right: 2%;
        }
        .ctc-idea-left, .ctc-replan-right {
          background: #fff;
          width: 49%;
          height: 50%;
          .ctc-idea-header, .ctc-replan-header {
            width: 100%;
            display: flex;
            p {
              margin-top: 25px;
            }
            .flag {
              height:20px;
              width:3px;
              position: relative;
              top: 25px;
              border-top-right-radius: 5px;
              border-bottom-right-radius: 5px;
              background: #0785FD;
            }
            .ctc-idea-text, .ctc-replan-text {
              color: #0785FD;
              font-size: 16px;
              font-weight: bold;
              margin-left: 1%;
            }
          }
          .ctc-idea-body {
            width: 100%;
            .ctc-idea-form {
              padding-top: 4%;
              .add-task {
                width: 100px;
                height: 100px;
                line-height: 100px;
                background-color: #EAEAEA;
                border: 1px solid #EAEAEA;
                position: relative;
                border-radius: 6px;
                box-sizing: border-box;
                display: inline-block;
                text-align: center;
                cursor: pointer;
                outline: 0;
                i {
                  font-size: 28px;
                  margin: 0 auto;
                  font-weight: bold;
                }
                .add-img-text {
                  color: #C4C2C2;
                  font-size: 13px;
                  display: block;
                  width: 54px;
                  height: 13px;
                  position: absolute;
                  top: 25%;
                  left: 25%;
                }
              }
            }
          }
          .ctc-replan-table {
            width: 100%;
            .el-table td {
              padding: 3px 0 !important;
            }
            .ctc-table {
              padding-top:20px;
            }
            .more-replan {
              color: #fff;
              background: #0785FD;
              width: 120px;
              height: 40px;
              margin: 3% auto;
              text-align: center;
              line-height: 40px;
              border-radius: 20px;
              cursor: pointer;
            }
          }
        }
      }
    }
    .operation-btn-ctc-detail {
      margin-top: 1%;
      margin-bottom: 1%;
    }
  }
</style>
