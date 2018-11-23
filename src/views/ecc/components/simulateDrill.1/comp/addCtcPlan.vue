<template>
  <div class="add-ctc-plan">
    <div class='ctc-detail-body'>
      <!-- <div class='ctc-detail-first' v-show='eventDetailObj.taskList && eventDetailObj.taskList.length > 0'>
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
            <li v-show='eventDetailObj.taskList && eventDetailObj.taskList.length > 0' class='divide'></li>
          </ul>
        </div>
      </div> -->
      <div class='ctc-detail-bottom'>
        <div class='ctc-idea-left'>
          <div class='ctc-idea-header'>
            <div class='flag'></div>
            <!-- <template v-if="eventDetailObj.taskList && eventDetailObj.taskList.length > 0">
              <p class='ctc-idea-text'>再次调度指挥方案</p>
            </template>
            <template v-else> -->
              <p class='ctc-idea-text'>调度指挥方案</p>
            <!-- </template> -->
          </div>
          <div class='ctc-idea-body'>
            <div class='ctc-idea-body-list' v-for='(item, index) in taskList' :key="'item'+index">
              <div class='ctc-idea-body-list-detail'>
                <div class='ctc-idea-body-list-num'>任务{{index + 1}}</div>
                <div class='ctc-idea-body-list-body'>
                  <p>执行部门： {{item.departmentName}}</p>
                  <p>任务名称：{{item.taskName}}</p>
                  <p>任务内容： {{item.taskContent}}</p>
                </div>
                <div class='ctc-idea-body-operation'>
                  <span @click='modifyTask(index, item.taskContent)'>修改</span>
                  /
                  <span @click='deleteTask(index)'>删除</span>
                </div>
              </div>
            </div>
            <div v-show='taskList.length > 0' class='ctc-idea-body-divide'></div>
            <div class='ctc-idea-form'>
              <el-form class='ctc-idea-form-add' :model='taskForm' ref='taskForm' :rules='rules' :class="[taskList.length > 0 ? 'active' : '']">
                <el-form-item label="执行部门" label-width='80px' prop='departmentId'>
                  <el-select @change='changeDepartment' placeholder="请选择执行部门" style='width: 80%' v-model='taskForm.departmentId'>
                    <el-option
                      v-for="item in departmentList"
                      :key="item.uid"
                      :label="item.organName"
                      :value="item.uid"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="任务名称" label-width='80px' prop='taskName'>
                  <el-input type="text" placeholder='请输入任务名称' style='width: 80%' v-model='taskForm.taskName'></el-input>
                </el-form-item>
                <el-form-item label="任务内容" label-width='80px' prop='taskContent' class="task-content">
                  <el-input type="textarea" placeholder='请输入任务内容' rows='7' style='width: 80%' v-model='taskForm.taskContent' @input="calNumber(taskForm.taskContent)"></el-input>
                  <span class="number-tip">{{currentNum}}/{{totalNum}}</span>
                </el-form-item>
                <el-form-item label="" label-width='80px' v-show='taskList.length > 0'>
                  <el-button style='background: #0785FD;color:#fff;width:80px' @click="saveForm('taskForm')">保存</el-button>
                  <el-button style='width:80px' @click="cancelForm('taskForm')">取消</el-button>
                </el-form-item>
              </el-form>
            </div>
            <div class='add-task' @click="addTask('taskForm')">
              <i class="el-icon-plus" style='width: 36px;height:36px;color:#D8D8D8'></i>
              <span class='add-img-text'>添加任务</span>
            </div>
          </div>
        </div>
        <div class='ctc-replan-right'>
          <div class='ctc-replan-header'>
            <div class='flag'></div>
            <p class='ctc-replan-text'>推荐预案</p>
          </div>
          <div class='more-replan' @click='selectMorePlan'>更多预案</div>
          <div class='ctc-replan-table'>
            <el-table
              style="width: 100%"
              :data='reservePlanList'
              highlight-current-row
              class='ctc-table'
              max-height="352"
            >
              <el-table-column fixed label="预案名称" prop='planName' align='center' show-overflow-tooltip></el-table-column>
              <el-table-column fixed label="预案类型" prop='eventTypeName' align='center'></el-table-column>
              <el-table-column fixed label="适用等级" prop='levelNameList' align='center' show-overflow-tooltip>
                <template slot-scope="scope">
                  <span>{{scope.row.levelNameList.join('、')}}</span>
                </template>
              </el-table-column>
              <el-table-column fixed label="操作" align='center'>
                <template slot-scope="scope">
                  <i class="icon-chakan- icon-hover" @click="selectReplanDetail(scope)" title="查看"></i>
                  <i class="icon-qiyong- icon-hover" @click="skipEnableReplan(scope)" title="启用"></i>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
    <div class='operation-btn'>
      <el-button @click="preStep">上一步</el-button>
      <el-button style='background: #0785FD;color:#fff' @click="submitData('taskForm')">确定发布</el-button>
    </div>
    <el-dialog title="修改任务" :visible.sync="dialogFormVisible" center width='600px' class="update-task">
      <el-form class='ctc-idea-body-list-form' :model='modifyTaskForm' ref="modifyTaskForm" :rules='rules'>
        <el-form-item label="执行部门" label-width='80px' prop='departmentId'>
          <el-select @change='changeModifyDepartment' placeholder="请选择执行部门" style='width: 98%' v-model='modifyTaskForm.departmentId'>
            <el-option
              v-for="item in departmentList"
              :key="item.uid"
              :label="item.organName"
              :value="item.uid"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="任务名称" label-width='80px' prop='taskName'>
          <el-input type="text" placeholder='请输入任务名称' style='width: 98%' v-model='modifyTaskForm.taskName'></el-input>
        </el-form-item>
        <el-form-item label="任务内容" label-width='80px' prop='taskContent' class="task-content">
          <el-input type="textarea" placeholder='请输入任务内容' rows='7' style='width: 98%' v-model='modifyTaskForm.taskContent' @input="calUpdateNumber(modifyTaskForm.taskContent)"></el-input>
          <span class="number-tip">{{updatecurrentNum}}/{{totalNum}}</span>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="sureCancelModify('modifyTaskForm')">取 消</el-button>
        <el-button type="primary" @click="sureModifyTask('modifyTaskForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: ['status', 'ctcPlanData', 'reservePlanList'],
  data () {
    return {
      skipPage: '1', // 点击上一步
      currentNum: 0, // 事件情况当前字数
      updatecurrentNum: 0,
      totalNum: 1000, // 可输入的总字数
      modifyIndex: '', // 要修改的任务索引
      isTaskLoading: false, // 调度指挥加载中
      dialogFormVisible: false, // 是否显示要修改的表单
      taskForm: {
        departmentName: '',
        departmentId: '',
        taskName: '',
        taskContent: ''
      },
      modifyTaskForm: {
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
          { max: 50, message: '最多可以输入50个字' }
        ],
        taskContent: [
          { required: true, message: '请填写任务内容', trigger: 'blur' },
          { max: 1000, message: '最多可以输入1000个字' }
        ]
      },
      eventTypeId: null, // 事件类型
      taskList: [], // 要添加的任务列表
      departmentList: [] // 部门列表
      // reservePlan: []
    }
  },
  created () {
    this.timer = setTimeout(() => {
      this.getDataInfo();
    }, 1000)
  },
  mounted () {
    this.getDepartmentList();
  },
  destroyed () {
    clearTimeout(this.timer);
  },
  methods: {
    getDataInfo () {
      if (this.status === 'modify') {
        this.taskList = JSON.parse(JSON.stringify(this.ctcPlanData.taskList));
      }
    },
    calNumber (val) { // 计算事件情况字数
      if (val.length > this.totalNum) {
        return;
      }
      this.currentNum = val.length;
    },
    calUpdateNumber (val) { // 计算事件情况字数
      if (val.length > this.totalNum) {
        return;
      }
      this.updatecurrentNum = val.length;
    },
    preStep () { // 上一步
      this.$emit('ctcPage', this.skipPage);
    },
    submitData (form) { // 新建演练
      let taskList = [];
      if (this.taskList.length > 0) {
        const data = {
          currentPage: '3',
          taskList: this.taskList
        }
        this.$emit('ctcData', data);
      } else {
        this.$refs[form].validate((valid) => {
          if (valid) {
            taskList.push(this.taskForm);
            const data = {
              currentPage: '3',
              taskList: taskList
            }
            this.$emit('ctcData', data);
          }
        })
      }
    },
    cancelForm (form) { // 取消填写的form
      this.$refs[form].resetFields();
    },
    saveForm (form) { // 保存填写的form
      this.$refs[form].validate((valid) => {
        if (valid) {
          const task = JSON.parse(JSON.stringify(this.taskForm));
          this.taskList.push(task);
          this.$refs[form].resetFields();
          this.currentNum = 0;
        }
      });
    },
    addTask (form) { // 添加任务
      this.$refs[form].validate((valid) => {
        if (valid) {
          const task = JSON.parse(JSON.stringify(this.taskForm));
          this.taskList.push(task);
          this.$refs[form].resetFields();
          this.currentNum = 0;
        }
      });
    },
    changeDepartment (value) {
      this.departmentList.map((item) => {
        if (item.uid === value) {
          this.taskForm.departmentName = item.organName;
        }
      });
    },
    selectMorePlan () { // 查看更多预案
      this.$router.push({name: 'drill-replan-list', query: {eventId: this.$route.query.eventId}});
    },
    selectReplanDetail (scope) { // 查看预案
      this.$router.push({name: 'drill-replan-detail', query: {eventId: this.$route.query.eventId, planId: scope.row.planId}});
    },
    skipEnableReplan (scope) { // 启用预案
      console.log('111111')
      console.log('ctcPlanData', this.ctcPlanData)
      if (this.ctcPlanData) {
        let params;
        if (this.status === 'modify') {
          params = {
            eventForm: {...this.ctcPlanData}
          };
        } else {
          params = {
            eventForm: {...this.ctcPlanData},
            taskList: [...this.taskList]
          };
        }
        this.$router.push({name: 'drill-enable-replan', params: {data: JSON.stringify(params)}, query: {eventId: this.$route.query.eventId, status: this.status === 'modify' ? 'over' : '', planId: scope.row.planId}});
      }
    },
    getReplanList () { // 获取预案列表
      // const type = this.ctcPlanData.eventType;
      if (this.eventTypeId) {
        const params = {
          pageNum: -1,
          'where.planType': this.eventTypeId
        }
        this.axios.get('A2/planServices/plans', {params})
          .then((res) => {
            if (res && res.data.list) {
              this.reservePlanList = res.data.list;
            }
          })
          .catch(() => {});
      }
    },
    getDepartmentList () { // 获取部门列表
      const params = {
        pageSize: 0
      }
      this.axios.get('A3/authServices/organInfos', {params})
        .then((res) => {
          if (res && res.data) {
            this.departmentList = res.data.list;
          }
        })
        .catch(() => {})
    },
    sureCancelModify (form) { // 取消修改任务
      this.$refs[form].resetFields();
      this.dialogFormVisible = false;
    },
    sureModifyTask (form) { // 修改任务
      this.$refs[form].validate((valid) => {
        if (valid) {
          if (this.modifyIndex !== '') {
            const index = this.modifyIndex;
            this.taskList[index].departmentId = this.modifyTaskForm.departmentId;
            this.taskList[index].departmentName = this.modifyTaskForm.departmentName;
            this.taskList[index].taskName = this.modifyTaskForm.taskName;
            this.taskList[index].taskContent = this.modifyTaskForm.taskContent;
            this.dialogFormVisible = false;
          }
        }
      });
    },
    deleteTask (index) { // 删除任务
      this.taskList.splice(index, 1);
    },
    modifyTask (index, content) { // 修改任务
      this.dialogFormVisible = true;
      this.modifyIndex = index;
      this.modifyTaskForm.departmentId = this.taskList[index].departmentId;
      this.modifyTaskForm.departmentName = this.taskList[index].departmentName;
      this.modifyTaskForm.taskName = this.taskList[index].taskName;
      this.modifyTaskForm.taskContent = this.taskList[index].taskContent;
      this.updatecurrentNum = content.length;
    },
    changeModifyDepartment (value) {
      this.departmentList.map((item) => {
        if (item.uid === value) {
          this.modifyTaskForm.departmentName = item.organName;
        }
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.add-ctc-plan {
  margin-top: 20px;
  position: relative;
  .ctc-detail-body {
    width: 100%;
    .ctc-detail-first{
      background: #fff;
      margin-bottom: 0.7%;
      .ctc-detail-first-header {
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
        .ctc-detail-first-text {
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
      .ctc-detail-first-content {
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
        .more-replan {
          color: #0785FD;
          border: 1px solid #0785FD;
          width: 80px;
          height: 30px;
          float: right;
          // margin: 3% auto;
          text-align: center;
          line-height: 30px;
          border-radius: 5px;
          cursor: pointer;
          margin-top: -20px;
        }
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
            width: 90%;
            margin-top: 2%;
            margin-left: 25px;
            .ctc-idea-form-add {
              padding-top: 2%;
              border: 1px solid transparent;
              .task-content {
                position: relative;
                .number-tip {
                  position: absolute;
                  bottom: 0;
                  right: 22%;
                  color: #999999;
                  font-size: 13px;
                }
              }
            }
            .active {
              &:hover {
                border: 1px solid #0785FD;
              }
            }
          }
          .add-task {
            width: 100px;
            height: 100px;
            line-height: 100px;
            background-color: #EAEAEA;
            border: 1px solid #EAEAEA;
            position: relative;
            margin: 1% 0 2% 105px;
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
          .ctc-idea-body-list {
            width: 90%;
            padding-top: 2%;
            font-size: 14px;
            margin-bottom: -1%;
            margin-left: 25px;
            .ctc-idea-body-list-detail {
              display: flex;
              width: 100%;
              padding: 1% 1%;
              border: 1px solid transparent;
              position: relative;
              .ctc-idea-body-list-num {
                width: 70px;
                color: #999999;
              }
              .ctc-idea-body-list-body {
                width: 500px;
                color: #555555;
                p {
                  margin-bottom: 2%;
                }
              }
              .ctc-idea-body-operation {
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
                .ctc-idea-body-operation {
                  display: block;
                }
              }
            }
          }
          .ctc-idea-body-divide {
            width: 90%;
            height:1px;
            margin: 2% 0 2% 25px;
            background: #EAEAEA;
          }
        }
        .ctc-replan-table {
          width: 100%;
          margin-top: 20px;
          .el-table td {
            padding: 3px 0 !important;
          }
          // .ctc-table {
          //   padding-top:20px;
          // }
          /deep/ .el-table thead th {
            background-color: #FAFAFA !important;
          }
          /deep/ .hover-row>td {
            background-color: #E6F7FF !important;
          }
        }
      }
    }
  }
  .update-task {
    /deep/ .el-dialog__header {
      background: #F0F0F0 !important;
      text-align: left !important;
      font-weight: bold;
      color: #555555;
      font-size: 16px;
    }
    /deep/ .el-dialog__footer {
      padding: 0 20px 20px !important;
    }
    /deep/  .el-dialog--center .el-dialog__body {
      padding: 10px 25px 0 !important;
    }
    .task-content {
      position: relative;
      .number-tip {
        position: absolute;
        bottom: 0;
        left: 400px;
        color: #999999;
        font-size: 13px;
      }
    }
  }
  .operation-btn {
    width: 100%;
    position: absolute;
    left: -20px;
    bottom: -120px;
    padding-bottom: 20px;
    // background: red;
    background: rgb(240, 243, 244);
  }
  .icon-hover {
    font-size: 30px;
    color: #BBBBBB;
  }
  .icon-hover:hover {
    color: #0785FD;
  }
}
</style>
