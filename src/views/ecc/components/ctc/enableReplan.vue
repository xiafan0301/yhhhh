<template>
  <div class='enable-replan'>
    <div class='enable-replan-header'>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>调度指挥</el-breadcrumb-item>
        <el-breadcrumb-item><span style='color: #0785FD'>事件处理</span></el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class='enable-replan-detail-body'>
      <div class='enable-replan-detail-basic'>
        <div class='enable-replan-detail-basic-header'>
          <div class='flag'></div>
          <p class='enable-replan-detail-basic-text'>基本信息</p>
          <p class='enable-replan-detail-number'>事件编号：{{eventDetailObj.eventCode}}</p>
        </div>
        <div class='enable-replan-detail-basic-detail'>
          <div class='enable-replan-detail-basic-list'>
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
          <div class='enable-replan-detail-basic-list'>
            <div>
              <span class='title'>报案人：</span>
              <span class='content'>{{eventDetailObj.reporterPhone}}</span>
            </div>
            <div><span class='title'>事发地点：</span><span class='content'>{{eventDetailObj.eventAddress}}</span></div>
          </div>
          <div class='enable-replan-detail-basic-list'>
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
          <div class='enable-replan-detail-basic-list'>
            <div style='width:100%'><span class='title'>事件情况：</span><span class='content'>{{eventDetailObj.eventDetail}}</span></div>
          </div>
          <div class='enable-replan-detail-basic-list enable-replan-detail-img-content'>
            <img
              v-for='item in eventDetailObj.attachmentList'
              :src='item.url'
              :key='item.attachmentId'
            />
          </div>
        </div>
      </div>
      <div class='enable-replan-detail-bottom'>
        <div class='enable-replan-idea-left'>
          <div class='enable-replan-idea-header'>
            <div class='flag'></div>
            <p class='enable-replan-idea-text'>调度指挥方案</p>
          </div>
          <template v-if='taskList && taskList.length === 0'>
            <div class='enable-replan-list' v-for="(item, index) in taskList" :key="'item'+index">
              <div class='enable-replan-list-detail'>
                <div class='enable-replan-list-num'>任务{{index + 1}}</div>
                <div class='enable-replan-list-body'>
                  <p>执行部门： {{item.departmentName}}</p>
                  <p>任务名称：{{item.taskName}}</p>
                  <p>任务内容： {{item.taskContent}}</p>
                </div>
                <div class='enable-operation'>
                  <span @click='modifyDepartment(item.taskId)'>修改</span>
                  /
                  <span class='deleteDepartment(item.taskId)'>删除</span>
                </div>
              </div>
              <div class='modify-enable-form'>
                <el-form class='enable-replan-idea-form'>
                  <el-form-item label="执行部门" label-width='80px'>
                    <el-select  placeholder="请选择执行部门" style='width: 490px'>
                      <el-option label="全部" value="shanghai"></el-option>
                      <el-option label="部分" value="beijing"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="任务名称" label-width='80px'>
                    <el-input type="text" placeholder='请输入任务名称' style='width: 490px'></el-input>
                  </el-form-item>
                  <el-form-item label="任务内容" label-width='80px'>
                    <el-input type="textarea" placeholder='请输入任务内容' rows='7' style='width: 490px'></el-input>
                  </el-form-item>
                  <el-form-item label-width='80px'>
                    <el-button style='background: #0785FD;color:#fff'>确定</el-button>
                    <el-button>取消</el-button>
                  </el-form-item>
                </el-form>
              </div>
            </div>
            <div class='enable-replan-list'>
              <div class='enable-replan-list-detail'>
                <div class='enable-replan-list-num'>任务一</div>
                <div class='enable-replan-list-body'>
                  <p>执行部门： 消防部</p>
                  <p>任务名称：紧急火灾</p>
                  <p>任务内容： 执行部门：消防部任务名称：紧急火灾任务内容：请芙蓉南路消防部组织好队伍，迅速前往XX进行灭火！</p>
                </div>
                <div class='enable-operation'>
                  <span>修改</span>
                  /
                  <span>删除</span>
                </div>
              </div>
            </div>
            <div class='enable-replan-list'>
              <div class='enable-replan-list-detail'>
                <div class='enable-replan-list-num'>任务一</div>
                <div class='enable-replan-list-body'>
                  <p>执行部门： 消防部</p>
                  <p>任务名称：紧急火灾</p>
                  <p>任务内容： 执行部门：消防部任务名称：紧急火灾任务内容：请芙蓉南路消防部组织好队伍，迅速前往XX进行灭火！</p>
                </div>
                <div class='enable-operation'>
                  <span>修改</span>
                  /
                  <span>删除</span>
                </div>
              </div>
            </div>
            <div class='divide'></div>
          </template>
          <div class='enable-replan-idea-body'>
            <el-form class='enable-replan-idea-form' :model='taskForm' ref='taskForm' :rules='rules'>
              <el-form-item label="执行部门" label-width='120px' prop='departmentId'>
                <el-select  placeholder="请选择执行部门" style='width: 500px' v-model='taskForm.departmentId'>
                  <el-option label="全部" value="shanghai"></el-option>
                  <el-option label="部分" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="任务名称" label-width='120px' prop='taskName'>
                <el-input type="text" placeholder='请输入任务名称' style='width: 500px' v-model='taskForm.taskName'></el-input>
              </el-form-item>
              <el-form-item label="任务内容" label-width='120px' prop='taskContent'>
                <el-input type="textarea" placeholder='请输入任务内容' rows='7' style='width: 500px' v-model='taskForm.taskContent'></el-input>
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
      </div>
    </div>
    <div class='operation-btn-enable-replan-detail'>
      <el-button @click='back'>返回</el-button>
      <el-button style='background: #0785FD;color:#fff' @click='open'>确定</el-button>
    </div>
  </div>
