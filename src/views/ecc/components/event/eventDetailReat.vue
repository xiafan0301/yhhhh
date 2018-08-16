<template>
  <div class='event-detail'>
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
          <p class='event-number'>事件编号：{{eventDetailObj.eventCode}}</p>
        </div>
        <div class='event-status'>
          <img src='../../../../assets/img/temp/treating.png' />
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
              <span style='color:#0785FD;font-weight:bold;text-decoration:underline'>{{eventDetailObj.reporterPhone}}</span>
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
            <div><span class='title'>事件情况：</span><span class='content'>{{eventDetailObj.eventDetail}}</span></div>
          </div>
          <div class='basic-list img-content'>
            <img
              v-for='item in eventDetailObj.attachmentList'
              :src='item.url'
              :key='item.attachmentId'
            />
          </div>
        </div>
      </div>
      <div class='ctc' v-show='eventDetailObj.taskList.length > 0'>
        <div class='ctc-header'>
          <div class='flag'></div>
          <p class='ctc-text'>调度指挥方案</p>
        </div>
        <div class='ctc-content'>
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
      <div class='event-progress' v-show='eventDetailObj.processingList.length > 0'>
        <div class='event-progress-header'>
          <div class='flag'></div>
          <p class='event-progress-text'>事件进展</p>
        </div>
        <div class='event-progress-body'>
          <div class='depart'>
            <p class='progress-title'>参与部门</p>
            <div class='depart-detail'>
              <p>消防部</p>
              <p>06-25 13：30</p>
              <p>处理完毕</p>
            </div>
            <div class='depart-detail'>
              <p>消防部</p>
              <p>06-25 13：30</p>
              <p>处理完毕</p>
            </div>
            <div class='depart-detail'>
              <p>消防部</p>
              <p>06-25 13：30</p>
              <p>处理完毕</p>
            </div>
          </div>
          <div class=divide></div>
          <div class='event-process'>
            <p class='progress-title'>事件过程</p>
            <div></div>
          </div>
          <div class=divide></div>
          <div class='comment'>
            <p class='progress-title'>
              APP端互助
              <span style='color: #0785FD;font-size: 12px'>(5条评论)</span>
            </p>
            <ul>
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
          </div>
        </div>
      </div>
      <div class='event-summary' v-show='eventDetailObj.eventSummary'>
        <div class='event-summary-header'>
          <div class='flag'></div>
          <p class='event-summary-text'>事件总结</p>
        </div>
        <div class='summary-content'>
          {{eventDetailObj.eventSummary}}
        </div>
      </div>
    </div>
    <div class='operation-btn-event'>
      <el-button @click='back'>返回</el-button>
      <el-button style='background: #0785FD;color:#fff' @click='skipEventEnd'>事件结束</el-button>
      <el-button style='background: #FB796C;color:#fff' class='skipCtcDetail' @click='skipCtcDetail'>再次调度</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      dialogFormVisible: false,
      imgSrc: '', // 事件状态图片
      pagination: {
        total: 1000,
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
      value: '',
      eventDetailObj: {} // 事件详情列表
    }
  },
  mounted () {
    this.getEventDetail();
  },
  methods: {
    skipEventEnd () { // 跳到事件结束页面
      this.$router.push({name: 'event-end', params: {eventId: this.$route.params.eventId}});
    },
    skipCtcDetail () {
      this.$router.push({name: 'ctc-detail'});
    },
    back () { // 返回上一页
      this.$router.back(-1);
    },
    getEventDetail () { // 获取事件详情
      const eventId = this.$route.params.eventId;
      // this.closeForm.eventId = eventId;
      if (eventId) {
        this.axios.get('A2/eventServices/events/' + eventId)
          .then((res) => {
            if (res && res.data) {
              console.log(res)
              this.eventDetailObj = res.data;
              // this.attachmentList = res.data.attachmentList;
              // this.detailForm.eventId = eventId;
              // this.detailForm.eventCode = res.data.eventCode;
              // this.detailForm.reporterPhone = res.data.reporterPhone;
              // this.detailForm.reportTime = res.data.reportTime;
              // this.detailForm.eventDetail = res.data.eventDetail;
              // this.detailForm.eventAddress = res.data.eventAddress;
              // this.detailForm.eventLevel = res.data.eventLevel;
              // this.detailForm.eventType = res.data.eventType;
              // if (res.data.casualties === -1) {
              //   this.detailForm.casualties = '不确定';
              // } else if (res.data.casualties === 0) {
              //   this.detailForm.casualties = '无';
              // } else if (res.data.casualties > 0) {
              //   this.detailForm.casualties = '有';
              //   this.dieNumber = res.data.casualties;
              // }
              // if (res.data.eventFlag === true) {
              //   this.detailForm.flagType.push('应急事件');
              // }
              // if (res.data.mutualFlag === true) {
              //   this.detailForm.flagType.push('民众互助');
              // }
            }
          })
          .catch(() => {})
      }
    }
  }
}
</script>
<style lang='scss' scoped>
  .event-detail {
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
  }
</style>
