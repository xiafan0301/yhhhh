<template>
  <div class='linkage-detail-end'>
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
              <span class='content'>{{eventDetailObj.reporterPhone}}</span>
            </div>
            <div style='width: 50%'><span class='title'>事发地点：</span><span class='content'>{{eventDetailObj.eventAddress}}</span></div>
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
            <div style="width:100%;">
              <div class='img-list' style="width:auto" id="imgs" v-show="imgList && imgList.length > 0"></div>
              <div class='video-list' style="width:auto" v-show="videoList && videoList.length > 0">
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
      <template v-if='eventDetailObj.processingList && eventDetailObj.processingList.length > 0'>
        <div class='event-progress'>
          <div class='event-progress-header'>
            <div class='flag'></div>
            <p class='event-progress-text'>事件进展</p>
          </div>
          <div class='event-progress-body'>
            <div class='depart'>
              <p class='progress-title'>参与部门</p>
              <div class='depart-detail' v-for='(item, index) in eventDetailObj.taskList' :key="'items'+index">
                <p>{{item.departmentName}}</p>
                <p>{{item.createTime}}</p>
                <p>{{item.taskStatusName}}</p>
              </div>
            </div>
            <div class=divide></div>
            <div class='event-process'>
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
                    <div class='content'>{{item.processContent}}（操作人：{{item.opUserName}}）</div>
                    <div style="width:100%;margin-top:10px;">
                      <div class='img-list' style="width:auto" :id="'proImgs'+ index"></div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div class='divide' v-show="commentList && commentList.length > 0"></div>
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
                  <!-- <i class='el-icon-circle-close close' @click="closeComment(item.commentId)"></i> -->
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
        <div class='summary-content'>
          {{eventDetailObj.eventSummary}}
          <template v-if="eventDetailObj.closeUserName">
          ({{eventDetailObj.closeUserName}})
          </template>
        </div>
        <div style="display: flex">
              <div id="imgs1" class="img-list" style="margin-left: 20px"></div>
          </div>
          <div class='show-file-div'>
            <div class='show-file-div-list' v-for="(item, index) in fileList" :key="'item'+index">
              <img src='../../../../assets/img/temp/file.png' />
              <a :href="item.url" style="text-decoration: none">
                <span>{{item.attachmentName}}</span>
                <el-button type="primary" size="mini" style="margin-left: 5px">下载</el-button>
              </a>
            </div>
          </div>
          <div style="height:  37px; background-color: #fff"></div>
      </div>
    </div>
    <div class='operation-btn-event'>
      <el-button @click='back'>返回</el-button>
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
  </div>
</template>
<script>
import {dictType} from '@/config/data.js';
export default {
  data () {
    return {
      imgSrc: '', // 事件状态图片
      closeCommentVisiable: false,
      isDeleteLoading: false, // 删除评论加载中
      pagination: {
        total: 0,
        pageNum: 1,
        pageSize: 5
      },
      videoList: [], // 视频数据列表
      imgList: [], // 图片数据列表
      imgList1: [],
      fileList: [],
      eventDetailObj: {}, // 事件详情
      eventTypeList: [], // 事件类型列表
      eventLevelList: [], // 事件等级列表
      commentList: [] // 评论列表
    }
  },
  mounted () {
    this.getEventType();
    this.getEventLevel();
    this.getEventDetail();
    this.getCommentList();
  },
  methods: {
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
    // 预览图片公共方法
    previewPictures1 (data) {
      setTimeout(() => {
        let imgs = data.map(value => value.url);// 图片路径要配置好！
        // 图片数组2
        let imgs2 = []
        // 获取图片列表容器
        let $el = document.getElementById('imgs1');
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
    previewPicturesOne (index, data) {
      setTimeout(() => {
        let imgs = data.map(value => value.url);// 图片路径要配置好！
        // 图片数组2
        let imgs2 = []
        // 获取图片列表容器
        let $el = document.getElementById('proImgs' + index);
        console.log($el)
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
    back () { // 返回上一页
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
      console.log(eventId)
      if (eventId) {
        this.axios.get('A2/eventServices/events/' + eventId)
          .then((res) => {
            console.log(res)
            if (res && res.data) {
              res.data.attachmentList && res.data.attachmentList.map((item, index) => {
                if (item.attachmentType === dictType.videoId) { // 视频
                  this.videoList.push(item);
                } else {
                  this.imgList.push(item);
                }
              });
              if (this.imgList.length > 0) {
                this.previewPictures(this.imgList);
              }
              this.eventDetailObj = res.data;
              this.eventDetailObj.closeAttachmentList.forEach(aa => {
                if (aa.attachmentName.substring(aa.attachmentName.lastIndexOf('.')) === '.png' || aa.attachmentName.substring(aa.attachmentName.lastIndexOf('.')) === '.jpg' || aa.attachmentName.substring(aa.attachmentName.lastIndexOf('.')) === '.bmp') {
                  this.imgList1.push(aa);
                  this.previewPictures1(this.imgList1)
                } else {
                  this.fileList.push(aa)
                }
              })
              if (res.data.processingList.length > 0) {
                res.data.processingList.map((items, index) => {
                  if (items.attachmentList.length > 0) {
                    this.previewPicturesOne(index, items.attachmentList);
                  }
                });
              }
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
            this.closeCommentVisiable = false;
            this.isDeleteLoading = false;
          })
          .catch(() => {})
      }
    }
  }
}
</script>
<style lang='scss' scoped>
  .linkage-detail-end {
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
                // height: 82px;
                height: 100%;
                margin-bottom: 10px;
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
                  height: 100%;
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
    .show-file-div {
      width: 500px;
      margin-left: 22px;
      .show-file-div-list {
        display: flex;
        align-items: center;
        margin-top: 10px;
        span {
          color: #0785FD;
          font-size: 14px;
          margin: 0 5px;
        }
        i {
          font-size: 18px;
          color: #5D5D5D;
          cursor: pointer;
        }
      }
    }
  }
</style>