</template>
<script>
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
      taskList: [], // 预案详情中的任务列表
      taskForm: {
        eventId: '',
        departmentName: '',
        departmentId: '',
        taskName: '',
        taskContent: ''
      },
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
      }
    }
  },
  mounted () {
    this.getEventDetail();
    this.getReplanDetail();
  },
  methods: {
    selectMorePlan () { // 查看更多预案
      this.$router.push({name: 'replan-list'});
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
    getReplanDetail () { // 获取预案详情
      const planId = this.$route.params.planId;
      if (planId) {
        this.axios.get('A2/planServices/plans/' + planId, planId)
          .then((res) => {
            if (res) {
              this.taskList = res.data.taskList;
            }
          })
          .catch(() => {})
      }
    },
    selectReplanDetail () { // 查看预案详情
      this.$router.push({name: 'replan-detail'});
    },
    modifyDepartment (id) { // 修改部门信息

    },
    deleteDepartment (id) { // 删除部门信息
      if (id) {
        this.taskList.map((item, index) => {
          if (item.taskId === id) {
            this.taskList.splice(index, 1);
          }
        });
      }
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
  .enable-replan {
    padding: 20px;
    height: 100%;
    .enable-replan-header {
      margin-bottom: 10px;
    }
    .enable-replan-detail-body {
      width: 100%;
      .enable-replan-detail-basic {
        background: #fff;
        margin-bottom: 0.7%;
        .enable-replan-detail-basic-header {
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
          .enable-replan-detail-basic-text {
            color: #0785FD;
            font-size: 16px;
            font-weight: bold;
            margin-left: 1%;
          }
          .enable-replan-detail-number {
            color: #555555;
            font-size: 14px;
            margin-left: 2%;
          }
        }
        .enable-replan-detail-basic-detail {
          width: 100%;
          display:flex;
          padding: 20px;
          flex-direction: column;
          .enable-replan-detail-basic-list {
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
          .enable-replan-detail-img-content {
            width: 100%;
            padding-left: 80px;
            img {
              width: 100px;
              height: 75px;
              margin-right: 1%;
              margin-top: 1%;
            }
          }
        }
      }
      .enable-replan-detail-bottom {
        width: 100%;
        display: flex;
        .enable-replan-idea-left{
          background: #fff;
          width: 100%;
          height: 50%;
          .divide {
            width: 570px;
            height:1px;
            margin: 2% 0 2% 55px;
            background: #EAEAEA;
          }
          .enable-replan-list {
            width: 100%;
            padding-top: 2%;
            font-size: 14px;
            margin-bottom: -1%;
            .enable-replan-list-detail {
              display: flex;
              width: 580px;
              margin-left: 50px;
              padding: 1% 1%;
              position: relative;
              .enable-replan-list-num {
                width: 70px;
                color: #999999;
              }
              .enable-replan-list-body {
                width: 500px;
                color: #555555;
                p {
                  margin-bottom: 2%;
                }
              }
              .enable-operation {
                color: #0785FD;
                font-size: 14px;
                position: absolute;
                right: 10px;
                display: none;
                span {
                  cursor: pointer;
                }
              }
              &:hover {
                border: 1px solid #0785FD;
                .enable-operation {
                  display: block;
                }
              }
            }
            .modify-enable-form {
              display: none;
              width: 580px;
              margin-left: 50px;
              padding-top: 1%;
              border: 1px solid #0785FD;
            }
          }
          .enable-replan-idea-header{
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
            .enable-replan-idea-text{
              color: #0785FD;
              font-size: 16px;
              font-weight: bold;
              margin-left: 1%;
            }
          }
          .enable-replan-idea-body {
            width: 100%;
            .enable-replan-idea-form {
              padding-top: 1%;
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
        }
      }
    }
    .operation-btn-enable-replan-detail {
      margin-top: 1%;
      margin-bottom: 1%;
    }
  }
</style>
