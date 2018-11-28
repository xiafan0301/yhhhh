<template>
  <div class='drill-enable-replan'>
    <div class='enable-replan-header'>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>模拟演练</el-breadcrumb-item>
        <el-breadcrumb-item>预案演练</el-breadcrumb-item>
        <el-breadcrumb-item><span style='color: #0785FD'>启用预案</span></el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class='enable-replan-detail-body'>
      <div class='enable-replan-detail-basic'>
        <div class='enable-replan-detail-basic-header'>
          <div class='flag'></div>
          <p class='enable-replan-detail-basic-text'>基本信息</p>
          <!-- <p class='enable-replan-detail-number'>事件编号：{{drillDetailObj.eventCode}}</p> -->
        </div>
        <div class='enable-replan-detail-basic-detail'>
          <div class='enable-replan-detail-basic-list'>
            <div>
              <span class='title'>演练项目名称：</span>
              <span class='content'>{{drillDetailObj.eventCode}}</span>
            </div>
            <div>
              <span class='title'>事件类型：</span>
              <span class='content'>{{drillDetailObj.eventTypeName}}</span>
            </div>
            <div>
              <span class='title'>事件等级：</span>
              <span class='content'>{{drillDetailObj.eventLevelName}}</span>
            </div>
          </div>
          <div class='enable-replan-detail-basic-list'>
            <div>
              <span class='title'>报案人：</span>
              <span class='content'>{{drillDetailObj.reporterPhone}}</span>
            </div>
            <div style='width: 50%'><span class='title'>事发地点：</span><span class='content'>{{drillDetailObj.eventAddress}}</span></div>
          </div>
          <div class='enable-replan-detail-basic-list'>
            <div>
              <span class='title'>人员伤亡：</span>
              <template v-if='drillDetailObj.casualties == -1'>
                <span class='content'>不确定</span>
              </template>
              <template v-else-if='drillDetailObj.casualties == 0'>
                <span class='content'>无</span>
              </template>
              <template v-if='drillDetailObj.casualties > 0'>
                <span class='content'>{{drillDetailObj.casualties}}</span>
              </template>
            </div>
            <div>
              <span class='title'>演练时长：</span>
              <span class='content'>{{drillDetailObj.duration}}</span>
            </div>
            <div>
              <span class='title'>演练开始时间：</span>
              <span class='content'>{{drillDetailObj.reportTime}}</span>
            </div>
          </div>
          <div class='enable-replan-detail-basic-list'>
            <div style='width:100%'><span class='title'>事件情况：</span><span class='content'>{{drillDetailObj.eventDetail}}</span></div>
          </div>
          <div class='enable-replan-detail-basic-list enable-replan-detail-img-content'>
            <div style="width:100%">
              <div class='img-list' style="width:auto" id="imgs" v-show="imgList && imgList.length > 0"></div>
              <div class='video-list' style="width:auto" v-show="imgList && videoList.length > 0">
                <video id="my-video" class="video-js" controls preload="auto" width="100" height="100"
                data-setup="{}" v-for="(item, index) in videoList" :key="'item'+index">
                  <source :src="item.url" type="video/mp4">
                  <source :src="item.url" type="video/webm">
                  <source :src="item.url" type="video/ogg">
                  <p class="vjs-no-js"> 您的浏览器不支持 video 标签。</p>
                </video>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class='enable-replan-detail-bottom'>
        <div class='enable-replan-idea-left'>
          <div class='enable-replan-idea-header'>
            <div class='flag'></div>
            <p class='enable-replan-idea-text'>调度指挥方案</p>
          </div>
          <template v-if='taskList && taskList.length > 0'>
            <div class='enable-replan-list' v-for="(item, index) in taskList" :key="'item'+index">
              <div class='enable-replan-list-detail'>
                <div class='enable-replan-list-num'>任务{{index + 1}}</div>
                <div class='enable-replan-list-body'>
                  <p>执行部门： {{item.departmentName}}</p>
                  <p>任务名称：{{item.taskName}}</p>
                  <p>任务内容： {{item.taskContent}}</p>
                </div>
                <div class='enable-operation'>
                  <span @click='modifyDepartment(index, item.taskContent)'>修改</span>
                  /
                  <span @click='deleteDepartment(index)'>删除</span>
                </div>
              </div>
            </div>
            <div v-show='taskList.length > 0' class='divide'></div>
          </template>
          <div class='enable-replan-idea-body'>
            <el-form v-show="isShowTask" class='enable-replan-idea-form' :model='taskForm' ref='taskForm' :rules='rules' :class="[taskList.length > 0 ? 'active' : '']">
              <el-form-item label="执行部门" label-width='80px' prop='departmentId'>
                <el-select @change='changeDepartment' placeholder="请选择执行部门" style='width: 480px' v-model='taskForm.departmentId'>
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
                <el-input type="text" placeholder='请输入任务名称' style='width: 480px' v-model='taskForm.taskName'></el-input>
              </el-form-item>
              <el-form-item label="任务内容" label-width='80px' prop='taskContent' class="task-content">
                <el-input type="textarea" placeholder='请输入任务内容' rows='7' style='width: 480px' v-model='taskForm.taskContent' @input="calNumber(taskForm.taskContent)"></el-input>
                <span class="number-tip">{{currentNum}}/{{totalNum}}</span>
              </el-form-item>
              <el-form-item label="" label-width='80px' v-show='isShowTask'>
                <el-button style='background: #0785FD;color:#fff;width:80px' @click="saveForm('taskForm')">保存</el-button>
                <el-button style='width:80px' @click="cancelForm('taskForm')">取消</el-button>
              </el-form-item>
            </el-form>
            <div class='add-task' @click="addTask('taskForm')">
              <i class="el-icon-plus" style='width: 36px;height:36px;color:#D8D8D8'></i>
              <span class='add-img-text'>添加任务</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class='operation-btn-enable-replan-detail'>
      <el-button @click='back'>返回</el-button>
      <el-button style='background: #0785FD;color:#fff' :loading="isTaskLoading" @click="submitData('taskForm')">确定</el-button>
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
    <el-dialog
      title="操作提示"
      :visible.sync="closeReturnVisiable"
      class="close-dialog"
      width="480px"
      height='285px'
      center>
      <span style='text-align:center'>返回后您添加的数据不会保存，是否确认返回?</span>
      <span slot="footer" class="dialog-footer">
        <el-button class='sureBtn' @click='sureBack'>确定返回</el-button>
        <el-button class='noSureBtn' @click="closeReturnVisiable = false">暂不返回</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {dictType} from '@/config/data.js';
