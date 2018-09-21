<template>
  <div class='event-detail-end'>
    <div class='event-detail-header'>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>事件管理</el-breadcrumb-item>
        <el-breadcrumb-item><span style='color: #0785FD'>事件详情</span></el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class='event-detail-body'>
      <div class='basic'>
        <div class='basic-header'>
          <div class='flag'></div>
          <p class='basic-text'>基本信息</p>
          <p class='event-number' v-show='eventDetailObj.eventCode'>事件编号：{{eventDetailObj.eventCode}}</p>
        </div>
        <div class='event-status'>
          <img src='../../../../assets/img/temp/end.png' />
        </div>
        <div class='basic-detail'>
          <div class='basic-list'>
            <div>
              <span class='title'>事件类型：</span>
              <span v-show='!isSave' class='content'>{{eventDetailObj.eventTypeName}}</span>
              <el-select v-show='isSave' v-model="modifyForm.eventType" placeholder="请选择" style='width: 200px;'>
                <el-option
                  v-for="item in eventTypeList"
                  :key="item.dictId"
                  :label="item.dictContent"
                  :value="item.dictId"
                >
                </el-option>
              </el-select>
            </div>
            <div>
              <span class='title'>事件等级：</span>
              <span v-show='!isSave' class='content'>{{eventDetailObj.eventLevelName}}</span>
              <el-select v-show='isSave' v-model="modifyForm.eventLevel" placeholder="请选择" style='width: 200px;'>
                <el-option
                  v-for="item in eventLevelList"
                  :key="item.dictId"
                  :label="item.dictContent"
                  :value="item.dictId"
                >
                </el-option>
              </el-select>
            </div>
            <div><span class='title'>报案时间：</span><span class='content'>{{eventDetailObj.reportTime}}</span></div>
          </div>
          <div class='basic-list'>
            <div>
              <span class='title'>报案人：</span>
              <span class='content'>{{eventDetailObj.reporterPhone}}</span>
            </div>
            <div style='width: 65%'><span class='title'>事发地点：</span><span class='content'>{{eventDetailObj.eventAddress}}</span></div>
          </div>
          <div class='basic-list'>
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
          <div class='basic-list'>
            <div style='width: 100%'><span class='title'>事件情况：</span><span class='content'>{{eventDetailObj.eventDetail}}</span></div>
          </div>
          <div class='basic-list img-content'>
            <el-upload
              action=""
              list-type="picture-card"
              accept=".png,.jpg,.bmp"
              :on-preview="handlePictureCardPreview"
              :file-list="eventDetailObj.attachmentList"
            >
            </el-upload>
          </div>
        </div>
      </div>
      <template v-if="!eventDetailObj.closeReason">
        <template v-if='eventDetailObj.taskList && eventDetailObj.taskList.length > 0'>
          <div class='ctc'>
            <div class='ctc-header'>
              <div class='flag'></div>
              <p class='ctc-text'>调度指挥方案</p>
            </div>
            <div class='ctc-content'>
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
                <template v-if='eventDetailObj.taskList && eventDetailObj.taskList.length > 1'>
                  <li class='divide'></li>
                </template>
              </ul>
            </div>
          </div>
        </template>
        <template
          v-if='(eventDetailObj.processingList && eventDetailObj.processingList.length > 0) || (eventDetailObj.taskList && eventDetailObj.taskList.length > 0) || (commentList && commentList.length > 0)'>
          <div class='event-progress'>
            <div class='event-progress-header'>
              <div class='flag'></div>
              <p class='event-progress-text'>事件进展</p>
            </div>
            <div class='event-progress-body'>
              <div class='depart' v-show="eventDetailObj.taskList && eventDetailObj.taskList.length > 0">
                <p class='progress-title'>参与部门</p>
                <div class='depart-detail' v-for='(item, index) in eventDetailObj.taskList' :key="'items'+index">
                  <p>{{item.departmentName}}</p>
                  <p>{{item.createTime}}</p>
                  <p>{{item.taskStatusName}}</p>
                </div>
              </div>
              <div class=divide v-show="eventDetailObj.processingList && eventDetailObj.processingList.length > 0"></div>
              <div class='event-process' v-show="eventDetailObj.processingList && eventDetailObj.processingList.length > 0">
                <p class='progress-title'>事件过程</p>
                <ul>
                  <li v-for="(item, index) in eventDetailObj.processingList" :key="'item'+index">
                    <div class='circle-left'>
                      <div class='big-circle'>
                        <div class='small-circle'></div>
                      </div>
                    </div>
                    <template v-if='eventDetailObj.processingList.length > 1'>
                      <div class='line'></div>
                    </template>
                    <div class='content-right'>
                      <div class='time'>{{item.createTime}}</div>
                      <div class='content'>{{item.processContent}}（操作人：{{item.handleUserName}}）</div>
                    </div>
                  </li>
                </ul>
              </div>
              <div class="divide" v-show="commentList && commentList.length > 0"></div>
              <div class='comment' v-show="commentList && commentList.length > 0">
                <p class='progress-title'>
                  APP端互助
                  <span style='color: #0785FD;font-size: 12px'>({{this.pagination.total}}条评论)</span>
                </p>
                <ul>
                  <li v-for='(item, index) in commentList' :key="'item'+index">
                    <div class='info-top'>
                      <p class='phone'>{{item.commentUserMobile}}({{item.commentUserIdentity}})</p>
                      <p class='time'>{{item.createTime}}</p>
                    </div>
                    <div class='info-detail'>{{item.content}}</div>
                    <i class='el-icon-circle-close close' @click="closeComment(item.commentId)"></i>
                  </li>
                </ul>
                <template v-if='this.pagination.total > 5'>
                  <el-pagination
                    background
                    :page-sizes="[5, 10, 20, 50, 100]"
                    @size-change="onSizeChange"
                    @current-change="onPageChange"
                    :current-page.sync="pagination.pageNum"
                    :page-size="pagination.pageSize"
                    layout="prev, pager, next, jumper"
                    :total="pagination.total"
                  >
                  </el-pagination>
                </template>
              </div>
            </div>
          </div>
        </template>
        <div class='event-summary' v-show='eventDetailObj.eventSummary'>
          <div class='event-summary-header'>
            <div class='flag'></div>
            <p class='event-summary-text'>事件总结</p>
          </div>
          <div style="margin-top:1%;" v-show="isSave">
            <el-input type="textarea" rows="5" v-model="eventDetailObj.eventSummary"></el-input>
          </div>
          <div class='summary-content' v-show="!isSave">
            {{eventDetailObj.eventSummary}}
          </div>
        </div>
      </template>
      <template v-else>
        <div class='close-reason'>
          <div class='close-reason-header'>
            <div class='flag'></div>
            <p class='close-reason-text'>被关闭的原因</p>
          </div>
          <div class='close-reason-body'>
            <div class='detail'>{{eventDetailObj.closeReasonName}}</div>
            <div class='divide'></div>
            <div class='remark'>备注：{{eventDetailObj.closeRemark}}</div>
          </div>
        </div>
      </template>
    </div>
    <div class='operation-btn-event'>
      <el-button @click='back'>返回</el-button>
      <template v-if="!eventDetailObj.closeReason">
        <el-button v-show='isSave' type="primary" :loading="isSaveLoading" style='background: #0785FD' @click='handleSave'>保存</el-button>
        <el-button v-show='!isSave' type="primary" style='background: #FB796C;border-color:#FB796C' @click="modifyEvent">修改</el-button>
      </template>
    </div>
    <el-dialog
      title="操作提示"
      :visible.sync="closeCommentVisiable"
      width="480px"
      height='285px'
      center>
      <span style='text-align:center'>删除后APP端将不再显示此条评论，是否确认删除?</span>
      <span slot="footer" class="dialog-footer">
        <el-button class='sureBtn' :loading="isDeleteLoading" @click='deleteComment'>确定删除</el-button>
        <el-button class='noSureBtn' @click="closeCommentVisiable = false">暂不删除</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="操作提示"
      :visible.sync="closeReturnVisiable"
      width="480px"
      height='285px'
      class="close-tip"
      center>
      <span style='text-align:center'>返回后您添加的数据不会保存，是否确认返回?</span>
      <span slot="footer" class="dialog-footer">
        <el-button class='sureBtn' @click='sureBack'>确定返回</el-button>
        <el-button class='noSureBtn' @click="closeReturnVisiable = false">暂不返回</el-button>
      </span>
    </el-dialog>
    <el-dialog :visible.sync="dialogVisible" class="img-dialog">
      <img :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>
