<template>
  <div class='mutual-detail'>
    <div class='mutual-detail-header'>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>事件管理</el-breadcrumb-item>
        <el-breadcrumb-item><span style='color: #0785FD'>事件详情</span></el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class='mutual-detail-body'>
      <div class='basic-mutual'>
        <div class='basic-header-mutual'>
          <div class='flag'></div>
          <p class='basic-text-mutual'>基本信息</p>
          <p class='mutual-number' v-show='eventDetailObj.eventCode'>事件编号：{{eventDetailObj.eventCode}}</p>
        </div>
        <div class='mutual-status'>
          <img :src='imgUrl' />
        </div>
        <div class='basic-detail-mutual'>
          <div class='basic-list'>
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
          <div class='basic-list'>
            <div>
              <span class='title'>报案人：</span>
              <template v-if="this.$route.query.eventStatus === '处理中'">
                <span style='color:#0785FD;font-weight:bold;text-decoration:underline'>{{eventDetailObj.reporterPhone}}</span>
              </template>
              <template v-else>
                <span class='content'>{{eventDetailObj.reporterPhone}}</span>
              </template>
            </div>
            <div><span class='title'>事发地点：</span><span class='content'>{{eventDetailObj.eventAddress}}</span></div>
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
            <img
              v-for='item in eventDetailObj.attachmentList'
              :src='item.url'
              :key='item.attachmentId'
            />
            <!-- <img src='../../../../assets/img/temp/temp-t032.png' />
            <img src='../../../../assets/img/temp/temp-t032.png' />
            <img src='../../../../assets/img/temp/temp-t032.png' />
            <img src='../../../../assets/img/temp/temp-t032.png' />
            <img src='../../../../assets/img/temp/temp-t032.png' />
            <img src='../../../../assets/img/temp/temp-t032.png' />
            <img src='../../../../assets/img/temp/temp-t032.png' />
            <img src='../../../../assets/img/temp/temp-t032.png' />
            <img src='../../../../assets/img/temp/temp-t032.png' /> -->
          </div>
        </div>
      </div>
      <div class='mutual-progress'>
        <div class='mutual-progress-header'>
          <div class='flag'></div>
          <p class='mutual-progress-text'>
            APP端互助
            <span style='color: #0785FD;font-size: 12px'>({{this.pagination.total}}条评论)</span>
          </p>
        </div>
        <div class='mutual-progress-body'>
          <ul>
            <li v-for="(item, index) in commentList" :key="'item'+index">
              <div class='info-top'>
                <p class='phone'>{{item.commentUserId}}</p>
                <p class='time'>{{item.createTime}}</p>
              </div>
              <div class='info-detail'>{{item.content}}</div>
              <i class='el-icon-circle-close close' @click="closeComment(item.commentId)"></i>
            </li>
            <li>
              <div class='info-top'>
                <p class='phone'>13812341234</p>
                <p class='time'>06-25 11:30</p>
              </div>
              <div class='info-detail'>火势好大！</div>
              <i class='el-icon-circle-close close' @click="closeComment(item.commentId)"></i>
            </li>
            <li>
              <div class='info-top'>
                <p class='phone'>13812341234</p>
                <p class='time'>06-25 11:30</p>
              </div>
              <div class='info-detail'>火势好大！</div>
              <i class='el-icon-circle-close close'></i>
            </li>
            <li>
              <div class='info-top'>
                <p class='phone'>13812341234</p>
                <p class='time'>06-25 11:30</p>
              </div>
              <div class='info-detail'>火势好大！</div>
              <i class='el-icon-circle-close close'></i>
            </li>
          </ul>
          <template v-if='commentList && commentList.length > 5'>
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
    <div class='operation-btn-mutual'>
      <el-button @click='back'>返回</el-button>
      <template v-if="this.$route.query.eventStatus === '处理中'">
        <template v-if='eventDetailObj.eventFlag === false'>
          <el-button style='background: #0785FD;color:#fff' @click='endEvent'>宣布结束</el-button>
        </template>
      </template>
    </div>
    <el-dialog
      title="操作提示"
      :visible.sync="mutualEndVisiable"
      width="480px"
      height='285px'
      center>
      <span style='text-align:center'>确定要结束互助?</span>
      <span slot="footer" class="dialog-footer">
        <el-button class='sureBtn' @click="sureEndEvent">确定结束</el-button>
        <el-button class='noSureBtn' @click="mutualEndVisiable = false">暂不结束</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="操作提示"
      :visible.sync="closeCommentVisiable"
      width="480px"
      height='285px'
      center>
      <span style='text-align:center'>删除后APP端将不再显示此条评论，是否确认删除?</span>
      <span slot="footer" class="dialog-footer">
        <el-button class='sureBtn' @click='deleteComment'>确定删除</el-button>
        <el-button class='noSureBtn' @click="closeCommentVisiable = false">暂不删除</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {
      closeCommentVisiable: false,
      mutualEndVisiable: false,
      imgUrl: '',
      delCommentId: '', // 要删除的评论id
      eventDetailObj: {}, // 事件详情
      commentList: [], // 评论列表
      pagination: {
        total: 0,
        pageNum: 1,
        pageSize: 10
      },
      options1: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: ''
    }
  },
  mounted () {
    this.getEventDetail();
    this.getCommentList();
    if (this.$route.query.eventStatus === '处理中') {
      this.imgUrl = require('../../../../assets/img/temp/treating.png');
    } else {
      this.imgUrl = require('../../../../assets/img/temp/end.png');
    }
  },
  methods: {
    back () {
      this.$router.back(-1);
    },
    skipEventEnd () { // 跳到事件结束页面
      this.$router.push({name: 'event-end'});
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
      if (eventId) {
        this.axios.get('A2/eventServices/events/' + eventId)
          .then((res) => {
            if (res && res.data) {
              console.log(res.data)
              this.eventDetailObj = res.data;
            }
          })
          .catch(() => {})
      }
    },
    endEvent () { // 结束事件
      this.mutualEndVisiable = true;
    },
    sureEndEvent () { // 结束事件
      const eventId = this.$route.query.eventId;
      this.axios.put('A2/eventServices/events/finish/' + eventId, {eventId: eventId})
        .then((res) => {
          if (res) {
            console.log(res)
            this.$message({
              message: '宣布事件结束成功',
              type: 'success'
            });
            this.mutualEndVisiable = false;
            this.$router.push({name: 'mutual-person'});
          } else {
            this.$message.error('宣布事件结束失败');
            this.mutualEndVisiable = false;
          }
        })
        .catch(() => {})
    },
    getCommentList () { // 分页获取评论
      const eventId = this.$route.query.eventId;
      const data = {
        'where.eventId': eventId,
        pageNum: this.pagination.pageNum
      }
      this.axios.get('A2/eventServices/comments/page', data)
        .then((res) => {
          console.log(res)
          if (res && res.data.list) {
            this.commentList = res.data.list;
            this.pagination.total = res.data.total;
          }
        })
        .catch(() => {})
    },
    closeComment (id) {
      this.delCommentId = id;
      this.closeCommentVisiable = true;
    },
    deleteComment () { // 删除评论
      if (this.delCommentId) {
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
          })
          .catch(() => {})
      }
    }
  }
}
</script>
<style lang='scss' scoped>
  .mutual-detail {
    padding: 20px;
    .mutual-detail-header {
      margin-bottom: 20px;
    }
    .mutual-detail-body {
      width: 100%;
      .basic-mutual,.mutual-progress{
        background: #fff;
        margin-bottom: 1%;
        .basic-header-mutual,.mutual-progress-header {
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
          .basic-text-mutual,.mutual-progress-text{
            color: #0785FD;
            font-size: 16px;
            font-weight: bold;
            margin-left: 1%;
          }
          .mutual-number {
            color: #555555;
            font-size: 14px;
            margin-left: 2%;
          }
        }
        .mutual-status {
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
        .basic-detail-mutual {
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
              height: 100px;
              margin-right: 1%;
              margin-top: 1%;
            }
          }
        }
        .mutual-progress-body {
          width: 100%;
          padding: 20px 20px 20px 30px;
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
    }
    .operation-btn-mutual {
      margin-top: 1%;
    }
    /deep/ .el-dialog__header {
      background: #F0F0F0 !important;
      text-align: left !important;
      color: #555555;
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
</style>