export default {
  data () {
    return {
      isShowTask: false, // 显示调度指挥表单
      isTaskLoading: false, // 调度指挥加载中
      drillDetailObj: {},
      dialogFormVisible: false,
      closeReturnVisiable: false,
      dialogImageUrl: '',
      dialogVisible: false,
      currentNum: 0, // 事件情况当前字数
      updatecurrentNum: 0,
      totalNum: 1000, // 可输入的总字数
      modifyIndex: '', // 要修改的任务信息索引
      taskList: [], // 预案详情中的任务列表
      departmentList: [], // 部门数据列表
      videoList: [], // 视频数据列表
      imgList: [], // 图片数据列表
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
      eventTypeList: [],
      eventLevelList: []
    }
  },
  created () {
    this.getEventType();
    this.getEventLevel();
    this.getReplanDetail();
    this.getDepartmentList();
  },
  mounted () {
    console.log(this.$store.state.simEventDataInfo)
    if (!this.$route.query.status) {
      console.log('adasdsadasd')
      this.drillDetailObj = {...this.$store.state.simEventDataInfo};
    } else {
      this.getDrillDetail();
    }
    setTimeout(() => {
      this.dataStr = JSON.stringify(this.taskForm); // 将初始数据转成字符串
    }, 1000);
  },
  methods: {
    getEventType () { // 获取事件类型
      this.axios.get('A2/dictServices/dicts/byDictTypeId/' + dictType.eventTypeId)
        .then((res) => {
          if (res && res.data) {
            this.eventTypeList = res.data;
          }
        })
        .catch(() => {})
    },
    getEventLevel () { // 获取事件等级
      this.axios.get('A2/dictServices/dicts/byDictTypeId/' + dictType.eventLevelId)
        .then((res) => {
          if (res && res.data) {
            this.eventLevelList = res.data;
          }
        })
        .catch(() => {})
    },
    // 预览图片公共方法
    previewPictures (data) {
      setTimeout(() => {
        let imgs = data.map(value => value.url);// 图片路径要配置好！
        // 图片数组2
        let imgs2 = []
        // 获取图片列表容器
        let $el = document.getElementById('imgs');
        let html = '';
        // 创建img dom
        imgs.forEach(function (src) {
          // 拼接html结构
          html += '<div class="item" style=" float: left;position:relative;display: flex;align-items: center;justify-content: center;width: 100px;height: 100px;box-sizing: border-box;border: 1px solid #f1f1f1;margin: 5px;cursor: pointer;" data-angle="' + 0 + '"><img src="' + src + '" style="width: 100%;height: 100px;"></div>';
          // 生成imgs2数组
          imgs2.push({
            url: src,
            angle: 0
          })
        })
        // 将图片添加至图片容器中
        $el.innerHTML = html;
        // 使用方法
        let config = {
          showToolbar: true
        }
        let ziv = new ZxImageView(config, imgs2);
        // console.log(ziv);
        // 查看第几张
        let $images = $el.querySelectorAll('.item');
        for (let i = 0; i < $images.length; i++) {
          (function (index) {
            $images[i].addEventListener('click', function () {
              ziv.view(index);
            })
          }(i))
        }
      }, 100)
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
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    selectMorePlan () { // 查看更多预案
      this.$router.push({name: 'replan-list'});
    },
    back (form) {
      const data = JSON.stringify(this.taskForm);
      if (this.dataStr === data) {
        this.$router.back(-1);
      } else {
        this.closeReturnVisiable = true;
      }
    },
    sureBack () {
      console.log(this.$store.state.taskList)
      console.log(this.$store.state.simEventDataInfo)
      this.closeReturnVisiable = false;
      this.$router.back(-1);
    },
    getDrillDetail () { // 获取事件详情
      const eventId = this.$route.query.eventId;
      if (eventId) {
        this.axios.get('A2/eventServices/events/' + eventId)
          .then((res) => {
            if (res && res.data) {
              res.data.attachmentList && res.data.attachmentList.map((item, index) => {
                if (item.attachmentType === dictType.videoId) { // 视频
                  this.videoList.push(item);
                } else {
                  this.imgList.push(item);
                }
              });
              this.drillDetailObj = res.data;
              if (this.imgList.length > 0) {
                this.previewPictures(this.imgList);
              }
            }
          })
          .catch(() => {})
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
    getReplanDetail () { // 获取预案详情
      const planId = this.$route.query.planId;
      if (planId) {
        this.axios.get('A2/planServices/plans/' + planId, planId)
          .then((res) => {
            if (res) {
              console.log(res.data.taskList)
              this.taskList = JSON.parse(JSON.stringify(res.data.taskList));
            }
          })
          .catch(() => {})
      }
    },
    selectReplanDetail () { // 查看预案详情
      this.$router.push({name: 'replan-detail'});
    },
    sureCancelModify (form) { // 取消修改任务
      this.$refs[form].resetFields();
      this.dialogFormVisible = false;
    },
    sureModifyTask (form) { // 确定修改任务
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
    modifyDepartment (index, content) { // 修改任务
      this.dialogFormVisible = true;
      this.modifyIndex = index;
      this.modifyTaskForm.departmentId = this.taskList[index].departmentId;
      this.modifyTaskForm.departmentName = this.taskList[index].departmentName;
      this.modifyTaskForm.taskName = this.taskList[index].taskName;
      this.modifyTaskForm.taskContent = this.taskList[index].taskContent;
      this.updatecurrentNum = content.length;
    },
    deleteDepartment (index) { // 删除任务信息
      this.taskList.splice(index, 1);
    },
    addTask (form) { // 添加任务
      this.isShowTask = true;
    },
    cancelForm (form) { // 取消填写的form
      this.$refs[form].resetFields();
      this.isShowTask = false;
    },
    saveForm (form) { // 保存填写的form
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.isShowTask = false;
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
    changeModifyDepartment (value) {
      this.departmentList.map((item) => {
        if (item.uid === value) {
          this.modifyTaskForm.departmentName = item.organName;
        }
      });
    },
    submitData (form) { // 调度指挥
      if (this.$route.query.status === 'over') { // 从调度或者再次调度按钮进入
        this.modifyData(form);
      } else { // 是从新建演练启用进入
        this.addData(form);
      }
    },
    modifyData (form) {
      let taskList = [];
      let params;
      if (this.taskList.length > 0) {
        this.isTaskLoading = true;
        if (this.$store.state.taskList.length > 0) {
          params = {
            eventId: this.$route.query.eventId,
            taskList: [...this.taskList, ...this.$store.state.taskList]
          }
        } else {
          params = {
            simulateFlag: true,
            eventId: this.$route.query.eventId,
            taskList: [...this.taskList]
          }
        }
        this.axios.put('A2/eventServices/simulateEvent/' + this.$route.query.eventId, params)
          .then((res) => {
            if (res) {
              this.$message({
                message: '启用成功',
                type: 'success'
              });
              this.$router.push({name: 'drill-detail-reat', query: {eventId: this.$route.query.eventId}});
              this.isTaskLoading = false;
            } else {
              this.$message.error('启用失败');
              this.isTaskLoading = false;
            }
          })
          .catch(() => {});
      } else {
        this.$refs[form].validate((valid) => {
          if (valid) {
            this.isTaskLoading = true;
            taskList.push(this.taskForm);
            params = {
              simulateFlag: true,
              eventId: this.$route.query.eventId,
              taskList: [...this.taskList]
            }
            this.axios.put('A2/eventServices/simulateEvent', params)
              .then((res) => {
                if (res) {
                  this.$message({
                    message: '启用成功',
                    type: 'success'
                  });
                  this.$router.push({name: 'drill-detail-reat', query: {eventId: this.$route.query.eventId}});
                  this.isTaskLoading = false;
                } else {
                  this.$message.error('启用失败');
                  this.isTaskLoading = false;
                }
                // this.isTaskLoading = false;
              })
              .catch(() => {});
          }
        })
      }
    },
    addData (form) {
      let taskList = [];
      let params;
      if (this.taskList.length > 0) {
        this.isTaskLoading = true;
        if (this.$store.state.taskList.length > 0) {
          params = {
            simulateFlag: true,
            ...this.drillDetailObj,
            taskList: [...this.taskList, ...this.$store.state.taskList]
          }
        } else {
          params = {
            simulateFlag: true,
            ...this.drillDetailObj,
            taskList: [...this.taskList]
          }
        }
        this.axios.post('A2/eventServices/simulateEvent', params)
          .then((res) => {
            if (res) {
              this.$message({
                message: '启用成功',
                type: 'success'
              });
              this.$router.push({name: 'drill-detail-reat', query: {eventId: res.data}});
              this.isTaskLoading = false;
            } else {
              this.$message.error('启用失败');
              this.isTaskLoading = false;
            }
          })
          .catch(() => {});
      } else {
        this.$refs[form].validate((valid) => {
          if (valid) {
            this.isTaskLoading = true;
            taskList.push(this.taskForm);
            if (this.$store.state.taskList.length > 0) {
              params = {
                simulateFlag: true,
                ...this.drillDetailObj,
                taskList: [...taskList, this.$store.state.taskList]
              }
            } else {
              params = {
                simulateFlag: true,
                ...this.drillDetailObj,
                taskList: [...taskList]
              }
            }
            this.axios.post('A2/eventServices/simulateEvent', params)
              .then((res) => {
                if (res) {
                  this.$message({
                    message: '启用成功',
                    type: 'success'
                  });
                  this.$router.push({name: 'drill-detail-reat', query: {eventId: res.data}});
                  this.isTaskLoading = false;
                } else {
                  this.$message.error('启用失败');
                  this.isTaskLoading = false;
                }
              })
              .catch(() => {});
          }
        })
      }
    }
  }
}
</script>
<style lang='scss'>
  .drill-enable-replan {
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
                width: 100px;
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
            margin: 20px 0 10px 55px;
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
              border: 1px solid transparent;
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
              width: 580px;
              margin-left: 50px;
              border: 1px solid transparent;
              .task-content {
                position: relative;
                .number-tip {
                  position: absolute;
                  bottom: -8px;
                  left: 404px;
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
            .add-task {
              width: 100px;
              height: 100px;
              line-height: 100px;
              background-color: #EAEAEA;
              border: 1px solid #EAEAEA;
              margin-left: 125px;
              margin-bottom: 3%;
              margin-top: 1%;
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
    .operation-btn-enable-replan-detail {
      margin-top: 1%;
      margin-bottom: 1%;
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
    .close-dialog {
      /deep/ .el-dialog__header {
        background: #F0F0F0 !important;
        text-align: left !important;
        color: #555555;
        font-weight: bold;
        font-size: 16px;
      }
      /deep/  .el-dialog--center .el-dialog__body {
        text-align: center !important;
      }
      .sureBtn {
        background:#0785FD;
        height:35px;
        color: #fff;
        line-height: 10px;
      }
      .noSureBtn {
        border-color:#e5e5e5;
        height:35px;
        line-height: 10px;
        color:#666666;
      }
    }
    /deep/ .el-upload--picture-card {
      width: 100px;
      height: 100px;
      line-height: 100px;
      background-color: #EAEAEA;
      border: 1px solid #EAEAEA;
      position: relative;
    }
    /deep/ .el-upload-list--picture-card .el-upload-list__item {
      width: 100px !important;
      height: 100px !important;
    }
    /deep/ .el-upload--picture-card {
      display: none;
    }
    .img-dialog {
      /deep/ .el-dialog__header {
        background: #F0F0F0 !important;
        padding: 40px 20px 10px;
      }
       /deep/  .el-dialog__body {
        text-align: center !important;
      }
    }
    /deep/ .el-upload-list__item-delete {
      display: none !important;
    }
  }
</style>