<script>
import {dictType} from '@/config/data.js';
export default {
  data () {
    return {
      isSaveLoading: false, // 保存加载中
      isDeleteLoading: false, // 删除评论加载中
      dialogFormVisible: false,
      closeCommentVisiable: false,
      closeReturnVisiable: false,
      dialogImageUrl: '',
      dialogVisible: false,
      isSave: false, // 是否显示保存按钮
      imgSrc: '', // 事件状态图片
      pagination: {
        total: 0,
        pageNum: 1,
        pageSize: 5
      },
      modifyForm: {
        eventLevel: '',
        eventType: '',
        eventId: ''
      },
      eventDetailObj: {}, // 事件详情
      eventTypeList: [], // 事件类型列表
      eventLevelList: [], // 事件等级列表
      commentList: [] // 评论列表
    }
  },
  created () {
    this.getEventType();
    this.getEventLevel();
    this.getEventDetail();
    this.getCommentList();
  },
  mounted () {
    setTimeout(() => {
      this.dataStr = JSON.stringify(this.modifyForm); // 将初始数据转成字符串
    }, 1000);
  },
  methods: {
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    back (form) {
      const data = JSON.stringify(this.modifyForm);
      if (this.dataStr === data) {
        this.$router.back(-1);
      } else {
        this.closeReturnVisiable = true;
      }
    },
    sureBack () {
      this.closeReturnVisiable = false;
      this.$router.back(-1);
    },
    onPageChange (page) {
      this.pagination.pageNum = page;
      this.getCommentList();
    },
    onSizeChange (val) {
      this.pagination.pageNum = 1;
      this.pagination.pageSize = val;
      this.getCommentList();
    },
    getEventDetail () { // 获取事件详情
      const eventId = this.$route.query.eventId;
      this.modifyForm.eventId = eventId;
      if (eventId) {
        this.axios.get('A2/eventServices/events/' + eventId)
          .then((res) => {
            // console.log(res)
            if (res && res.data) {
              this.modifyForm.eventType = res.data.eventType;
              this.modifyForm.eventLevel = res.data.eventLevel;
              this.eventDetailObj = res.data;
            }
          })
          .catch(() => {})
      }
    },
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
    modifyEvent () { // 已结束的事件修改
      this.isSave = true;
    },
    handleSave () { // 保存修改
      if (this.modifyForm) {
        this.isSaveLoading = true;
        this.axios.put('A2/eventServices/events/' + this.$route.query.eventId, this.modifyForm)
          .then((res) => {
            if (res) {
              this.$message({
                message: '保存成功',
                type: 'success'
              });
              this.$router.push({name: 'event-list'});
            } else {
              this.$message.error('保存失败');
            }
            this.isSaveLoading = false;
          })
          .catch(() => {})
      }
    },
    getCommentList () { // 分页获取评论列表
      const eventId = this.$route.query.eventId;
      const data = {
        'where.eventId': eventId,
        pageNum: this.pagination.pageNum,
        pageSize: this.pagination.pageSize
      }
      if (eventId) {
        this.axios.get('A2/eventServices/comments/page', {params: data})
          .then((res) => {
            if (res && res.data.list) {
              this.commentList = res.data.list;
              this.pagination.total = res.data.total;
            }
          })
          .catch(() => {})
      }
    },
    closeComment (id) {
      this.delCommentId = id;
      this.closeCommentVisiable = true;
    },
    deleteComment () { // 删除评论
      if (this.delCommentId) {
        this.isDeleteLoading = true;
        this.axios.delete('A2/eventServices/comment/' + this.delCommentId, this.delCommentId)
          .then((res) => {
            if (res) {
              this.$message({
                message: '评论删除成功',
                type: 'success'
              });
              this.getCommentList();
            } else {
              this.$message.error('评论删除失败');
            }
            this.closeCommentVisiable = true;
            this.isDeleteLoading = false;
          })
          .catch(() => {})
      }
    }
  }
}
</script>
<style lang='scss' scoped>
  .event-detail-end {
    padding: 20px;
    .event-detail-header {
      margin-bottom: 20px;
    }
    .event-detail-body {
      width: 100%;
      .basic, .ctc,.event-progress,.event-summary,.close-reason {
        background: #fff;
        margin-bottom: 2%;
        .basic-header,.ctc-header,.event-progress-header,.event-summary-header,.close-reason-header {
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
          .basic-text, .ctc-text,.event-progress-text,.event-summary-text,.close-reason-text {
            color: #0785FD;
            font-size: 16px;
            font-weight: bold;
            margin-left: 1%;
          }
          .event-number {
            color: #555555;
            font-size: 14px;
            margin-left: 2%;
          }
        }
        .event-status {
          color: #fff;
          // background: #0785FD;
          width: 100px;
          height: 40px;
          border-radius: 2px;
          font-weight: bold;
          font-size: 14px;
          text-align: center;
          line-height: 40px;
          float: right;
          margin-top: -20px;
          margin-right: 2%;
        }
        .basic-detail {
          width: 100%;
          display:flex;
          padding: 20px;
          flex-direction: column;
          .basic-list {
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
          .img-content {
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
        .ctc-content {
          width: 100%;
          padding: 20px 20px 0 30px;
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
          }
        }
        .summary-content {
          width: 100%;
          padding: 20px 20px 20px 30px;
        }
        .event-progress-body {
          width: 100%;
          padding: 20px 20px 20px 30px;
          .depart {
            .depart-detail {
              display: flex;
              padding-top: 15px;
              p {
                margin-right: 3%;
                color: #222222;
                font-size: 13px;
              }
            }
          }
          .event-process {
            ul {
              width: 100%;
              padding: 20px 0;
              li {
                display: flex;
                height: 82px;
                position: relative;
                .circle-left {
                  margin-top: 3px;
                  .big-circle {
                    width: 12px;
                    height: 12px;
                    border-radius: 50%;
                    border: 1px solid #0785FD;
                    .small-circle {
                      width: 6px;
                      height: 6px;
                      border-radius: 50%;
                      background: #0785FD;
                      margin: 2px auto 0 auto;
                    }
                  }
                }
                .line {
                  width: 1px;
                  height: 70px;
                  position: absolute;
                  left: 6px;
                  top: 15px;
                  background: #C0DFFB;
                }
                .content-right {
                  margin-left: 1%;
                  font-size: 13px;
                  .time {
                    color:#888888;
                    margin-bottom: 5px;
                  }
                  .content {
                    color: #222222;
                  }
                }
              }
              & li:last-child .line {
                display: none;
              }
            }
          }
          .comment {
            ul {
              margin: 20px 0;
              li {
                margin-bottom: 1%;
                width: 70%;
                background: #fafafa;
                padding: 10px;
                position: relative;
                .info-top {
                  display: flex;
                  .phone {
                    font-size: 14px;
                    color: #222222;
                    font-weight: bold;
                    margin-right: 3%;
                    margin-bottom: 1%;
                  }
                  .time {
                    font-size: 13px;
                    color: #888888;
                  }
                }
                .info-detail {
                  width: 95%;
                }
                .close {
                  position: absolute;
                  font-size: 21px;
                  color: #E9E8E8;
                  right: 2%;
                  top: 30%;
                }
              }
            }
          }
        }
        .close-reason-body {
          width: 100%;
          padding: 20px 20px 20px 30px;
          .detail {
            color: #222222;
            font-size: 14px;
            margin-bottom: 2%;
          }
          .remark {
            color: #555555;
            font-size: 13px;
            margin-top: 2%;
          }
        }
        .progress-title {
          font-size: 14px;
          color: #222222;
          font-weight: bold;
        }
      }
      .divide {
        height:1px;
        margin: 1% 0;
        background: #EAEAEA;
      }
    }
    .operation-btn-event {
      margin-top: 2%;
    }
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
