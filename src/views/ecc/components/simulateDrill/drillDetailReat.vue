<template>
  <div class="drill-detail-reat">
    <div class='drill-detail-header'>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>模拟演练</el-breadcrumb-item>
        <el-breadcrumb-item><span style='color: #0785FD'>事件演练</span></el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class='drill-detail-reat-body'>
      <div class='basic'>
        <div class='basic-header'>
          <div class='flag'></div>
          <p class='basic-text'>基本信息</p>
          <!-- <p class='event-number' v-show='drillDetailObj.eventCode'>事件编号：{{drillDetailObj.eventCode}}</p> -->
        </div>
        <div class='event-status'>
          <img src='../../../../assets/img/temp/handling.png' />
        </div>
        <div class='basic-detail'>
          <div class='basic-list'>
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
          <div class='basic-list'>
            <div style='display:flex;align-items: center;'>
              <span class='title'>报案人：</span>
              <span class='content' style='margin-right:20px;'>{{drillDetailObj.reporterPhone}}</span>
              <a :href="urlDetail + '?eventId=' + this.$route.query.eventId + '&' + userInfoParam()" target="_blank"><div class="relation-person"><i class="el-icon-phone"></i>联系上报人</div></a>
            </div>
            <div style='width: 65%'>
              <span class='title'>事发地点：</span>
              <span class='content'>{{drillDetailObj.eventAddress}}</span>
            </div>
          </div>
          <div class='basic-list'>
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
          <div class='basic-list'>
            <div style='width: 100%'>
              <span class='title'>事件情况：</span>
              <span class='content'>{{drillDetailObj.eventDetail}}</span>
            </div>
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
      <div class='ctc' v-show='drillDetailObj.taskList && drillDetailObj.taskList.length > 0'>
        <div class='ctc-header'>
          <div class='flag'></div>
          <p class='ctc-text'>调度指挥方案</p>
        </div>
        <div class='ctc-content'>
          <ul v-for="(item, index) in drillDetailObj.taskList" :key="'item'+index">
            <li>
              <span class='title'>调度部门：</span><span class='content'>{{item.departmentName}}</span>
            </li>
            <li>
              <span class='title'>任务名称：</span><span class='content'>{{item.taskName}}</span>
            </li>
            <li>
              <span class='title'>任务内容：</span><span class='content'>{{item.taskContent}}</span>
            </li>
            <li v-show='drillDetailObj.taskList && drillDetailObj.taskList.length > 0' class='divide'></li>
          </ul>
        </div>
      </div>
      <div class='event-progress'
        v-show="(drillDetailObj.taskList && drillDetailObj.taskList.length > 0) || (drillDetailObj.processingList && drillDetailObj.processingList.length > 0)">
        <div class='event-progress-header'>
          <div class='flag'></div>
          <p class='event-progress-text'>事件进展</p>
        </div>
        <div class='event-progress-body'>
          <div class='depart' v-show="drillDetailObj.taskList && drillDetailObj.taskList.length > 0">
            <p class='progress-title'>参与部门</p>
            <div class='depart-detail' v-for='(item, index) in drillDetailObj.taskList' :key="'item'+index">
              <p>{{item.departmentName}}</p>
              <p>{{item.createTime}}</p>
              <p>{{item.taskStatusName}}</p>
            </div>
          </div>
          <div class=divide v-show="drillDetailObj.processingList && drillDetailObj.processingList.length > 0"></div>
          <div class='event-process' v-show="drillDetailObj.processingList && drillDetailObj.processingList.length > 0">
            <p class='progress-title'>事件过程</p>
            <ul>
              <li v-for="(item, index) in drillDetailObj.processingList" :key="'item'+index">
                <div class='circle-left'>
                  <div class='big-circle'>
                    <div class='small-circle'></div>
                  </div>
                </div>
                <template v-if='drillDetailObj.processingList.length > 1'>
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
        </div>
      </div>
    </div>
    <div class='operation-btn-event'>
      <el-button @click='back'>返回</el-button>
      <el-button v-show="resouceData && resourceBtn[resouceData.ctcDrill]" style='background: #fff;color:#0785FD;border:1px solid #0785FD' class='skipCtcDetail' @click='skipCtcDetail'>
        <template v-if="drillDetailObj.taskList && drillDetailObj.taskList.length > 0">
          再次调度
        </template>
        <template v-else>
          调度
        </template>
      </el-button>
      <el-button v-show="resouceData && resourceBtn[resouceData.endDrill]" style='background: #0785FD;color:#fff' @click='skipDrillEnd'>演练结束</el-button>
    </div>
  </div>
</template>
<script>
import {dictType, resouceData} from '@/config/data.js';
import {ajaxCtx3} from '@/config/config.js';
import { setCookie, getCookie } from '@/utils/util.js';
export default {
  data () {
    return {
      resourceBtn: {},
      resouceData: resouceData,
      urlDetail: '',
      drillDetailObj: {},
      videoList: [], // 视频数据列表
      imgList: [], // 图片数据列表
      proVideoList: [], // 视频数据列表
      proImgList: [] // 图片数据列表
    }
  },
  created () {
    this.resourceBtn = JSON.parse(sessionStorage.getItem('resourcebtn'));
  },
  mounted () {
    this.getDrillDetail();
    this.urlDetail = ajaxCtx3;
  },
  methods: {
    back () { // 返回上一页
      this.$router.back(-1);
    },
    userInfoParam () {
      let ln = getCookie('cookieUserName');
      if (!ln) { ln = ''; }
      return $.param({ln: ln});
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
    previewPicturesOne (index, data) {
      setTimeout(() => {
        let imgs = data.map(value => value.url);// 图片路径要配置好！
        // 图片数组2
        let imgs2 = []
        // 获取图片列表容器
        let $el = document.getElementById('proImgs' + index);
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
    getDrillDetail () {
      const eventId = this.$route.query.eventId;
      if (eventId) {
        this.axios.get('A2/eventServices/events/' + eventId)
          .then((res) => {
            if (res && res.data) {
              this.drillDetailObj = res.data;
              console.log(res.data)
              res.data.attachmentList && res.data.attachmentList.map((item, index) => {
                if (item.attachmentType === dictType.videoId) { // 视频
                  this.videoList.push(item);
                } else {
                  this.imgList.push(item);
                }
              });
              if (res.data.processingList.length > 0) {
                res.data.processingList.map((items, index) => {
                  if (items.attachmentList.length > 0) {
                    this.previewPicturesOne(index, items.attachmentList);
                  }
                });
              }
              if (this.imgList.length > 0) {
                this.previewPictures(this.imgList);
              }
            }
          })
          .catch(() => {})
      }
    },
    skipCtcDetail () {
      this.$router.push({name: 'simulate-ctc-detail', query: {eventId: this.$route.query.eventId, eventType: this.drillDetailObj.eventType}});
    },
    skipDrillEnd () {
      this.$router.push({name: 'drill-end', query: {eventId: this.$route.query.eventId, level: this.drillDetailObj.eventLevel}});
    }
  }
}
</script>

<style lang="scss" scoped>
.drill-detail-reat {
  padding: 20px;
  .drill-detail-header {
    margin-bottom: 20px;
  }
  .drill-detail-reat-body {
    width: 100%;
    a {
      text-decoration: none;
    }
    .basic, .ctc,.event-progress {
      background: #fff;
      margin-bottom: 2%;
      .basic-header,.ctc-header,.event-progress-header{
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
        .basic-text, .ctc-text,.event-progress-text{
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
        .img-content {
          width: 100%;
          padding-left: 80px;
        }
      }
      .ctc-content {
        width: 100%;
        padding: 20px 20px 20px 30px;
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
        & ul:last-child .divide {
          display: none;
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
              position: relative;
              margin-bottom: 10px;
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
                // height: 70px;
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
    .relation-person {
      cursor: pointer;
      border: 1px solid #EAEAEA;
      width: 110px !important;
      color: #0785FD;
      height: 30px;
      line-height: 30px;
      font-size: 14px;
      text-align: center;
      font-weight: 500;
      i {
        margin-right: 5px;
        font-size: 18px;
      }
    }
  }
}
</style>
